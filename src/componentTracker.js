const components = {}

export const track = (component, modules) => {
  const id = modules.join('-')
  components[id] = component
  return id
}

export const get = id => components[id]
export const getAll = () => ({ ...components })
