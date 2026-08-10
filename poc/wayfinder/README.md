# Wayfinder — Local Tracker (poc/wayfinder)

Bu dizin, **Baklava POC** çalışmasının karar haritasını lokal dosya olarak tutar
(kullanıcı isteğiyle GitHub issue açılmaz; maddeler bu repoda markdown dosyalar olarak saklanır).

## Format

- `map.md` — haritanın kendisi (Destination, Notes, Decisions so far, Not yet specified, Out of scope).
- `tickets/` — her karar/çalışma biletinin dosyası (`<id>-<slug>.md`).
- Bilet `wayfinder:<type>` etiketi taşır: `research` | `prototype` | `grilling` | `task`.
- Bir bilet, haritanın bir çocuk maddesidir (lokal dosya bağlamında yapısal olarak `tickets/` içinde yaşar, `map.md` içinden bağlanır).
- **Frontier** = açık + engelsiz + sahiplenilmemiş biletler. Bir bilet, onu bloklayan tüm biletler kapanınca engelsiz olur.
- **Sahiplenme (claim)**: Bilet çalışılmadan önce `Assignee` alanı doldurulur.

## Çalışma kuralı

- Bu haritayla bir oturumda en fazla **bir** bilet çözülür (research biletleri hariç).
- Çözüm: bilet dosyasına `## Resolved` bölümü eklenir, ilgili diğer biletler güncellenir,
  `map.md`'de "Decisions so far" satırı eklenir ve bilet kapatılır (`Status: closed`).
