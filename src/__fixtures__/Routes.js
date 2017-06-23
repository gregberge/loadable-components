import loadable from '../'

export const Book = loadable(() => import('./Book'), { name: 'book' })
export const Books = loadable(() => import('./Books'), { name: 'books' })
