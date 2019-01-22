# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [5.5.0](https://github.com/smooth-code/loadable-components/compare/v5.4.0...v5.5.0) (2019-01-22)


### Features

* allow to specify extra attributes in getScriptTags & others ([#210](https://github.com/smooth-code/loadable-components/issues/210)) ([8a3d067](https://github.com/smooth-code/loadable-components/commit/8a3d067))





# [5.4.0](https://github.com/smooth-code/loadable-components/compare/v5.3.0...v5.4.0) (2019-01-17)


### Features

* **webpack-plugin:** support custom path in writeToDisk option ([#187](https://github.com/smooth-code/loadable-components/issues/187)) ([4a6f84f](https://github.com/smooth-code/loadable-components/commit/4a6f84f))





# [5.3.0](https://github.com/smooth-code/loadable-components/compare/v5.2.2...v5.3.0) (2019-01-11)


### Features

* support inline CSS ([#190](https://github.com/smooth-code/loadable-components/issues/190)) ([2caf676](https://github.com/smooth-code/loadable-components/commit/2caf676))





## [5.2.2](https://github.com/smooth-code/loadable-components/compare/v5.2.1...v5.2.2) (2018-12-12)


### Bug Fixes

* **server:** fix usage when compiled using webpack ([#185](https://github.com/smooth-code/loadable-components/issues/185)) ([5e28870](https://github.com/smooth-code/loadable-components/commit/5e28870)), closes [#181](https://github.com/smooth-code/loadable-components/issues/181)





# [5.2.0](https://github.com/smooth-code/loadable-components/compare/v5.1.3...v5.2.0) (2018-11-23)


### Bug Fixes

* **server:** fix url join ([#166](https://github.com/smooth-code/loadable-components/issues/166)) ([ba90289](https://github.com/smooth-code/loadable-components/commit/ba90289))
* **server:** support protocol free paths ([#163](https://github.com/smooth-code/loadable-components/issues/163)) ([3b5b115](https://github.com/smooth-code/loadable-components/commit/3b5b115))





## [5.1.3](https://github.com/smooth-code/loadable-components/compare/v5.1.2...v5.1.3) (2018-11-20)


### Bug Fixes

* **server:** exclude http and https from regex ([#155](https://github.com/smooth-code/loadable-components/issues/155)) ([0bb2ad9](https://github.com/smooth-code/loadable-components/commit/0bb2ad9)), closes [#153](https://github.com/smooth-code/loadable-components/issues/153)
* **server:** ignore *.hot-update.js ([edcd2c8](https://github.com/smooth-code/loadable-components/commit/edcd2c8)), closes [#148](https://github.com/smooth-code/loadable-components/issues/148)





## [5.1.1](https://github.com/smooth-code/loadable-components/compare/v5.1.0...v5.1.1) (2018-11-13)


### Bug Fixes

* **server:** ignore source maps ([9991bbd](https://github.com/smooth-code/loadable-components/commit/9991bbd)), closes [#128](https://github.com/smooth-code/loadable-components/issues/128)





# [5.1.0](https://github.com/smooth-code/loadable-components/compare/v5.0.2...v5.1.0) (2018-11-10)


### Features

* **server:** add outputPath option in ChunkExtractor ([aac26b3](https://github.com/smooth-code/loadable-components/commit/aac26b3))





## [5.0.2](https://github.com/smooth-code/loadable-components/compare/v5.0.1...v5.0.2) (2018-11-10)


### Bug Fixes

* update peer dependencies ([b0363dc](https://github.com/smooth-code/loadable-components/commit/b0363dc))





# [5.0.0](https://github.com/smooth-code/loadable-components/compare/v4.0.5...v5.0.0) (2018-11-10)


### Features

* improve SSR support ([eb1cfe8](https://github.com/smooth-code/loadable-components/commit/eb1cfe8))


### BREAKING CHANGES

* - SSR has been rewritten from scratch, if you use it, please follow the
new guide.
- Prefetch component and prefetch functions have been removed, please
use `webpackPrefetch` instead.





## [4.0.5](https://github.com/smooth-code/loadable-components/compare/v4.0.4...v4.0.5) (2018-11-01)


### Bug Fixes

* **server:** fix getScriptElements ([ba424e0](https://github.com/smooth-code/loadable-components/commit/ba424e0))





## [4.0.4](https://github.com/smooth-code/loadable-components/compare/v4.0.3...v4.0.4) (2018-10-31)


### Bug Fixes

* fix peer dependencies ([6816e8c](https://github.com/smooth-code/loadable-components/commit/6816e8c))





## [4.0.3](https://github.com/smooth-code/loadable-components/compare/v4.0.2...v4.0.3) (2018-10-31)


### Bug Fixes

* **server:** disable common chunks optim ([78e7b28](https://github.com/smooth-code/loadable-components/commit/78e7b28))





# [4.0.0](https://github.com/smooth-code/loadable-components/compare/v3.0.2...v4.0.0) (2018-10-30)

**Note:** Version bump only for package @loadable/server





# [3.0.0](https://github.com/smooth-code/loadable-components/compare/v2.2.3...v3.0.0) (2018-10-29)


### Features

* welcome loadable ([4dffad7](https://github.com/smooth-code/loadable-components/commit/4dffad7))


### BREAKING CHANGES

* API has completely changed, see documentation.
