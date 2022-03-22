let federatedModuleMap = {};
const localModuleNames = [];

const isFederated = (loadableCtor) => loadableCtor.resolve().indexOf('webpack/container/remote') === 0;

export const register = (loadableCtor) => {
  const moduleName = loadableCtor.chunkName();
  if (isFederated(loadableCtor)) {
    federatedModuleMap[moduleName] = loadableCtor.importAsync;
  } else {
    localModuleNames.push(moduleName);
  }
};

/**
 * Calls importAsync for all the modules listed in moduleNames
 * Resolves after modules are loaded
 */
export const resolveNamedFederatedModules = (moduleNames) => {
  const federatedModules = moduleNames
    .filter((name) => !localModuleNames.includes(name))
    .map((name) => federatedModuleMap[name]);

  // only need to preload module once
  federatedModuleMap = {};

  return Promise.all(federatedModules.map((loader) => loader()));
};


/**
 * Preload all the existing federated modules, to be used on the server (we don't have loadable required chunks on SSR)
 */
export const resolveAllFederatedModules = () => resolveNamedFederatedModules(Object.keys(federatedModuleMap))
  // repeat if more modules are discovered during preloading
  .then(Object.keys(federatedModuleMap).length ? resolveAllFederatedModules() : undefined);
