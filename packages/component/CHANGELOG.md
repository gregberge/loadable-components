# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.15.2](https://github.com/gregberge/loadable-components/compare/v5.15.1...v5.15.2) (2021-12-12)


### Bug Fixes

* loadAsync Loadable should copy statics ([#839](https://github.com/gregberge/loadable-components/issues/839)) ([9ff6693](https://github.com/gregberge/loadable-components/commit/9ff66939ee6fd622922f71128a30b5d3f43f63b0))
* use stable promises for load/preload/React ([#858](https://github.com/gregberge/loadable-components/issues/858)) ([45f2d91](https://github.com/gregberge/loadable-components/commit/45f2d9133c8234fec9cbe36e5a162a61f24e4aae))





# [5.15.0](https://github.com/gregberge/loadable-components/compare/v5.14.2...v5.15.0) (2021-05-08)


### Bug Fixes

* add displayNames to generated components ([#731](https://github.com/gregberge/loadable-components/issues/731)) ([b640c82](https://github.com/gregberge/loadable-components/commit/b640c82a742ffbccc423439e2e205d1becdf5491))


### Features

* support multiple Webpack runtimes ([#701](https://github.com/gregberge/loadable-components/issues/701)) ([d351367](https://github.com/gregberge/loadable-components/commit/d3513679ed680e46967ca18555116c06e5a4b341))





## [5.14.1](https://github.com/gregberge/loadable-components/compare/v5.14.0...v5.14.1) (2020-10-22)

**Note:** Version bump only for package @loadable/component





# [5.14.0](https://github.com/gregberge/loadable-components/compare/v5.13.2...v5.14.0) (2020-10-20)


### Bug Fixes

* do not derive cache key if component is static, fixes [#629](https://github.com/gregberge/loadable-components/issues/629) ([#630](https://github.com/gregberge/loadable-components/issues/630)) ([b4151d8](https://github.com/gregberge/loadable-components/commit/b4151d85b3ba0f57e9fab48ec88f5e57e4d0b544))


### Features

* make packages webpack 5 compatible ([#638](https://github.com/gregberge/loadable-components/issues/638)) ([e882e4d](https://github.com/gregberge/loadable-components/commit/e882e4d812e714066eba19a11dd119193e7a9e01))





## [5.13.2](https://github.com/gregberge/loadable-components/compare/v5.13.1...v5.13.2) (2020-09-14)


### Bug Fixes

* Fixed lazy usage with Suspense and Error Boundary together ([#521](https://github.com/gregberge/loadable-components/issues/521)) ([42fbdd0](https://github.com/gregberge/loadable-components/commit/42fbdd0d552551b18ed0781383bb0073e1cd8640))





## [5.13.1](https://github.com/gregberge/loadable-components/compare/v5.13.0...v5.13.1) (2020-07-02)


### Bug Fixes

* expose used chunkNames from a server. Fixes [#587](https://github.com/gregberge/loadable-components/issues/587) ([831aec0](https://github.com/gregberge/loadable-components/commit/831aec03154ab16007db0d78fbf3559583c000fe))





# [5.13.0](https://github.com/gregberge/loadable-components/compare/v5.12.0...v5.13.0) (2020-06-29)


### Bug Fixes

* allow webpack cache is ready only for initial chunks, fixes [#558](https://github.com/gregberge/loadable-components/issues/558) ([61f8b75](https://github.com/gregberge/loadable-components/commit/61f8b75b54612368c88807d73abb7dc7add720ad))


### Features

* add `resolveComponent` option ([a47d3d9](https://github.com/gregberge/loadable-components/commit/a47d3d9021ee6b12c1209bf41069dc133cb1fa7c))





# [5.12.0](https://github.com/gregberge/loadable-components/compare/v5.11.0...v5.12.0) (2020-01-09)


### Bug Fixes

* apply loadable transformations before any other, fixes [#466](https://github.com/gregberge/loadable-components/issues/466) ([ac5ba45](https://github.com/gregberge/loadable-components/commit/ac5ba45862bad68b971a969e6e8713874add51a6))


### Features

* avoid synchronous loading on client if options.ssr is false ([#346](https://github.com/gregberge/loadable-components/issues/346)) ([338bf55](https://github.com/gregberge/loadable-components/commit/338bf555adc68986b12c8dd4e304875425119ca2))





# [5.11.0](https://github.com/smooth-code/loadable-components/compare/v5.10.3...v5.11.0) (2019-12-02)


### Bug Fixes

* fix isReady problem ([#445](https://github.com/smooth-code/loadable-components/issues/445)) ([3024348](https://github.com/smooth-code/loadable-components/commit/30243482be917e89515d057e2368e7278e34696c)), closes [#400](https://github.com/smooth-code/loadable-components/issues/400)





## [5.10.3](https://github.com/smooth-code/loadable-components/compare/v5.10.2...v5.10.3) (2019-09-24)


### Bug Fixes

* support IE 11 without polyfill ([#416](https://github.com/smooth-code/loadable-components/issues/416)) ([80ee809](https://github.com/smooth-code/loadable-components/commit/80ee809)), closes [#397](https://github.com/smooth-code/loadable-components/issues/397)





## [5.10.2](https://github.com/smooth-code/loadable-components/compare/v5.10.1...v5.10.2) (2019-07-15)


### Bug Fixes

* use === instead of Object.is ([c88cd82](https://github.com/smooth-code/loadable-components/commit/c88cd82)), closes [#371](https://github.com/smooth-code/loadable-components/issues/371)





## [5.10.1](https://github.com/smooth-code/loadable-components/compare/v5.10.0...v5.10.1) (2019-05-14)


### Bug Fixes

* add @babel/preset-env in rollup config ([#336](https://github.com/smooth-code/loadable-components/issues/336)) ([8b50c94](https://github.com/smooth-code/loadable-components/commit/8b50c94)), closes [#335](https://github.com/smooth-code/loadable-components/issues/335)





# [5.10.0](https://github.com/smooth-code/loadable-components/compare/v5.9.0...v5.10.0) (2019-05-13)


### Features

* add `load` method that returns a Promise ([#329](https://github.com/smooth-code/loadable-components/issues/329)) ([a10a9d5](https://github.com/smooth-code/loadable-components/commit/a10a9d5)), closes [#226](https://github.com/smooth-code/loadable-components/issues/226)
* support reactive dynamic loadable ([#330](https://github.com/smooth-code/loadable-components/issues/330)) ([d65c5bb](https://github.com/smooth-code/loadable-components/commit/d65c5bb)), closes [#284](https://github.com/smooth-code/loadable-components/issues/284)


### Performance Improvements

* optimize rollup config ([c94760b](https://github.com/smooth-code/loadable-components/commit/c94760b))





# [5.9.0](https://github.com/smooth-code/loadable-components/compare/v5.8.0...v5.9.0) (2019-04-23)


### Features

* support multiple react apps ([#317](https://github.com/smooth-code/loadable-components/issues/317)) ([dc54050](https://github.com/smooth-code/loadable-components/commit/dc54050)), closes [#311](https://github.com/smooth-code/loadable-components/issues/311)





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
