# Baklava — Proje Anlama Dokümantasyonu (POC Context)

> **Amaç**: POC'ye başlamadan önce `@trendyol/baklava` tasarım sistemini **%100 anlamak**.
> Bu doküman tüm bileşenleri ve her operasyonu kapsar; POC'ye giriş context'i olarak kullanılır.
>
> Bileşen bazlı detaylı API referansı: [`COMPONENT-REFERENCE.md`](./COMPONENT-REFERENCE.md)
> (repo'daki `dist/custom-elements.json` manifest'inden üretildi, 43 bileşenin attribute/event/slot/css-property listesi).

---

## 1. Proje Nedir?

**Baklava**, Trendyol'un tasarım sisteminin **web implementation**'ıdır. Doğal (native)
**Web Components** kütüphanesi olarak inşa edilmiştir; böylece React, Vue, Angular gibi her
framework'te kullanılabilir.

- **Paket**: `@trendyol/baklava`
- **Teknoloji**: [Lit](https://lit.dev) (LitElement) + **TypeScript**
- **Teslimat**: CDN (jsDelivr) üzerinden `<link>` + `<script type="module">` ile, ya da npm paketi olarak
- **Kullanım**: `<bl-button>Baklava works!</bl-button>`
- **Konum**: `Trendyol/baklava` GitHub repo'su; ana geliştirme dalı `next`

### Neden Web Component?
Framework-bağımsız olması hedeflenir — "build once, use everywhere". DOM'a kayıtlı özel elementler
(`customElements.define`) her framework'te çalışır. Ayrıca React/Vue/Svelte için ayrı tip/wrapper
üretimi Custom Elements Manifest (CEM) eklentileriyle otomatikleştirilmiştir (bkz. §10).

---

## 2. Teknoloji Yığını & Bağımlılıklar

### Runtime bağımlılıkları (`dependencies`)
| Paket | Rol |
|---|---|
| `lit` ^2.8 | Web component framework (LitElement, html, decorators, directives) |
| `@lit/localize` ^0.12 | Lokalizasyon (çeviri & locale yönetimi) |
| `@floating-ui/dom` ^1.7 | Popover/tooltip/dropdown pozisyonlama |
| `@open-wc/form-control` ^0.7 | Form-associated custom element mixin'i + validator'lar |
| `@open-wc/form-helpers` ^0.2 | Form submit etme yardımcıları (`submit`) |
| `element-internals-polyfill` ^1.2 | Yaşlı tarayıcılar için ElementInternals polyfill |
| `@lit-labs/react` ^2.0 | React wrapper üretimi |
| `@fontsource-variable/rubik` ^5 | Rubik değişken font |
| `@trendyol/baklava-icons` (peer, opsiyonel) | Icon kütüphanesi |

### Geliştirme bağımlılıkları öne çıkanlar (`devDependencies`)
`@custom-elements-manifest/analyzer` (CEM), `esbuild` (+ `lit-css` plugin), `storybook` 7 (web-components),
`web-test-runner` (+ `playwright`/`puppeteer`), `typescript` 5.3, `stylelint`, `eslint` (+ lit/wc plugin'leri),
`prettier`, `semantic-release`, `husky`, `lint-staged`, `commitlint`.

---

## 3. Repo Yapısı (Dizin Haritası)

```
baklava/
├── src/
│   ├── baklava.ts            # Ana giriş (tüm bileşenleri + icon/localize util'larını export eder)
│   ├── baklava-react.ts      # React wrapper girişi (CEM + @lit-labs/react ile üretilir)
│   ├── localization.ts       # @lit/localize kurulumu + init (html lang takibi)
│   ├── imports.d.ts
│   ├── components/           # <group>/<component>/bl-<component>.{ts,css,mdx,test.ts}
│   ├── generated/locales/    # lit-localize üretimi çeviriler (ar, ro, tr) + locale-codes
│   ├── mixins/               # datepicker-calendar-mixin
│   ├── themes/               # default.css, dark.css
│   ├── types/                # index.d.ts
│   └── utilities/            # event, direction, form-control, converter'lar, asset-paths, elements
├── cemPlugins/               # CEM özel eklentileri (React/Vue/Svelte/typeler)
├── scripts/build.js          # esbuild üretim/development build
├── docs/                     # Storybook .mdx dokümanları (release, commit kuralları, theming, RTL...)
├── .storybook/               # Storybook konfigürasyonu
├── dist/                     # Build çıktısı (+ custom-elements.json manifest)
├── translations/             # XLIFF çeviri ara dosyaları (lit-localize interchange)
├── examples/, playground/    # örnek/deneme
└── baklava-book/             # (static site / docs)
```

---

## 4. Build Sistemi & Tüm NPM Script'leri

### Build akışı (`npm run build`)
```
1. del-cli dist/            → eski çıktıyı temizler
2. cem analyze              → custom-elements.json üretir (kimlik/bileşen manifest)
3. tsc --emitDeclarationOnly → .d.ts tiplerini üretir
4. node scripts/build.js    → esbuild ile JS/CSS/svg bundle'larını üretir
5. localize:build           → çeviri dosyalarını derler
```

`scripts/build.js`:
- **entryPoints**: `src/baklava.ts`, `src/baklava-react.ts`, `src/localization.ts` + glob ile
  tüm bileşen `.ts`, temalar, svg'ler.
- **esbuild** `bundle: true`, `splitting: true`, `minify: true`, `format: esm`,
  target `es2020/chrome73/edge79/firefox63/safari12`, `external: ["react"]`.
- **litCssPlugin**: `components/**/*.css` dosyalarını import eder. Release değilse `:hover`'a
  Storybook demo sınıfı ekler (`cssHoverClassAdder`), her zaman CleanCSS ile minify eder (`cssCleaner`).
- `npm run serve` / `scripts/build.js --serve`: çıktıyı `playground/dist`'e yazıp lokal sunar.
- Icon'lar `/components/icon/icons` alt-çıktısı build sonrası temizlenir (icon'lar paketten gelir).

### Scripts tablosu
| Script | Komut | Ne yapar |
|---|---|---|
| `start` | `build` + `storybook:dev` | prestart build, sonra Storybook dev (port 1994) |
| `build` | analyze + tsc + build.js + localize | tam üretim build'i |
| `build-storybook` | storybook build -o storybook-static | Storybook'u statik üretir |
| `storybook:dev` | storybook dev -p 1994 | geliştirme sunucusu |
| `lint` | tsc + eslint + stylelint + prettier + localize:extract | tüm statik kontroller |
| `lint:tsc` | `tsc --noEmit` | tip kontrolü |
| `lint:eslint` | eslint src | lint |
| `lint:style` | stylelint src/**/*.css | CSS lint |
| `lint:prettier` | prettier --check src | format kontrolü |
| `format` / `format:code` | eslint --fix + prettier --write + stylelint --fix | otomatik düzelt |
| `fix` | format + lint | düzelt + doğrula |
| `clean` / `clean:dist` / `clean:modules` | rimraf | çıktı/node_modules temizle |
| `reset` / `reboot` | clean + install (+start) | ortamı sıfırla |
| `test` | build + web-test-runner --coverage | test + coverage (pretest build çalıştırır) |
| `test:dev` / `test:watch` / `test:debug` / `test:headless` | web-test-runner varyantları | geliştirme testi |
| `test:component` | `test -- --group` | bileşen grubu testi |
| `localize:extract` / `localize:build` | lit-localize extract/build | çeviri ara dosyası / üretim |
| `analyze` | cem analyze | manifest üretir |
| `release` | semantic-release | sürüm yayınlama |
| `serve` | scripts/build.js --serve | playground sunar |
| `ci` | node_modules temiz + frozen install | CI için temiz kurulum |

---

## 5. Çekirdek Mimari & Kalıplar (Tüm Bileşenlerde Geçerli)

### 5.1 Bileşen tanımı — Lit + TypeScript
Her bileşen `@customElement("bl-xxx")` ile kayıtlı bir `LitElement` alt sınıfıdır.
```ts
@customElement("bl-button")
export default class BlButton extends LitElement {
  static get styles(): CSSResultGroup { return [style]; }  // bl-xxx.css import
  @property({ type: String, reflect: true }) variant = "primary";
  @event("bl-click") private onClick: EventDispatcher<string>;
  render(): TemplateResult { ... }
}
declare global {
  interface HTMLElementTagNameMap { "bl-button": BlButton; }
}
```
- `@property(...)` → observable prop'u (attribute'a yansır: `reflect: true`).
- `@state()` → iç durum (attribute'a yansımaz).
- `@query()` / `@queryAll()` → shadow DOM seçimi.
- `static shadowRootOptions` (ör. `delegatesFocus: true`) — bazı bileşenlerde.
- `declare global { HTMLElementTagNameMap }` → TypeScript'e tag tipini öğretir.

### 5.2 Event dağıtım kalıbı — `@event` decorator'ı (`src/utilities/event.ts`)
Bileşenler `bl-*` adlı **CustomEvent**'ler yayar; wrapperlar bunu framework event'ine çevirir.
```ts
@event("bl-click") private onClick: EventDispatcher<string>;  // onClick("...") çağrısı event fırlatır
```
`dispatcher` varsayılan olarak `bubbles: true, composed: true` üretir (shadow DOM'dan dışarı taşar).

### 5.3 Form kontrolleri — `@open-wc/form-control` `FormControlMixin`
`bl-input`, `bl-select`, `bl-radio-group`, `bl-checkbox-group`, `bl-textarea`, `switch` gibi
<bileşenler form-associated custom elements</b>'tir. `FormControlMixin(LitElement)` kullanılır:
- `static formControlValidators` → doğrulama listesi.
- `validationTarget` → asıl native elemente işaret eder.
- `@open-wc/form-helpers` `submit(form)` ile form submit edilir (`bl-button type="submit"`).
- Validator'lar `src/utilities/form-control.ts` içinde: `innerInputValidators`
  (valueMissing, typeMismatch, tooLong... + özel `customError`), `textAreaValidators`.

### 5.4 Lokalizasyon — `@lit/localize`
- Kaynak dil `en`, hedefler: `tr`, `ar`, `ro`.
- Bileşenler `@localized()` decorator'ı ve `msg`/`str` helper'larıyla çevrilecek metin işaretler.
- `src/localization.ts`: `getLocale`/`setLocale` expose eder; `init()` `html[lang]` attribute'ünü
  okur ve `MutationObserver` ile `lang` değişikliklerini takip eder.
- Çeviri üretimi: `npm run localize:extract` → XLIFF (`translations/`), `localize:build` →
  `src/generated/locales/{ar,ro,tr}`.

### 5.5 Icon — `bl-icon`
- Icon'lar `@trendyol/baklava-icons` paketinden (CDN varsayılan `getIconPath()`) gelir.
- `BaklavaIcon` tipi `icon-list.ts`'ten; yolu değiştirmek için `setIconPath(path)`.

---

## 6. Bileşen Anatomisi (Dosya Düzeni)

Her bileşen kendi klasöründe yaşar; organdaki alt-bileşenler aynı düzende:
```
src/components/<group>/<component>/
├── bl-<component>.ts          # sınıf + logic
├── bl-<component>.css         # şablon stilleri (stylelint, litCssPlugin)
├── bl-<component>.stories.mdx # Storybook dokümantasyon/ornek
├── bl-<component>.test.ts     # web-test-runner birim/karma testleri
└── doc/                       # (bazı gruplarda) ek dokümanlar/ADR
```
Örnek grup: `accordion-group/` içinde `accordion/`, `checkbox-group/` içinde `checkbox/`,
`radio-group/` içinde `radio/`, `select/` içinde `option/`, `dropdown/` içinde `group/` + `item/`,
`tab-group/` içinde `tab/` + `tab-panel/`, `table/` içinde `body/ cell/ header/ header-cell/ row/`,
`notification/` içinde `card/`.

---

## 7. Bileşen Envanteri (43 Bileşen)

Tümü `src/baklava.ts`'ten export edilir ve `dist/custom-elements.json`'da listelenir.
Detaylı attribute/event/slot/css listesi için → [`COMPONENT-REFERENCE.md`](./COMPONENT-REFERENCE.md).

| Grup | Bileşenler |
|---|---|
| **Açıklama/Erişim** | `bl-accordion`, `bl-accordion-group`, `bl-alert`, `bl-badge`, `bl-tag`, `bl-tooltip`, `bl-popover`, `bl-link` |
| **Form/Input** | `bl-input`, `bl-textarea`, `bl-checkbox`, `bl-checkbox-group`, `bl-radio`, `bl-radio-group`, `bl-switch`, `bl-select`, `bl-select-option`, `bl-datepicker`, `bl-calendar` |
| **Buton/Aksiyon** | `bl-button`, `bl-split-button`, `bl-dropdown`, `bl-dropdown-group`, `bl-dropdown-item` |
| **Navigasyon/Veri** | `bl-pagination`, `bl-stepper`, `bl-stepper-item`, `bl-tab`, `bl-tab-panel`, `bl-tab-group`, `bl-table`, `bl-table-body`, `bl-table-row`, `bl-table-cell`, `bl-table-header`, `bl-table-header-cell` |
| **Geri Bildirim/İlerleme** | `bl-spinner`, `bl-progress-indicator`, `bl-notification`, `bl-notification-card`, `bl-dialog`, `bl-drawer` |
| **Sistem** | `bl-icon` |

---

## 8. Kısayollar — Utilities, Mixins, Types

### `src/utilities/`
| Dosya | İşlev |
|---|---|
| `event.ts` | `@event()` decorator'ı + `EventDispatcher<T>` tipi (bkz. §5.2) |
| `form-control.ts` | Form doğrulama validator listeleri (`innerInputValidators`, `textAreaValidators`) |
| `direction.ts` | `getDirection()` (ltr/rtl), `setDirectionProperty(el)` |
| `elements.ts` | `getMiddleOfElement`, `getTarget` |
| `asset-paths.ts` | `getIconPath`/`setIconPath` (icon CDN yolu) |
| `string-boolean.converter.ts` | Lit `ComplexAttributeConverter` (string↔boolean) |
| `string-to-date-converter.ts` / `format-to-date-array.ts` | tarih string↔`Date[]` dönüşümü |
| `style-to-px.converter.ts` | `px/vw/%` → piksel hesabı |
| `chromatic-decorators.ts` / `icon-mock.ts` | test/storybook yardımcıları |

### `src/mixins/datepicker-calendar-mixin/`
`datepicker` ile `calendar` arasında paylaşılan takvim mantığını sağlayan mixin.

### `src/themes/`
- `default.css` → açık tema; `dark.css` → koyu tema.
- **CSS Custom Properties** katalogu: renkler (`--bl-color-*`), boyutlar (`--bl-size-*`),
  z-index (`--bl-index-*`), font ailesi/ağırlıkları/boyutları (`--bl-font-*`), border-radius
  (`--bl-border-radius-*`), typography (`--bl-font-heading-*` vb.), spacing, `--bl-text-x-direction` (RTL).
- `:root[data-theme="dark"]` geçişi.

### Customization (tema özelleştirme)
Kullanıcı kendi CSS'inde `--bl-*` değişkenlerini override ederek tema/yapılabilirliği değiştirir.
Dokümantasyon: `docs/customizing-baklava-theme.stories.mdx`, `docs/how-to-customize-a-components-style.stories.mdx`.

---

## 9. Framework Entegrasyonları (CEM Eklentileri — `cemPlugins/`)

`custom-elements-manifest.config.mjs` şu eklentileri çalıştırır:
- `decoratedEventCollector` — `@event` decorator'larını manifest'e event olarak taşır.
- `parsedTypeEnhancerPlugin` — tipleri zenginleştirir (`utils/` resovers ile).
- `addJsDoc` — jsdoc şablonlarını ekler.
- `generateSvelteTypes` / `generateVueTypes` — Svelte/Vue tip tanımları üretir.
- `generateReactExports` — `src/baklava-react.ts`'i (React wrapper) üretir (@lit-labs/react `createComponent` + `React.lazy`).

Böylece tek kaynak (Lit bileşenleri) tek build'de React/Vue/Svelte tipleri + React wrapper'a dönüşür.

---

## 10. Test Stratejisi

- **Runner**: `web-test-runner` (config `web-test-runner.config.mjs`); `@web/test-runner-playwright` + `puppeteer`.
- **Kütüphane**: `@open-wc/testing` (fixture, expect).
- Dosya adı `*.test.ts` (bileşenlerin yanında).
- `npm run test` → önce build (pretest), sonra coverage'lı test.
- `test:component -- --group` ile gruplu çalıştırma.

---

## 11. Storybook

- Config: `.storybook/main.ts` (web-components-vite framework, `docs` autodocs).
- Stories `src/**/*.stories.ts` ve dokümantasyon `.mdx` dosyaları (`docs/` + `src/**/*.mdx`).
- `bl-*.stories.mdx` her bileşenin Storybook dokümanıdır; `dist/` statik klasör olarak kullanılır.
- `npm run storybook:dev` → `localhost:1994`.

---

## 12. RTL & Direction Desteği

- `docs/rtl-support.stories.mdx` + `src/utilities/direction.ts`.
- Tema `--bl-text-x-direction: 1` ile RTL'de yön değişir; bileşenler `dir` attribute'ü / `getDirection()` ile
  LTR/RTL davranışını yönetir.

---

## 13. Geliştirici İş Akışları (Her Operasyonun Yeri)

### Kodlama standartları
- **Lint/format**: ESLint (lit + wc + prettier) → `npm run lint`; otomatik düzeltme `npm run fix`.
- **Stylelint**: bileşen CSS'i → `--bl-*` değişkenleri kullan.
- **Commit**: `commitlint` conventional commits (`feat:`, `fix:`...), `husky` + `lint-staged`
  staged değişiklikleri otomatik lint/format eder. `.gitmessage` şablon.
- **Release**: `semantic-release` (angular preset) → `dist/` yayınlanır, CDN'e `@trendyol/baklava`.

### Yeni bileşen ekleme runbook'u
1. `src/components/<group>/<component>/` klasörü aç.
2. `bl-<component>.ts` → `@customElement`, `@property`, `@event`, `render()`, HTMLElementTagNameMap'ı yaz.
3. `bl-<component>.css` stilleri + tema değişkenlerini kullan.
4. `bl-<component>.test.ts` testlerini yaz.
5. `bl-<component>.stories.mdx` Storybook dokümantasyonu ekle.
6. `src/baklava.ts`'e export ekle (React wrapper `cem analyze` ile otomatik üretilir — yeniden build gerekir).
7. Metin varsa `msg`/`str` ile işaretle → `npm run localize:extract` sonra çevirileri doldur, `localize:build`.
8. `npm run fix` + `npm run test` + `npm run build` çalıştır.
9. Conventional commit ile commit; release akışıyla yayınla (PR süreci).

### Tema değiştirme / bileşen stili özelleştirme
CDN veya import sonrası kendi CSS'inle `--bl-*` override et; koyu tema için `data-theme="dark"`.

### Lokalizasyon metni ekleme
`msg("...")` kullan → `localize:extract` (XLIFF) → `translations/` altında `tr/ar/ro` çevirisini doldur → `localize:build`.

### Playground / deneme
`npm run serve` → `http://localhost` (playground). Ayrıca `examples/` ve `baklava-book/` referans.

---

## 14. Hızlı "Nerede?" Rehberi

| Aramak istenen | Konum |
|---|---|
| Ana export listesi | `src/baklava.ts` |
| React wrapper | `src/baklava-react.ts` (üretilen) |
| Tema değişkenleri | `src/themes/default.css`, `src/themes/dark.css` |
| Lokalizasyon kurulumu | `src/localization.ts`, `lit-localize.json`, `src/generated/locales/` |
| Event kalıbı | `src/utilities/event.ts` |
| Form validasyonu | `src/utilities/form-control.ts` |
| Build | `scripts/build.js`, `npm run build` |
| Bileşen manifest | `dist/custom-elements.json`, `custom-elements-manifest.config.mjs`, `cemPlugins/` |
| Test | `*.test.ts`, `web-test-runner.config.mjs` |
| Storybook | `.storybook/`, `docs/*.mdx`, `src/**/*.stories.mdx` |
| RTL | `docs/rtl-support.stories.mdx`, `src/utilities/direction.ts` |
| Commit/release | `commitlint.config.cjs`, `.releaserc`, `CONTRIBUTING.md`, `docs/baklava-release-flow.stories.mdx` |

---

## 15. POC'ye Bağlantı

Bu dokümantasyon, POC çalışmasının context temelidir. POC'nin **konusu** neydi:
**Baklava'yı agent'lar için kullanılabilir kılan bir araç katmanı (CLI + geliştirilmiş MCP) + before/after benchmark** —
bu yetenekler `tools/agent-tooling/` altında hayata geçirildi (bkz. `AGENTS-TOOLING.md`).
