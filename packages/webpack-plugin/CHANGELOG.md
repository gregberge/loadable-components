# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.15.2](https://github.com/gregberge/loadable-components/compare/v5.15.1...v5.15.2) (2021-12-12)

**Note:** Version bump only for package @loadable/webpack-plugin





## [5.15.1](https://github.com/gregberge/loadable-components/compare/v5.15.0...v5.15.1) (2021-08-17)


### Bug Fixes

* add cachedAssets to stats options ([#779](https://github.com/gregberge/loadable-components/issues/779)) ([73b17fd](https://github.com/gregberge/loadable-components/commit/73b17fd067579b1c5d38eba00e157964e0930a94)), closes [#770](https://github.com/gregberge/loadable-components/issues/770)
* SubResourceIntegrity ([#803](https://github.com/gregberge/loadable-components/issues/803)) ([9b34195](https://github.com/gregberge/loadable-components/commit/9b34195627c65372a7c834311c32dfcbd5b7fedd))





# [5.15.0](https://github.com/gregberge/loadable-components/compare/v5.14.2...v5.15.0) (2021-05-08)


### Features

* support multiple Webpack runtimes ([#701](https://github.com/gregberge/loadable-components/issues/701)) ([d351367](https://github.com/gregberge/loadable-components/commit/d3513679ed680e46967ca18555116c06e5a4b341))
* webpack plugin doesn't need all chunk info ([#735](https://github.com/gregberge/loadable-components/issues/735)) ([cea9f24](https://github.com/gregberge/loadable-components/commit/cea9f249f7550a1154cf88bcfa3812ebb78a500f))





## [5.14.2](https://github.com/gregberge/loadable-components/compare/v5.14.1...v5.14.2) (2021-01-31)


### Bug Fixes

* ignore css chunk ([#689](https://github.com/gregberge/loadable-components/issues/689)) ([6926e19](https://github.com/gregberge/loadable-components/commit/6926e190c80f525467980fffbbded0bf933f27ed))
* update hooks for webpack 5 ([#676](https://github.com/gregberge/loadable-components/issues/676)) ([671ef52](https://github.com/gregberge/loadable-components/commit/671ef527e7a37c459df616ee74dc92e106e8245e))





# [5.14.0](https://github.com/gregberge/loadable-components/compare/v5.13.2...v5.14.0) (2020-10-20)


### Features

* make packages webpack 5 compatible ([#638](https://github.com/gregberge/loadable-components/issues/638)) ([e882e4d](https://github.com/gregberge/loadable-components/commit/e882e4d812e714066eba19a11dd119193e7a9e01))





# [5.13.0](https://github.com/gregberge/loadable-components/compare/v5.12.0...v5.13.0) (2020-06-29)


### Bug Fixes

* use make-dir instead of mkdirp ([#544](https://github.com/gregberge/loadable-components/issues/544)) ([5a9c33b](https://github.com/gregberge/loadable-components/commit/5a9c33b222fecb320dc02b643122fbe717aa6fc8))





# [5.12.0](https://github.com/gregberge/loadable-components/compare/v5.11.0...v5.12.0) (2020-01-09)


### Performance Improvements

* avoid calling stats.toJson if possible ([87698de](https://github.com/gregberge/loadable-components/commit/87698de079cb742317a4f6570430ccd5cd526d3e))





## [5.7.1](https://github.com/smooth-code/loadable-components/compare/v5.7.0...v5.7.1) (2019-03-19)


### Bug Fixes

* **webpack-plugin:** create output folder with mkdirp ([#273](https://github.com/smooth-code/loadable-components/issues/273)) ([3767f28](https://github.com/smooth-code/loadable-components/commit/3767f28))





# [5.7.0](https://github.com/smooth-code/loadable-components/compare/v5.6.1...v5.7.0) (2019-03-14)


### Performance Improvements

* **build:** add build target for Node ([#267](https://github.com/smooth-code/loadable-components/issues/267)) ([97ff6ac](https://github.com/smooth-code/loadable-components/commit/97ff6ac))





# [5.5.0](https://github.com/smooth-code/loadable-components/compare/v5.4.0...v5.5.0) (2019-01-22)

**Note:** Version bump only for package @loadable/webpack-plugin





# [5.4.0](https://github.com/smooth-code/loadable-components/compare/v5.3.0...v5.4.0) (2019-01-17)


### Features

* **webpack-plugin:** support custom path in writeToDisk option ([#187](https://github.com/smooth-code/loadable-components/issues/187)) ([4a6f84f](https://github.com/smooth-code/loadable-components/commit/4a6f84f))





## [5.2.2](https://github.com/smooth-code/loadable-components/compare/v5.2.1...v5.2.2) (2018-12-12)

**Note:** Version bump only for package @loadable/webpack-plugin





## [5.2.1](https://github.com/smooth-code/loadable-components/compare/v5.2.0...v5.2.1) (2018-11-27)


### Bug Fixes

* **webpack-plugin:** fix TypeError when set writeToDisk true ([#170](https://github.com/smooth-code/loadable-components/issues/170)) ([2d1fb11](https://github.com/smooth-code/loadable-components/commit/2d1fb11))





# [5.2.0](https://github.com/smooth-code/loadable-components/compare/v5.1.3...v5.2.0) (2018-11-23)


### Features

* **webpack-plugin:** add writeToDisk option ([#161](https://github.com/smooth-code/loadable-components/issues/161)) ([6b5ba21](https://github.com/smooth-code/loadable-components/commit/6b5ba21))





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

**Note:** Version bump only for package @loadable/webpack-plugin





## [4.0.4](https://github.com/smooth-code/loadable-components/compare/v4.0.3...v4.0.4) (2018-10-31)


### Bug Fixes

* fix peer dependencies ([6816e8c](https://github.com/smooth-code/loadable-components/commit/6816e8c))





## [4.0.3](https://github.com/smooth-code/loadable-components/compare/v4.0.2...v4.0.3) (2018-10-31)


### Bug Fixes

* **server:** disable common chunks optim ([78e7b28](https://github.com/smooth-code/loadable-components/commit/78e7b28))





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
