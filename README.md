<p align="center">
  <img width="400" src="./assets/grace-logo.png" alt="logo of grace repository">
</p>

<div align="center">
    <h1>Grace</h1>
    <h3>Design System For Vue Applications</h3>
</div>

<p align="center">
  <img src="./assets/grace-components.png" alt="components of grace repository">
</p>

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

##### Run your tests
```
npm run test
```

##### Lints and fixes files
```
npm run lint
```

##### Run your unit tests
```
npm run test:unit
```

## License

Distributed under the MIT License. See `LICENSE` for more information.
