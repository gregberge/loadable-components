
const extractSharedModuleOpts = (moduleIdentifier) => {
  const [
    _issuerType, _shareScope, _shareKey, semver, _strictVersion, _fullPath, singleton, eager
  ] = moduleIdentifier.split(/(?<!\|)\|(?!\|)/);

  return {
    semver: semver === 'undefined' ? '*' : semver,
    singleton: singleton === 'true',
    eager: eager === 'true',
  };
}

const isSharedModule = (moduleIdentifier) => moduleIdentifier.indexOf(`webpack/sharing/`) === 0

const collectSharedModuleConsumptionStats = (modules = []) => {
  const sharedConsumes = {};
  const sharedModules = {};

  modules.forEach((module) => {
    (module.reasons || []).forEach((reason) => {
      switch (reason.type) {
        // sync usage
        case 'cjs require':
        case 'cjs full require':
        case 'cjs export require':
        case 'harmony import specifier':
        case 'harmony side effect evaluation':
          if (isSharedModule(module.id)) {
            module.chunks.forEach((chunkId) => {
              sharedConsumes[chunkId] = sharedConsumes[chunkId] || [];
              if (sharedConsumes[chunkId].indexOf(module.id) === -1) {
                sharedConsumes[chunkId].push(module.id);
              }
            });
          }
          break;
        // internal shared usage
        case 'consume shared fallback':
          /** Probably always true for this reason.type, but better safe than sorry */
          if (isSharedModule(reason.moduleId)) {
            sharedModules[reason.moduleId] = {
              chunks: module.chunks,
              ...extractSharedModuleOpts(reason.moduleIdentifier),
              lib: reason.userRequest,
            };
          }
          break;

        // NOTE: Other reason types are probably going to be used in the future
        // async usage
        case 'import()':
        // external shared usage
        case 'provide module for shared':
        // entry point definition
        case 'container entry':
        case 'entry':
        // external shared exposes binding
        case 'container exposed':
        // entrypoint to external binding
        case 'provide shared module':
          break;
      }
    });
  });
  return {
    sharedConsumes,
    sharedModules,
  };
};


module.exports = {
  collectSharedModuleConsumptionStats,
};
