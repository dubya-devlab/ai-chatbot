import { ReactNode } from 'react'

export type Message = {
  id: string
  content: string
  role: 'system' | 'user' | 'assistant'
  name?: string
}

export type Chat = {
  id: string
  title: string
  userId: string
  createdAt: Date
  messages: Message[]
  path: string
}

export type UIState = {
  id: string
  display: ReactNode
}[]

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>

export type Session = {
  user: {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
  expires: string
}
