# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [5.14.0](https://github.com/gregberge/loadable-components/compare/v5.13.2...v5.14.0) (2020-10-20)


### Bug Fixes

* add key to chunks script elements ([#631](https://github.com/gregberge/loadable-components/issues/631)) ([25b532e](https://github.com/gregberge/loadable-components/commit/25b532eb53a2841229dbc8a9c91f24112a46b93f)), closes [#628](https://github.com/gregberge/loadable-components/issues/628)
* treat mjs as script ([575fe2b](https://github.com/gregberge/loadable-components/commit/575fe2b3f58b18c17416f238780b9bab85110706))


### Features

* make packages webpack 5 compatible ([#638](https://github.com/gregberge/loadable-components/issues/638)) ([e882e4d](https://github.com/gregberge/loadable-components/commit/e882e4d812e714066eba19a11dd119193e7a9e01))





## [5.13.2](https://github.com/gregberge/loadable-components/compare/v5.13.1...v5.13.2) (2020-09-14)


### Bug Fixes

* spread nested required chunks array ([95e6ecb](https://github.com/gregberge/loadable-components/commit/95e6ecb0dd9be3cf18ded934cca433a660fa3543))





## [5.13.1](https://github.com/gregberge/loadable-components/compare/v5.13.0...v5.13.1) (2020-07-02)


### Bug Fixes

* expose used chunkNames from a server. Fixes [#587](https://github.com/gregberge/loadable-components/issues/587) ([831aec0](https://github.com/gregberge/loadable-components/commit/831aec03154ab16007db0d78fbf3559583c000fe))





# [5.13.0](https://github.com/gregberge/loadable-components/compare/v5.12.0...v5.13.0) (2020-06-29)


### Bug Fixes

* memory leak in module cache management, fixes [#560](https://github.com/gregberge/loadable-components/issues/560) ([6c11703](https://github.com/gregberge/loadable-components/commit/6c11703cbc5446fc61d10c47b64e84a00cf899c3))





# [5.12.0](https://github.com/gregberge/loadable-components/compare/v5.11.0...v5.12.0) (2020-01-09)


### Bug Fixes

* apply loadable transformations before any other, fixes [#466](https://github.com/gregberge/loadable-components/issues/466) ([ac5ba45](https://github.com/gregberge/loadable-components/commit/ac5ba45862bad68b971a969e6e8713874add51a6))





# [5.11.0](https://github.com/smooth-code/loadable-components/compare/v5.10.3...v5.11.0) (2019-12-02)


### Bug Fixes

* **server:** use require instead of module.require ([#457](https://github.com/smooth-code/loadable-components/issues/457)) ([064b4f8](https://github.com/smooth-code/loadable-components/commit/064b4f83b291e8a7d73bc44fe4196dc9ddc81fe8)), closes [#455](https://github.com/smooth-code/loadable-components/issues/455)


### Features

* add support for SRI (integrity) (with webpack-subresource-integrity) ([#436](https://github.com/smooth-code/loadable-components/issues/436)) ([586ad0a](https://github.com/smooth-code/loadable-components/commit/586ad0af6e172e3a0bffdbe0c8ab682c0d8b0eab))





## [5.10.3](https://github.com/smooth-code/loadable-components/compare/v5.10.2...v5.10.3) (2019-09-24)


### Bug Fixes

* empty cache on each server reload ([#431](https://github.com/smooth-code/loadable-components/issues/431)) ([d4428c6](https://github.com/smooth-code/loadable-components/commit/d4428c6)), closes [#230](https://github.com/smooth-code/loadable-components/issues/230)





## [5.10.2](https://github.com/smooth-code/loadable-components/compare/v5.10.1...v5.10.2) (2019-07-15)


### Performance Improvements

* use more performant url join impl ([#353](https://github.com/smooth-code/loadable-components/issues/353)) ([c3fbbef](https://github.com/smooth-code/loadable-components/commit/c3fbbef))





# [5.9.0](https://github.com/smooth-code/loadable-components/compare/v5.8.0...v5.9.0) (2019-04-23)


### Features

* support multiple react apps ([#317](https://github.com/smooth-code/loadable-components/issues/317)) ([dc54050](https://github.com/smooth-code/loadable-components/commit/dc54050)), closes [#311](https://github.com/smooth-code/loadable-components/issues/311)
* **server:** authorize custom filesystem ([#318](https://github.com/smooth-code/loadable-components/issues/318)) ([f2a6bbd](https://github.com/smooth-code/loadable-components/commit/f2a6bbd)), closes [#315](https://github.com/smooth-code/loadable-components/issues/315)





# [5.8.0](https://github.com/smooth-code/loadable-components/compare/v5.7.2...v5.8.0) (2019-04-10)


### Features

* **ChunkExtractor:** support publicPath override ([#292](https://github.com/smooth-code/loadable-components/issues/292)) ([9731e9c](https://github.com/smooth-code/loadable-components/commit/9731e9c))
* **server:** support function in attributes ([#277](https://github.com/smooth-code/loadable-components/issues/277)) ([c172324](https://github.com/smooth-code/loadable-components/commit/c172324))


### Performance Improvements

* **server:** improve lodash imports for serverless bundles ([#298](https://github.com/smooth-code/loadable-components/issues/298)) ([96841f2](https://github.com/smooth-code/loadable-components/commit/96841f2))





# [5.7.0](https://github.com/smooth-code/loadable-components/compare/v5.6.1...v5.7.0) (2019-03-14)


### Bug Fixes

* **server:** fix loading order of assets ([#266](https://github.com/smooth-code/loadable-components/issues/266)) ([4c8ae60](https://github.com/smooth-code/loadable-components/commit/4c8ae60))


### Features

* use inline JSON to enabling CSP without `unsafe-inline` ([05e5500](https://github.com/smooth-code/loadable-components/commit/05e5500))


### Performance Improvements

* **build:** add build target for Node ([#267](https://github.com/smooth-code/loadable-components/issues/267)) ([97ff6ac](https://github.com/smooth-code/loadable-components/commit/97ff6ac))





## [5.6.1](https://github.com/smooth-code/loadable-components/compare/v5.6.0...v5.6.1) (2019-02-25)


### Bug Fixes

* **server:** allow query-param cache busting in chunk names ([#229](https://github.com/smooth-code/loadable-components/issues/229)) ([71f7bcd](https://github.com/smooth-code/loadable-components/commit/71f7bcd))
* **server:** use `eval` to prevent webpack warning ([#240](https://github.com/smooth-code/loadable-components/issues/240)) ([948165d](https://github.com/smooth-code/loadable-components/commit/948165d)), closes [#234](https://github.com/smooth-code/loadable-components/issues/234)





# [5.6.0](https://github.com/smooth-code/loadable-components/compare/v5.5.0...v5.6.0) (2019-02-05)


### Bug Fixes

* Add extra props option for links ([#212](https://github.com/smooth-code/loadable-components/issues/212)) ([6714d2a](https://github.com/smooth-code/loadable-components/commit/6714d2a))





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
