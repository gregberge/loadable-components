# How to Contribute

Loadable Components is a small project, it is widely used but has not a lot of contributors. We're still working out the kinks to make contributing to this project as easy and transparent as possible, but we're not quite there yet. Hopefully this document makes the process for contributing clear and answers some questions that you may have.

## [Code of Conduct](https://github.com/gregberge/loadable-components/blob/master/CODE_OF_CONDUCT.md)

We expect project participants to adhere to our Code of Conduct. Please read [the full text](https://github.com/gregberge/loadable-components/blob/master/CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

## Open Development

All work on Loadable Components happens directly on [GitHub](/). Both core team members and external contributors send pull requests which go through the same review process.

### Workflow and Pull Requests

_Before_ submitting a pull request, please make sure the following is done…

1.  Fork the repo and create your branch from `master`. A guide on how to fork a repository: https://help.github.com/articles/fork-a-repo/

    Open terminal (e.g. Terminal, iTerm, Git Bash or Git Shell) and type:

    ```sh-session
    $ git clone https://github.com/<your_username>/loadable-components
    $ cd loadable-components
    $ git checkout -b my_branch
    ```

    Note: Replace `<your_username>` with your GitHub username

2.  Loadable Components uses [Yarn](https://code.fb.com/web/yarn-a-new-package-manager-for-javascript/) for running development scripts. If you haven't already done so, please [install yarn](https://yarnpkg.com/en/docs/install).

3.  Run `yarn install`. On Windows: To install [Yarn](https://yarnpkg.com/en/docs/install#windows-tab) on Windows you may need to download either node.js or Chocolatey<br />

    ```sh
    yarn install
    ```

    To check your version of Yarn and ensure it's installed you can type:

    ```sh
    yarn --version
    ```

4.  If you've added code that should be tested, add tests. You can use watch mode that continuously transforms changed files to make your life easier.

    ```sh
    # in the background
    yarn run dev
    ```

5.  If you've changed APIs, update the documentation.

6.  Ensure the linting is good via `yarn lint`.

    ```sh-session
    $ yarn lint
    ```

7.  Ensure the test suite passes via `yarn test`.

    ```sh-session
    $ yarn test
    ```

#### Testing with your own project

You can use `yarn run release-from-git` to create releases as tags on github. This requires that:

- Your git remote (where you want to publish the tags) is `origin`
- Your commit messages follow the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. For example: `feat: add timeout option`.

## Bugs

### Where to Find Known Issues

We will be using GitHub Issues for our public bugs. We will keep a close eye on this and try to make it clear when we have an internal fix in progress. Before filing a new issue, try to make sure your problem doesn't already exist.

### Reporting New Issues

The best way to get your bug fixed is to provide a reduced test case. Please provide a public repository with a runnable example.

## Code Conventions

Please follow the `.prettierrc` in the project.

## License

By contributing to Loadable Components, you agree that your contributions will be licensed under its MIT license.
