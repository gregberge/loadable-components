# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.1.2](https://github.com/smooth-code/loadable-components/compare/v5.1.1...v5.1.2) (2018-11-13)


### Bug Fixes

* fix ref handler in `loadable.lib` ([da05d87](https://github.com/smooth-code/loadable-components/commit/da05d87))





# [5.0.0](https://github.com/smooth-code/loadable-components/compare/v4.0.5...v5.0.0) (2018-11-10)


### Bug Fixes

* fix loadableReady ([59693bb](https://github.com/smooth-code/loadable-components/commit/59693bb))


### Features

* improve SSR support ([eb1cfe8](https://github.com/smooth-code/loadable-components/commit/eb1cfe8))


### BREAKING CHANGES

* - SSR has been rewritten from scratch, if you use it, please follow the
new guide.
- Prefetch component and prefetch functions have been removed, please
use `webpackPrefetch` instead.





## [4.0.2](https://github.com/smooth-code/loadable-components/compare/v4.0.1...v4.0.2) (2018-10-31)


### Bug Fixes

* **component:** fix lazy usage ([d711ee0](https://github.com/smooth-code/loadable-components/commit/d711ee0))





## [4.0.1](https://github.com/smooth-code/loadable-components/compare/v4.0.0...v4.0.1) (2018-10-30)


### Bug Fixes

* **component:** do not call ref several times ([8cf3190](https://github.com/smooth-code/loadable-components/commit/8cf3190))





# [4.0.0](https://github.com/smooth-code/loadable-components/compare/v3.0.2...v4.0.0) (2018-10-30)


### Features

* add new loadable.lib, change API ([94b2e87](https://github.com/smooth-code/loadable-components/commit/94b2e87))


### BREAKING CHANGES

* - `ErrorComponent` is ignored, please use Error Boundaries to handle errors.
- `lazy` is no longer exported
- `LoadingComponent` is replaced by `fallback` option
- `ref` are now forwarded





## [3.0.2](https://github.com/smooth-code/loadable-components/compare/v3.0.1...v3.0.2) (2018-10-30)


### Bug Fixes

* **component:** fix loadComponent (typo) ([a410cb2](https://github.com/smooth-code/loadable-components/commit/a410cb2))





## [3.0.1](https://github.com/smooth-code/loadable-components/compare/v3.0.0...v3.0.1) (2018-10-30)


### Bug Fixes

* **component:** fix loadComponents ([bd2220c](https://github.com/smooth-code/loadable-components/commit/bd2220c))





# [3.0.0](https://github.com/smooth-code/loadable-components/compare/v2.2.3...v3.0.0) (2018-10-29)


### Features

* welcome loadable ([4dffad7](https://github.com/smooth-code/loadable-components/commit/4dffad7))


### BREAKING CHANGES

* API has completely changed, see documentation.
