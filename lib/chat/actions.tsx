import 'server-only'

import {
  createAI,
  getMutableAIState,
  getAIState
} from 'ai/rsc'

import {
  BotMessage,
  SpinnerMessage,
  UserMessage
} from '../../components/message'

import { nanoid } from '../utils'
import { saveChat } from '../../app/actions'
import { Chat, Message } from '../types'
import { auth } from '../../auth'
import { processWithN8NAgent } from '../n8n-agent'

async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()
  const currentState = aiState.get()

  // Add user message to state
  aiState.update({
    ...currentState,
    messages: [
      ...currentState.messages,
      {
        id: nanoid(),
        role: 'user',
        content
      }
    ]
  })

  try {
    // Show loading state
    const loadingDisplay = <SpinnerMessage />

    // Process message with n8n agent
    const response = await processWithN8NAgent(content)

    // Update AI state with assistant's response
    aiState.done({
      ...currentState,
      messages: [
        ...currentState.messages,
        {
          id: nanoid(),
          role: 'assistant',
          content: response
        }
      ]
    })

    return {
      id: nanoid(),
      display: <BotMessage content={response} />
    }
  } catch (error) {
    console.error('Error in submitUserMessage:', error)
    const errorMessage = 'Sorry, there was an error processing your request. Please try again.'
    
    aiState.done({
      ...currentState,
      messages: [
        ...currentState.messages,
        {
          id: nanoid(),
          role: 'assistant',
          content: errorMessage
        }
      ]
    })

    return {
      id: nanoid(),
      display: <BotMessage content={errorMessage} />
    }
  }
}

export type AIState = {
  id: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage
  },
  initialUIState: [],
  initialAIState: { id: nanoid(), messages: [] },
  onGetUIState: async () => {
    'use server'

    const session = await auth()

    if (session?.user) {
      const aiState = getAIState()

      if (aiState) {
        return (aiState as AIState).messages
          .filter((message: Message) => message.role !== 'system')
          .map((message: Message, index: number) => ({
            id: `${(aiState as AIState).id}-${index}`,
            display:
              message.role === 'user' ? (
                <UserMessage>{message.content}</UserMessage>
              ) : (
                <BotMessage content={message.content} />
              )
          }))
      }
    }
    return []
  },
  onSetAIState: async ({ state }) => {
    'use server'

    const session = await auth()

    if (session?.user) {
      const { id, messages } = state
      const createdAt = new Date()
      const userId = session.user.id
      const path = `/chat/${id}`
      const firstMessageContent = messages[0]?.content || 'New Chat'
      const title = firstMessageContent.substring(0, 100)

      const chat: Chat = {
        id,
        title,
        userId,
        createdAt,
        messages,
        path
      }

      await saveChat(chat)
    }
  }
})
