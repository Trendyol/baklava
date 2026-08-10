# Wayfinder Map — Baklava POC

> Osmanlı/Baklava öncesi: Bu harita, baklava repo'sunda yapılacak **POC** çalışmasının yolunu netleştirir.
> Maddeler **lokal repoda** tutulur (GitHub issue açılmaz). Taşıyıcı: `poc/wayfinder/` (lokal-markdown tracker).

## Destination

POC konusu netleşti: **Baklava'yı agent'lar için kullanılabilir kılan bir araç katmanı + before/after benchmark** — bkz. [POC Konusunu Netleştir](./tickets/01-poc-konusunu-netlestir.md).

Yolun sonu: CLI + geliştirilmiş MCP ile bileşenlerin agent'lar tarafından doğru (halüsinasyonsuz) kullanılabilmesi ve bunun **ölçülebilir before/after verisiyle** kanıtlanması.

## Notes

- **Domain**: Web Components design system — [Lit](https://lit.dev) + TypeScript (Trendyol Baklava).
- Her oturum şu skill'leri değerlendirsin: `/wayfinder`, `/grilling`, `/domain-modeling`, `/prototype`, `/research`, `/source-driven-development`.
- Kullanıcı tercihleri:
  - GitHub'a issue açılmaz; harita/biletler **lokalde** (`poc/wayfinder/`) tutulur.
  - Önce projeyi anlayan kapsamlı dokümantasyon; sonra o dokümantasyonla POC'ye başlanır.
- POC dalı bu oturumda `poc/wayfinder-docs` olarak açıldı; konu netleşince uygun isim verilebilir.

## Decisions so far

<!-- kapanan her bilet için bir satır: kararın özü + bağlantı -->
- [Proje Dokümantasyonunu Oluştur](./tickets/02-proje-dokumantasyonunu-olustur.md) — Kapsamlı proje anlama dokümantasyonu `poc/PROJECT-UNDERSTANDING.md` (+ `poc/COMPONENT-REFERENCE.md` 43 bileşen referansı) olarak üretildi; POC giriş context'i olarak kullanılacak.
- [POC Konusunu Netleştir](./tickets/01-poc-konusunu-netlestir.md) — POC konusu netleşti: **Astryx tarzı agent-friendly tooling (CLI + geliştirilmiş MCP) + before/after benchmark**. Uygulama `poc/agent-tooling/` altında (CLI, bench, mcp, `AGENTS-TOOLING.md`).

## Not yet specified

- Dokümantasyon tamamlandıktan sonra hangi bileşen/iş akışının POC'ye konu olacağı — (artık `poc/agent-tooling` POC'si bu kapsamı doldurdu).
- (ileri) Benchmark'ın CI/nightly cron ile çalıştırılması ve yeni model armatürlerinin eklenmesi.

## Out of scope

- (henüz yok — scope POC konusu netleşince belirlenecek)
