export interface Book {
  id: string
  name: string
  image: string
  author?: string,
  description?: string
}

export interface User {
  name: string
  phone: string
  facebook: string
  date: string | null
}

export type UserWithBook = User & {
  book: string
}
