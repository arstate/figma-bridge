#!/usr/bin/env bash
# ==============================================================================
# Figma Bridge MCP — Automated Setup & Verification Script
# ==============================================================================
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================================${NC}"
echo -e "${BLUE}   🚀 Figma Bridge MCP — Setup & Diagnostics${NC}"
echo -e "${BLUE}======================================================${NC}"

# 1. Check Bun runtime
if command -v bun >/dev/null 2>&1; then
    BUN_CMD="bun"
elif [ -f "$HOME/.bun/bin/bun" ]; then
    BUN_CMD="$HOME/.bun/bin/bun"
    export PATH="$HOME/.bun/bin:$PATH"
else
    echo -e "${RED}[ERROR] Bun runtime not found!${NC}"
    echo "Figma Bridge requires Bun for ultra-fast TypeScript & WebSocket execution."
    echo "Install Bun with: curl -fsSL https://bun.sh/install | bash"
    exit 1
fi
echo -e "${GREEN}[✔] Bun detected:${NC} $($BUN_CMD --version)"

# 2. Install Server Dependencies
echo -e "\n${BLUE}[1/4] Checking server dependencies...${NC}"
cd "$REPO_DIR/server"
if [ ! -d "node_modules" ]; then
    echo "Installing server packages..."
    $BUN_CMD install
else
    echo "Server packages already installed."
fi

# 3. Verify Plugin Build
echo -e "\n${BLUE}[2/4] Verifying Figma plugin build...${NC}"
cd "$REPO_DIR/plugin"
if [ ! -f "dist/code.js" ]; then
    echo "Building plugin bundle..."
    $BUN_CMD install
    $BUN_CMD run build
else
    echo "Pre-built plugin dist/code.js is ready."
fi

# 4. Check or Launch WebSocket Relay Daemon (port 4395)
echo -e "\n${BLUE}[3/4] Checking WebSocket Relay Daemon (port 4395)...${NC}"
RELAY_PID=$(lsof -ti :4395 2>/dev/null || ss -tulpn 2>/dev/null | grep ':4395' | awk '{print $NF}' | sed -E 's/.*pid=([0-9]+).*/\1/' || true)

if [ -n "$RELAY_PID" ]; then
    echo -e "${GREEN}[✔] Relay daemon is already running (PID: $RELAY_PID) on ws://127.0.0.1:4395${NC}"
else
    echo "Starting relay daemon in background..."
    nohup $BUN_CMD "$REPO_DIR/server/relay.ts" > "$REPO_DIR/relay.log" 2>&1 &
    sleep 1
    echo -e "${GREEN}[✔] Relay daemon started on ws://127.0.0.1:4395${NC}"
fi

# 5. Run MCP Server Smoke Test
echo -e "\n${BLUE}[4/4] Running MCP stdio smoke test...${NC}"
cd "$REPO_DIR"
$BUN_CMD server/smoke.ts

# 6. Final Instructions
MANIFEST_PATH="$REPO_DIR/plugin/manifest.json"
SERVER_PATH="$REPO_DIR/server/index.ts"

echo -e "\n${GREEN}======================================================${NC}"
echo -e "${GREEN}   ✅ Figma Bridge MCP is Ready!${NC}"
echo -e "${GREEN}======================================================${NC}"
echo -e "\n${YELLOW}👉 STEP 1: Import Plugin in Figma Desktop${NC}"
echo -e "   1. Open Figma Desktop App and open any project/file."
echo -e "   2. Click Figma Menu (top-left) -> ${BLUE}Plugins${NC} -> ${BLUE}Development${NC} -> ${BLUE}Import plugin from manifest...${NC}"
echo -e "   3. Select file: ${GREEN}${MANIFEST_PATH}${NC}"
echo -e "   4. Run the plugin in your design canvas! (You will see 'Connected to relay')"
echo -e ""
echo -e "${YELLOW}👉 STEP 2: Configure AI Agent MCP Client${NC}"
echo -e "Add this to your MCP config (e.g. ~/.gemini/antigravity/mcp_config.json):"
echo -e "${BLUE}"
cat <<EOF
{
  "mcpServers": {
    "figma-bridge": {
      "command": "bun",
      "args": ["${SERVER_PATH}"]
    }
  }
}
EOF
echo -e "${NC}"
echo -e "${GREEN}Setup completed successfully!${NC}"
