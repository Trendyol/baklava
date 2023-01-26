![image](https://user-images.githubusercontent.com/127687/194415334-0dc8fbf2-3e87-44ed-b23a-0cc9da767b11.png)

# Baklava Design System

[![npm package](https://img.shields.io/npm/v/@trendyol/baklava/beta.svg)](https://www.npmjs.com/package/@trendyol/baklava) [![jsDelivr hits (npm scoped)](https://img.shields.io/jsdelivr/npm/hm/@trendyol/baklava)](https://www.jsdelivr.com/package/npm/@trendyol/baklava) [![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

> This is a work-in-progress version. If you want to work on previous version (Grace) please check `main` branch.

Baklava is a design system provided by [Trendyol](https://github.com/trendyol) to create a consistent UI/UX for app users.

Web implementation of the design system is created as native web components so it can be used within every type of web frameworks including Vue, React or Angular. Our target is providing a UI library that has neatly designed and developed for providing best possible user experience for the users of applications that uses Baklava DS.

## How to use

Preferred way of using Baklava is using it via CDN. Just import library JS and CSS files to your main document like below:

> **Since we are in beta version, there can be breaking changes in build. We don’t suggest you to use beta tag. Use versions instead.**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@trendyol/baklava@beta/dist/themes/default.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/@trendyol/baklava@beta/dist/baklava.js"></script>
```

This way library will be served from a very high performant CDN and all of the Baklava web components will be ready to use inside your web project.

> **⚠️ Because the scripts of the custom components are loaded into the DOM later, the baklava components may appear unstyled on the screen for a while. In order to avoid this 'FOUCE' effect, you can follow the instructions at this
 [link](https://www.abeautifulsite.net/posts/flash-of-undefined-custom-elements/).**

## Useful Links

* [Storybook Documentation](https://trendyol.github.io/baklava/)
* [Figma Design Document](https://www.figma.com/file/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide)
* [Project Board](https://github.com/orgs/Trendyol/projects/4)
* [Discussion Board](https://github.com/Trendyol/baklava/discussions)
* [Mobile (React-Native) Implementation](https://github.com/Trendyol/baklava-react-native)
