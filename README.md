<p align="center">
  <img width="300" src="./assets/grace-logo.png" alt="logo of grace repository">
</p>

<div align="center">
    <h1>Grace</h1>
    <h3>Design System For Vue Applications</h3>
    <p align="center">
    <a href="https://trendyol.github.io/grace/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://trendyol.github.io/grace/">View Demo</a>
    ·
    <a href="https://github.com/Trendyol/grace/issues">Report Bug</a>
    ·
    <a href="https://github.com/Trendyol/grace/issues">Request Feature</a>
  </p>
</div>

<p align="center">
  <img src="./assets/grace-components.png" alt="components of grace repository">
</p>

### Built With

* [Vue](https://vuejs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [Sass](https://sass-lang.com/)
* [Jest](https://jestjs.io/m)
* [Rollup](https://rollupjs.org/)
* [Storybook](https://storybook.js.org/)

## 📦 Install
```
npm install --save @trendyol-js/grace
```
or

```
yard add @trendyol-js/grace
```

## 🔨 Usage
##### Import styles manually:
```css
@import "~@trendyol-js/grace/css/root";
@import "~@trendyol-js/grace/css/system";
@import '~vue2-datepicker/index.css'; // for datepicker
```

##### Components:
```html
<template>
  <div class="g-p-10">
    <GButton size="medium">Base Button</GButton>
  </div>
</template>

<script>
  import GButton from '@trendyol-js/grace/core/GButton';
  
  export default {
    name: 'Component',
  }
</script>
```

##### Plugins:
```js
import GToasterPlugin from '@trendyol-js/grace/plugins/GToaster.plugin';

Vue.use(GToasterPlugin);
```

##### Directives:
```html
<template>
  <div v-click-outside="hide()" />
</template>

<script>
  import ClickOutside from '@trendyol-js/grace/directives/ClickOutside';
  
  export default {
    name: 'Component',
  }
</script>
```

## 👨‍💻 Local Development

##### Project setup
```
npm install
```

##### Compiles and hot-reloads for development
```
npm run storybook:start
```

##### Compiles and minifies for production
```
npm run build
```

##### Lints and fixes files
```
npm run lint
```

##### Run your unit tests
```
npm run test:unit
```

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/Trendyol/grace/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
