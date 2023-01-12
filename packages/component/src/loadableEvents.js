import EventEmitter from 'events'

const loadableEvents = new EventEmitter()

if (typeof window !== 'undefined') {
  window.loadableEvents = loadableEvents
}

export default loadableEvents