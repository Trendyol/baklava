# Contributing to Baklava Design System 🎨

Welcome to Baklava! We're excited that you're interested in contributing. This guide will help you get started with making contributions to our design system.

![Baklava Design System](./docs/images/contributing-header.png)

## Ways to Contribute 🚀

There are several ways you can contribute to Baklava:

- 🐛 **Fix Bugs**: Help us squash bugs in the codebase
- ✨ **Add Features**: Implement new components or enhance existing ones
- 📝 **Improve Docs**: Make our documentation clearer and more helpful
- 💡 **Share Ideas**: Suggest improvements to our design system

## Getting Started 🌟

### 1. Creating an Issue 📋

Found a bug or have a suggestion? [Create an issue](https://github.com/Trendyol/baklava/issues/new)!

![Creating an Issue](./docs/images/create-issue.gif)

**Tips for a great issue:**
- Clearly describe what you observed
- Include steps to reproduce (for bugs)
- Add screenshots if relevant
- Use our issue templates
- Share any relevant context or examples

> 💬 For questions about using Baklava, please use our [discussion board](https://github.com/Trendyol/baklava/discussions).

### 2. Making a Pull Request 🔄

If you notice a problem in our repository (whether it's in the code or docs) and are able to fix it, follow these steps:

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Submit a pull request

![PR Process](./docs/images/pr-process.gif)
Need help? Check out the [GitHub documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches) on creating PRs.

## Contribution Guidelines ✅

### 1. Coding Conventions 💻

We maintain strict code quality standards:
- Run `npm run lint` before submitting your changes
- Follow our code style guidelines
- Ensure your code syncs with our current codebase style
- Fix any linting errors before submitting

### 2. Test Coverage Requirements 🧪

We maintain 100% code coverage:
- Write unit tests for all new code
- Run `npm test` to check coverage
- Review the `coverage` folder for detailed reports
- Tests run automatically on commit
- PRs will fail if coverage drops below 100%

### 3. Commit Message Guidelines 📝

Our release process is automated:
- Release versions are generated from commit messages
- Release notes are automatically created
- Follow our specific commit message format
- Each commit should be meaningful and descriptive

### 4. Design Review Process 🎨

We protect our visual consistency:
- Automated visual regression tests run on each PR
- Changes affecting component visuals require design review
- Design team must approve visual changes
- Approved changes become reference for future work
- Non-visual changes skip design review automatically

### 5. RTL Support Requirements 🌐

All components must support Right-to-Left (RTL) languages:

1. Use `--bl-text-x-direction` CSS property for transformations
2. Implement CSS logical properties:
```css
/* ✅ Do this */
margin-inline-start: 1rem;
padding-inline-end: 1rem;

/* ❌ Not this */
margin-left: 1rem;
padding-right: 1rem;
```
3. Use `inset` with logical values for positioning

### 6. PR Review Requirements 👥

Every PR must meet these criteria:
- At least one core contributor approval
- Detailed PR description
- All automated checks passing
- Documentation updates if needed
- Test coverage requirements met

## Need Help? 💬

- Check our [documentation](https://baklava.design/)
- Join our [discussion board](https://github.com/Trendyol/baklava/discussions)
- Reach out to core team members

Thank you for contributing to Baklava! 🙏
