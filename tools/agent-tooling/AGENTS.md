# AGENTS.md — Baklava Repo'da Çalışan Agent'lar İçin Rehber

> Bu doküman, **baklava repo'sunda çalışan bir coding agent'ın** işi doğru ve eksiksiz
> yapması için gereken kural, gotcha ve runbook'ları içerir. Okunabilirlik için kısa ve
> eylem odaklı yazılmıştır; proje derinlemesine anlatımı ve bileşen API referansı için:
>
> - Proje anlama (tam): [`PROJECT-UNDERSTANDING.md`](./PROJECT-UNDERSTANDING.md)
> - 43 bileşenin attribute/event/slot/css referansı: [`COMPONENT-REFERENCE.md`](./COMPONENT-REFERENCE.md)
> - Görev/karar haritası: [`wayfinder/`](./wayfinder/)
> - **Agent-friendly tooling POC** (CLI + MCP + before/after benchmark):
>   [`AGENT-TOOLING/`](./agent-tooling/) — bileşen kullanırken `component <name> --dense`
>   ile gerçek API'yi doğrula; ölçüm için [`AGENTS-TOOLING.md`](./agent-tooling/AGENTS-TOOLING.md).

---

## Ne zaman oku?

Bir bileşeni **değiştiriyor/yeni bileşen ekliyorsan**, **build/test/lint/localize** ile
uğraşıyorsan ya da repo'da nereden başlayacağını bilmiyorsan bu rehberi izle.
Sadece doküman okuyacaksan `PROJECT-UNDERSTANDING.md`'ye bak.

**Referans kuralı**: Komut adları ve script listesi için bu dosyayı ezberleme —
`package.json`'ın `scripts` bölümü tek doğru kaynaktır (ortam source of truth). Aşağıdaki
runbook'lar sadece komutun *ne zaman/kalitesi için* çağrılması gerektiğini söyler.

---

## 1. Altın kurallar (config'de yazmayan gotcha'lar)

1. **Her bileşen = 5 dosya, aynı klasörde:**
   `bl-<x>.ts` (sınıf) · `bl-<x>.css` (stil) · `bl-<x>.test.ts` (test) · `bl-<x>.stories.mdx`
   (Storybook dokümanı) · opsiyonel `doc/`. Klasör düzeni: `src/components/<group>/<component>/`.
2. **Kayıt iki yerde zorunlu:** `@customElement("bl-x")` decorator'ı + dosya sonunda
   `declare global { interface HTMLElementTagNameMap { "bl-x": BlX; } }`.
3. **Event'ler `@event` decorator'ıyla** (`src/utilities/event.ts`); varsayılan olarak
   `bubbles + composed: true` CustomEvent üretir ve `bl-*` ad verilir. Wrapper'lar bunu
   framework event'ine çevirir. Elle `dispatchEvent` yazmak yerine decorator'ı kullan.
4. **Form bileşenleri** (`input/select/radio-group/checkbox-group/textarea/switch` gibi)
   `FormControlMixin(LitElement)`'ten türemeli, `validationTarget`'ü ve
   `static formControlValidators`'ü kullanmalı. Validator'lar `src/utilities/form-control.ts`.
5. **Kullanıcıya görünen her metin lokalize olmalı:** `@localized()` + `msg`/`str`.
   Kaynak dil `en`; hedefler `tr/ar/ro`. Çeviri producir `npm run localize:extract` (+
   `translations/` XLIFF doldur) → `localize:build`.
6. **Üretilen dosyalara ASLA elle dokunma** (build üzerine sıfırlanır):
   - `src/baklava-react.ts` — `cem analyze` (build) sırasında `generateReactExports` plugin'i üretir.
   - `dist/custom-elements.json` — `cem analyze` üretir.
   - `src/generated/locales/*`, `src/generated/locale-codes.ts` — `localize:build` üretir.
   - `translations/*.xlf` — `localize:extract` üretir.
   Bir bileşen eklediğinde React wrapper'ının güncellenmesi için **yeniden build** gerektiğini unutma.
7. **Icon'lar repo'da commit'li değil** — `@trendyol/baklava-icons` peer paketinden / CDN'den gelir.
   Yolu `setIconPath()` ile değiştir (`src/utilities/asset-paths.ts`).
8. **Tema ve stil `--bl-*` CSS değişkenleriyle** olmalı (renkler, size, z-index, typography,
   border-radius). `src/themes/default.css` + `dark.css`. Yeni bir stil değeri tanımlarken
   hard-coded değer yerine tema değişkenine bağla; `:root[data-theme="dark"]` geçişi destekle.
9. **RTL:** yön duyarlı stillerde `src/utilities/direction.ts` (`getDirection()`,
   `setDirectionProperty()`) ve `--bl-text-x-direction` değişkenini kullan. `docs/rtl-support.stories.mdx`.
10. **Stil syntax:** bileşen CSS'i `esbuild-plugin-lit-css` ile import edilir; `stylelint`
    + `--bl-*` değişkenleri zorunlu. Release dışı build'de `:hover`'a Storybook demo sınıfı eklenir.

---

## 2. Runbook'lar (kapanış ölçütlü)

