
import { loadableEvents } from '@loadable/component'

const asyncChunkLoadTimeMap = new Map()
 window.loadableEvents = function (event) {
}
const loadableEventsCallback = function (event) {
  if (event.type === 'startAsyncLoad') {
    asyncChunkLoadTimeMap.set(event.chunkName, performance.now())
  }
  if (event.type === 'successAsyncLoad') {
    const t0 = asyncChunkLoadTimeMap.get(event.chunkName)
    if (t0) {
      event.time = performance.now() - t0
    }
  }
  window.loadableEvents(event)
}

loadableEvents.registerCallback(loadableEventsCallback)
