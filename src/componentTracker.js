let currentId = 0
const components = {}

export const track = component => {
  const id = currentId
  components[id] = component
  currentId += 1
  return id
}

export const get = id => components[id]
export const getAll = () => ({ ...components })
