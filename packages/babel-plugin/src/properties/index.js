import { chunkNameProperty } from './chunkName'
import { isReadyProperty, isReadyPropertyEsm } from './isReady'
import { importAsyncProperty, importAsyncPropertyEsm } from './importAsync'
import { requireAsyncProperty, requireAsyncPropertyEsm } from './requireAsync'
import { requireSyncProperty, requireSyncPropertyEsm } from './requireSync'
import { resolveProperty, resolvePropertyEsm } from './resolve'
import { resolvedProperty, typeProperty, typePropertyEsm, modulePropertyEsm } from './state'

export const chunkProperties = [
  resolvedProperty,
  chunkNameProperty,
  isReadyProperty,
  importAsyncProperty,
  requireAsyncProperty,
  requireSyncProperty,
  resolveProperty,
  typeProperty
]

export const esmProperties = [
  modulePropertyEsm,
  importAsyncPropertyEsm,
  requireAsyncPropertyEsm,
  requireSyncPropertyEsm,
  resolvePropertyEsm,
  typePropertyEsm,
  isReadyPropertyEsm
]