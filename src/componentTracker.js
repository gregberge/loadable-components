let currentId = 0
let components = {}

export const track = component => {
  const id = currentId
  components[id] = component
  currentId += 1
  return id
}

export const loadableHMR = () => {
  currentId = 0;
  components = {};
}
export const get = id => components[id]
export const getAll = () => ({ ...components })
