# Wayfinder Map — Baklava POC

> Osmanlı/Baklava öncesi: Bu harita, baklava repo'sunda yapılacak **POC** çalışmasının yolunu netleştirir.
> Maddeler **lokal repoda** tutulur (GitHub issue açılmaz). Taşıyıcı: `poc/wayfinder/` (lokal-markdown tracker).

## Destination

POC'nin **konusu henüz netleşmedi** — destination'ın kendisi bir karar biletidir.
Yolun sonu: POC'nin konusu ve kapsamı netleşmiş, konuya giden tüm kararlar çözülmüş ve
POC'yi hayata geçirecek ekibe/dev'e net bir "ne yapılacağı" teslim edilmiş olması.

Bu haritanın **ilk hedefi**: kullanıcının istediği gibi — *POC başlamadan önce projenin %100
anlaşıldığına dair kapsamlı bir dokümantasyon* (tüm bileşenler + her işlem) üretmek ve bu
dokümantasyonu POC'ye giriş context'i olarak kullanmak.

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

## Not yet specified

- **POC'nin konusu** — kullanıcıyla netleştirilecek (bilet: "POC Konusunu Netleştir").
- Dokümantasyon tamamlandıktan sonra hangi bileşen/iş akışının POC'ye konu olacağı.

## Out of scope

- (henüz yok — scope POC konusu netleşince belirlenecek)
