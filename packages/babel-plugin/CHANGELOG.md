# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [5.10.0](https://github.com/smooth-code/loadable-components/compare/v5.9.0...v5.10.0) (2019-05-13)


### Bug Fixes

* fix chunkname mismatch ([#332](https://github.com/smooth-code/loadable-components/issues/332)) ([7ffaa4c](https://github.com/smooth-code/loadable-components/commit/7ffaa4c)), closes [#331](https://github.com/smooth-code/loadable-components/issues/331)





# [5.8.0](https://github.com/smooth-code/loadable-components/compare/v5.7.2...v5.8.0) (2019-04-10)


### Bug Fixes

* **babel-plugin:** Use require.resolve instead of relative path resolution ([#303](https://github.com/smooth-code/loadable-components/issues/303)) ([bad7f1f](https://github.com/smooth-code/loadable-components/commit/bad7f1f))





## [5.7.2](https://github.com/smooth-code/loadable-components/compare/v5.7.1...v5.7.2) (2019-03-20)


### Bug Fixes

* **babel-plugin:** handle "-" at the end of request ([c0f325b](https://github.com/smooth-code/loadable-components/commit/c0f325b))





## [5.7.1](https://github.com/smooth-code/loadable-components/compare/v5.7.0...v5.7.1) (2019-03-19)


### Bug Fixes

* **babel-plugin:** handle special chars in file names ([#279](https://github.com/smooth-code/loadable-components/issues/279)) ([4da39ff](https://github.com/smooth-code/loadable-components/commit/4da39ff))





# [5.7.0](https://github.com/smooth-code/loadable-components/compare/v5.6.1...v5.7.0) (2019-03-14)


### Performance Improvements

* **build:** add build target for Node ([#267](https://github.com/smooth-code/loadable-components/issues/267)) ([97ff6ac](https://github.com/smooth-code/loadable-components/commit/97ff6ac))





# [5.6.0](https://github.com/smooth-code/loadable-components/compare/v5.5.0...v5.6.0) (2019-02-05)


### Bug Fixes

* **server:** fix chunkName resolving ([#219](https://github.com/smooth-code/loadable-components/issues/219)) ([ef11e11](https://github.com/smooth-code/loadable-components/commit/ef11e11))


### Features

* **babel-plugin:** transform code annotated with magic comment ([4f832dc](https://github.com/smooth-code/loadable-components/commit/4f832dc)), closes [#192](https://github.com/smooth-code/loadable-components/issues/192)





# [5.5.0](https://github.com/smooth-code/loadable-components/compare/v5.4.0...v5.5.0) (2019-01-22)

**Note:** Version bump only for package @loadable/babel-plugin





## [5.2.2](https://github.com/smooth-code/loadable-components/compare/v5.2.1...v5.2.2) (2018-12-12)


### Bug Fixes

* **babel-plugin:** fix chunkName with aggressive code splitting ([e974933](https://github.com/smooth-code/loadable-components/commit/e974933)), closes [#182](https://github.com/smooth-code/loadable-components/issues/182)





# [5.0.0](https://github.com/smooth-code/loadable-components/compare/v4.0.5...v5.0.0) (2018-11-10)


### Features

* improve SSR support ([eb1cfe8](https://github.com/smooth-code/loadable-components/commit/eb1cfe8))


### BREAKING CHANGES

* - SSR has been rewritten from scratch, if you use it, please follow the
new guide.
- Prefetch component and prefetch functions have been removed, please
use `webpackPrefetch` instead.





## [4.0.5](https://github.com/smooth-code/loadable-components/compare/v4.0.4...v4.0.5) (2018-11-01)

**Note:** Version bump only for package @loadable/babel-plugin





## [4.0.3](https://github.com/smooth-code/loadable-components/compare/v4.0.2...v4.0.3) (2018-10-31)


### Bug Fixes

* **server:** disable common chunks optim ([78e7b28](https://github.com/smooth-code/loadable-components/commit/78e7b28))





## [4.0.2](https://github.com/smooth-code/loadable-components/compare/v4.0.1...v4.0.2) (2018-10-31)


### Bug Fixes

* **babel-plugin:** transform into friendly chunk name ([54422cb](https://github.com/smooth-code/loadable-components/commit/54422cb))





# [4.0.0](https://github.com/smooth-code/loadable-components/compare/v3.0.2...v4.0.0) (2018-10-30)


### Features

* add new loadable.lib, change API ([94b2e87](https://github.com/smooth-code/loadable-components/commit/94b2e87))


### BREAKING CHANGES

* - `ErrorComponent` is ignored, please use Error Boundaries to handle errors.
- `lazy` is no longer exported
- `LoadingComponent` is replaced by `fallback` option
- `ref` are now forwarded





# [3.0.0](https://github.com/smooth-code/loadable-components/compare/v2.2.3...v3.0.0) (2018-10-29)


### Features

* welcome loadable ([4dffad7](https://github.com/smooth-code/loadable-components/commit/4dffad7))


### BREAKING CHANGES

* API has completely changed, see documentation.
