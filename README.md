
<p align="center"><img src="https://user-images.githubusercontent.com/127687/233114483-c5b0a8e7-c072-4ced-a7b5-76bce1be4b21.svg" width="200" alt="Baklava Design System Logo" /></p>

<h1 align="center">Baklava Design System</h1>

<p style="display:flex;flex-direction:row;gap:10px;justify-content:center;">
  <a href="https://www.npmjs.com/package/@trendyol/baklava">
    <img src="https://img.shields.io/npm/v/@trendyol/baklava.svg" alt="NPM Package Stable" />
  </a>
  <a href="https://www.npmjs.com/package/@trendyol/baklava/v/beta">
    <img src="https://img.shields.io/npm/v/@trendyol/baklava/beta.svg" alt="NPM Package Beta" />
  </a>
  <a href="https://github.com/Trendyol/baklava/blob/next/LICENSE">
    <img src="https://img.shields.io/github/license/trendyol/baklava" alt="License" />
  </a>
  <a href="https://www.jsdelivr.com/package/npm/@trendyol/baklava">
    <img src="https://img.shields.io/jsdelivr/npm/hm/@trendyol/baklava" alt="jsDelivr hits" />
  </a>
  <a href="https://github.com/semantic-release/semantic-release">
    <img src="https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release" alt="semantic-release: angular" />
  </a>
  <a href="https://scorecard.dev/viewer/?uri=github.com/Trendyol/baklava">
    <img src="https://api.scorecard.dev/projects/github.com/Trendyol/baklava/badge" alt="OpenSSF Scorecard" />
  </a>
</p>

Baklava is a design system provided by [Trendyol](https://github.com/trendyol) to create a consistent UI/UX for app users.

Web implementation of the design system is created as native web components so it can be used within every type of web frameworks including Vue, React or Angular. Our target is providing a UI library that has neatly designed and developed for providing best possible user experience for the users of applications that uses Baklava DS.

## How to use

Preferred way of using Baklava is using it via CDN. Just import library JS and CSS files to your main document like below:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/themes/default.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/@trendyol/baklava/dist/baklava.js"></script>

<!-- We highly recommend using the manuel version of the Baklava library -->

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@trendyol/baklava@x.x.x/dist/themes/default.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/@trendyol/baklava@x.x.x/dist/baklava.js"></script>

```


This way library will be served from a very high performant CDN and all of the Baklava web components will be ready to use inside your web project.

```html
<bl-button>Baklava works!</bl-button>
```

## How to contribute

Baklava Design System is always open for direct contributions. Contributions can be in the form of design suggestions, documentation improvements, new component
suggestions, code improvements, adding new features or fixing problems. For more information please check our [Contribution Guideline document](./CONTRIBUTING.md).

## Useful Links

* [Storybook Documentation](https://baklava.design/)
* [Figma Design Document](https://www.figma.com/file/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide)
* [Project Board](https://github.com/orgs/Trendyol/projects/4)
* [Discussion Board](https://github.com/Trendyol/baklava/discussions)
* [Mobile (React-Native) Implementation](https://github.com/Trendyol/baklava-react-native)
* [Icons Library](https://github.com/Trendyol/baklava-icons)
