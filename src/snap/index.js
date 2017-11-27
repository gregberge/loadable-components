/* eslint-env browser */
/* eslint-disable import/prefer-default-export */
import { getAll as getAllComponents } from '../componentTracker'
import { COMPONENT_IDS } from '../constants'

export function getState() {
  const componentByIds = getAllComponents()
  const componentIds = Object.keys(componentByIds).reduce((ids, id) => {
    const component = componentByIds[id]
    if (component.loadingPromise) return [...ids, component.componentId]
    return ids
  }, [])
  return { [COMPONENT_IDS]: componentIds }
}
