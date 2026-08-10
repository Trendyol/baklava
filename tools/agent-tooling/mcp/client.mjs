#!/usr/bin/env node
// Thin stdio MCP client — lets an agent (or human) call the Baklava MCP server
// one tool at a time and print the tool's text result. This is the client side
// of "agent using the MCP server" used by the `mcp-only` benchmark arm.
//
//   node tools/agent-tooling/mcp/client.mjs <tool> [<jsonArgs>]
//
// Examples:
//   node .../client.mjs list_components
//   node .../client.mjs get_component '{"name":"button"}'
//   node .../client.mjs component_build '{"prompt":"a login form with email and password"}'
//   node .../client.mjs component_examples '{"name":"bl-input"}'
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import readline from 'node:readline';

const tool = process.argv[2];
const args = process.argv[3] ? JSON.parse(process.argv[3]) : {};

if (!tool) {
  console.error('usage: node mcp/client.mjs <tool> [<jsonArgs>]');
  process.exit(1);
}

const server = path.join(
  path.resolve(fileURLToPath(new URL('.', import.meta.url))),
  'mcp-server.mjs',
);
const child = spawn('node', [server], { stdio: ['pipe', 'pipe', 'inherit'] });
const rl = readline.createInterface({ input: child.stdout });

let nextId = 1;

function request(method, params) {
  const id = nextId++;
  child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n');
  return new Promise((resolve) => {
    const onLine = (line) => {
      if (!line.trim()) return;
      let msg;
      try { msg = JSON.parse(line); } catch { return; }
      if (msg.id !== id) return;
      rl.off('line', onLine);
      resolve(msg);
    };
    rl.on('line', onLine);
  });
}

(async () => {
  try {
    await request('initialize', { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'baklava-client', version: '0.1.0' } });
    const res = await request('tools/call', { name: tool, arguments: args });
    const text = res.result?.content?.map((c) => c.text).join('\n') ?? '';
    const isError = res.result?.isError ?? false;
    if (isError) {
      console.error(text);
      process.exit(2);
    }
    console.log(text);
    process.exit(0);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  } finally {
    child.kill();
  }
})();
