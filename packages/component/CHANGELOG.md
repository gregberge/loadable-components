# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [5.7.0](https://github.com/smooth-code/loadable-components/compare/v5.6.1...v5.7.0) (2019-03-14)


### Bug Fixes

* **component:** fix warning message about babel ([#255](https://github.com/smooth-code/loadable-components/issues/255)) ([7cb68a1](https://github.com/smooth-code/loadable-components/commit/7cb68a1)), closes [#253](https://github.com/smooth-code/loadable-components/issues/253)


### Features

* use inline JSON to enabling CSP without `unsafe-inline` ([05e5500](https://github.com/smooth-code/loadable-components/commit/05e5500))





## [5.6.1](https://github.com/smooth-code/loadable-components/compare/v5.6.0...v5.6.1) (2019-02-25)


### Bug Fixes

* **component:** better ES Modules handling ([#228](https://github.com/smooth-code/loadable-components/issues/228)) ([3628363](https://github.com/smooth-code/loadable-components/commit/3628363))
* **suspense:** fix suspense mode in React v16.8+ ([#251](https://github.com/smooth-code/loadable-components/issues/251)) ([d04e1c9](https://github.com/smooth-code/loadable-components/commit/d04e1c9))





# [5.6.0](https://github.com/smooth-code/loadable-components/compare/v5.5.0...v5.6.0) (2019-02-05)


### Features

* **component:** add preload method ([#224](https://github.com/smooth-code/loadable-components/issues/224)) ([4a67ace](https://github.com/smooth-code/loadable-components/commit/4a67ace)), closes [#196](https://github.com/smooth-code/loadable-components/issues/196)
* **server:** add option to disable SSR ([#223](https://github.com/smooth-code/loadable-components/issues/223)) ([4cab4f9](https://github.com/smooth-code/loadable-components/commit/4cab4f9)), closes [#195](https://github.com/smooth-code/loadable-components/issues/195)





# [5.5.0](https://github.com/smooth-code/loadable-components/compare/v5.4.0...v5.5.0) (2019-01-22)

**Note:** Version bump only for package @loadable/component





## [5.2.2](https://github.com/smooth-code/loadable-components/compare/v5.2.1...v5.2.2) (2018-12-12)


### Bug Fixes

* ensure that component is mounted before calling `setState` ([#184](https://github.com/smooth-code/loadable-components/issues/184)) ([fe0f47f](https://github.com/smooth-code/loadable-components/commit/fe0f47f)), closes [#180](https://github.com/smooth-code/loadable-components/issues/180)





## [5.2.1](https://github.com/smooth-code/loadable-components/compare/v5.2.0...v5.2.1) (2018-11-27)


### Bug Fixes

* upgrade hoist-non-react-statics@3.2.0 ([122b1ce](https://github.com/smooth-code/loadable-components/commit/122b1ce))





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
