# How to contribute Baklava Design System

You are very welcome if you want to contribute Baklava Design System. There can be several types of contributions you can make:

* Fixing bugs in code
* Implementing new features
* Improving documentation
* Suggesting design ideas

## Making a contribution with an Issue

Did you notice a bug? Or a missing/wrong part in documentation? Or do you have a suggestion about implementation or design? Please feel free to [create an issue](https://github.com/Trendyol/baklava/issues/new) for that. Please give clear and detailed information about your request or report as much as possible. Anyone can join for giving their ideas/experience about issue you created.

If you just a question about how to use our design system or a specific component, please use our [discussion board](https://github.com/Trendyol/baklava/discussions).

## Making a contribution with a PR

If you noticed a problem in our repository (can be inside the code or docs) and able to fix it, just fork project, make your changes and create a PR with it. You can check [GitHub documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches) if you are not sure how to propose a change to a repository.

## Baklava contribution rules

We have some rules to make contribution process smooth and as automated as possible.

### Code writing conventions

We implemented several linters and static code checkers to be sure if every new code is synced with the style of current codebase. Please run `npm run lint` command to see if your changes have any conflict with our rules.

### %100 Code coverage with unit tests

We expect to cover every line of code we wrote in our unit tests. If you change something in code please be sure that you are covering those changes inside related test file. To do that you can run `npm test` command and check `coverage` folder for detailed report. This command is automatically executed in every commits and if coverage is under %100 your PR checks will fail.

### Commit rules

Baklava library has an automated release flow and our release version and release notes are automatically generated from git commit messages. So commit messages are very important to release changes properly. We have a specific guideline about committing rules, please refer it.

### Design review

In every push to a PR, we are running automated visual regression tests to be sure we are not breaking any components visual output accidentally. When you are done with your changes and created a PR, if you have some changes that effects visual output of any components, then our automated flow will notice this and block PR for a design review. Design reviews are done by designers involved in project. If the changes are intentional, they will be approved and once PR merged, new designs will be new references for upcoming PRs. If there is no visual changes this step will pass automatically and there will be no need a review from a designer.

### Enough approvals to merge

Every PR should be reviewed and approved at least one of the core contributors. Please add needed information to PR description to help making review process quicker and easier.
