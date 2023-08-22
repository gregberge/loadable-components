import createLoadableHook from './createLoadableHook'
import { defaultResolveComponent } from './resolvers'

export const { loadableHook, lazy } = createLoadableHook(defaultResolveComponent)