### R1 — Bir bileşenin tam anlaşılması
1. `src/components/<group>/<component>/` içindeki `.ts` dosyasını oku (property'ler, event'ler, render).
2. `bl-<component>.css`'i oku; hangi `--bl-*` değişkenlerini kullandığını not et.
3. İlgili API detayını `COMPONENT-REFERENCE.md`'den doğrula.
4. Alt/grup bileşenleri varsa (`option`, `group`, `item`, `row`... ) onları da tara.
- ✅ **Tamam**: component'in tüm property/attribute/event/slot'larını ve bağlı olduğu tema
  değişkenlerini / kullandığı utility'leri açıklayabiliyorsun.

### R2 — Yeni bileşen ekleme
1. Klasörü aç: `src/components/<group>/<component>/`.
2. `bl-<component>.ts`: `@customElement` + `@property`/`@state`/`@query` + `@event` + `render()`
   + `HTMLElementTagNameMap` register. (Kalıp için `src/components/button/bl-button.ts`.)
3. `bl-<component>.css`: `--bl-*` değişkenleriyle stil yaz.
4. `bl-<component>.test.ts`: `@open-wc/testing` `fixture`/`expect` ile test yaz.
5. `bl-<component>.stories.mdx`: Storybook dokümantasyonu + örnek ekle.
6. `src/baklava.ts`'e export ekle.
7. Kullanıcı metni varsa `msg`/`str` ile işaretle; `localize:extract` → çevirileri doldur → `localize:build`.
8. `npm run fix` (lint/format) → `npm run test` → `npm run build`.
9. Build sonrası `src/baklava-react.ts`'in güncellendiğini ve `dist/custom-elements.json`'a
   bileşenin girdiğini doğrula.
- ✅ **Tamam**: build ve testler yeşil; React wrapper + manifest bileşeni içeriyor; tema/lokalizasyon
  kurallarına uyuldu.

### R3 — Davranış değişikliği (mevcut bileşen)
1. Çağıranı kırmadan değiştir: property/event imzalarını koru (şemaya uymayan breaking değişiklik
   için commit kuralı + release notu gerekir, `docs/baklava-release-flow.stories.mdx`).
2. `bl-<component>.test.ts`'i güncelle; yeni davranış için test ekle.
3. `bl-<component>.stories.mdx` örneklerini güncelle.
4. `npm run lint:tsc && npm run test` çalıştır.
- ✅ **Tamam**: ilgili testler geçiyor, tsc hatasız, dokümantasyon güncel.

### R4 — Lokalize metin ekleme
1. Bileşende `@localized()` var mı kontrol et; yoksa ekle.
2. Metni `msg("...")` (veya değişkenliyse `str`) ile sar.
3. `npm run localize:extract` → `translations/` XLIFF'inde `en`'i kaynak gör.
4. `tr`, `ar`, `ro` çevirilerini (varsa) doldur → `npm run localize:build`.
- ✅ **Tamam**: `src/generated/locales/{ar,ro,tr}`'de yeni anahtar yer alıyor.

### R5 — Test çalıştırma (bilmen gereken nüans)
- `npm run test` önce **build** çalıştırır (`pretest`) sonra `web-test-runner --coverage` çalıştırır.
  Kod değiştirirken hızlı geri bildirim için `test:dev` / `test:watch` kullan.
- Yalnızca belirli grubu çalıştırmak için `test:component -- --group <grup>`.
- Tarayıcı testleri Playwright/Puppeteer gerektirir; headless ortamda `test:headless` düşün.

### R6 — Commit / katkı
- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`... (`commitlint`).
- `husky` + `lint-staged` staged dosyaları otomatik lint/format eder; node_modules eksikse
  hook `lint-staged: command not found` ile düşebilir (doküman-only değişiklikte `--no-verify`
  makul, kod değişikliğinde değil).
- Release `semantic-release` ile; breaking değişiklik `!` ile işaretlenir.

---

## 3. Hızlı yön tablosu (nerede arayayım?)

| İş | Yer |
|---|---|
| Tüm bileşen export'ları | `src/baklava.ts` |
| React wrapper (üretilen) | `src/baklava-react.ts` |
| Tema değişkenleri | `src/themes/default.css`, `src/themes/dark.css` |
| Event kalıbı | `src/utilities/event.ts` |
| Form validasyonu | `src/utilities/form-control.ts` |
| Lokalizasyon | `src/localization.ts`, `lit-localize.json`, `src/generated/locales/` |
| Build | `scripts/build.js` + `package.json` `build` |
| Bileşen manifest | `dist/custom-elements.json`, `custom-elements-manifest.config.mjs`, `cemPlugins/` |
| Test config | `web-test-runner.config.mjs`, `*.test.ts` |
| Storybook | `.storybook/`, `docs/*.mdx`, `src/**/*.stories.mdx` |
| Commit/release | `commitlint.config.cjs`, `.releaserc`, `CONTRIBUTING.md` |

> Detaylı dizin haritası ve tüm script tablosu: [`PROJECT-UNDERSTANDING.md`](./PROJECT-UNDERSTANDING.md) §3–§4.
