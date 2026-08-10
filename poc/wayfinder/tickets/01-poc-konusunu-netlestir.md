# [01] POC Konusunu Netleştir

- **Label**: `wayfinder:grilling`
- **Status**: closed
- **Assignee**: pi/dev (bu oturum)
- **Blocks**: — ; **Blocked by**: —
- **Parents**: [Harita](../map.md)

## Question

Bu POC'nin **konusu ve kapsamı** nedir? (Hangi bileşen/iş akışı/teknoloji denenecek?)

## Resolved

- **Karar**: POC'nin konusu **Baklava'yı agent'lar için kullanılabilir kılmak** —
  Mara Meta **Astryx**'in "people + agents için tasarlanmış" yaklaşımını (CLI-as-docs,
  dense/token-verimli çıktı, vibe-style benchmark) modelleyerek:
  1. **Agent-friendly tooling**: `poc/agent-tooling/cli` (CEM-backed CLI) +
      `poc/agent-tooling/mcp` (geliştirilmiş, lokal-CEM'li MCP server).
  2. **Bileşen agent-usability**: agent'ların gerçek API'den (halüsinasyonsuz) `bl-*` kod üretmesi.
  3. **Before/after benchmark**: `poc/agent-tooling/bench` — vibe-tests tarzı,
      deterministik rubric evaluator + makine-okunur `compare.json` + `compare.md`.
- Kaynak: Astryx blogu (`vibe-tests`, `the-astryx-cli`, `astryx-cli-build-command`)
  ve repo içi `internal/vibe-tests` + `packages/cli` incelendi.
