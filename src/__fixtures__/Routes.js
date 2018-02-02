import loadable from '../'

export const Book = loadable(() => import('./Book'), { modules: ['./Book'] })
export const Books = loadable(() => import('./Books'), { modules: ['./Books'] })
