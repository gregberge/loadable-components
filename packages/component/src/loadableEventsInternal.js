
let callback = null

export function registerCallback(cb) {
  callback = cb
}

export function emit(event) {
  if (callback) {
    callback(event)
  }  
}
