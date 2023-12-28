# How to contribute Baklava Design System

You are very welcome if you want to contribute to the Baklava Design System. You can make several types of contributions, such as:

* Fixing bugs in code
* Implementing new features
* Improving documentation
* Suggesting design ideas

## Making a contribution using an Issue

Did you notice a bug? Or a missing/wrong part in documentation? Or do you have a suggestion about implementation or design? Please feel free to [create an issue](https://github.com/Trendyol/baklava/issues/new) for that. Please provide clear and detailed information about your request or report as much as possible. Anyone can join to share their ideas/experiences about the issue you created.

If you have a question about how to use our design system or a specific component, please use our [discussion board](https://github.com/Trendyol/baklava/discussions).

## Making a contribution using a PR

If you notice a problem in our repository (whether it's in the code or docs) and are able to fix it, just fork the project, make your changes, and create a PR for it. You can refer to [GitHub documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches) if you are not sure how to propose a change to a repository.

## Baklava contribution rules

We have some rules to make contribution process smooth and as automated as possible.

### Coding conventions

We implemented several linters and static code checkers to be sure if every new code is synced with the style of current codebase. Please run the `npm run lint` to check if your changes conflict with our rules.

### 100% Code coverage with unit tests

We expect to cover every line of code we wrote in our unit tests. If you make changes in the code, please ensure that you cover those changes inside the related test file. To do that, you can run the `npm test` command and check the `coverage` folder for a detailed report. This command is automatically executed in every commit, and if coverage is under 100%, your PR checks will fail.

### Commit rules

The Baklava library has an automated release flow, and our release versions and release notes are automatically generated from git commit messages. So commit messages are very important to release changes properly. We have a specific guideline about committing rules, please refer it.

### Design review

In every push to a PR, we are running automated visual regression tests to be sure we are not breaking any components visual output accidentally. When you are done with your changes and created a PR, if you have some changes that effects visual output of any components, then our automated flow will notice this and block PR for a design review. Design reviews are done by designers involved in project. If the changes are intentional, they will be approved, and once the PR is merged, the new designs will serve as references for upcoming PRs. If there are no visual changes, this step will pass automatically, and there will be no need for a review from a designer.

### Enough approvals to merge

Every PR should be reviewed and approved by at least one of the core contributors. Please add needed information to PR description to help making review process quicker and easier.
