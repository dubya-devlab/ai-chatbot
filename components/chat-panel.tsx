import { type UseChatHelpers } from 'ai/react'
import { useUIState, useAIState } from 'ai/rsc'
import { useState } from 'react'
import { nanoid } from 'nanoid'

import { Button } from './ui/button'
import { PromptForm } from './prompt-form'
import { ButtonScrollToBottom } from './button-scroll-to-bottom'
import { IconRefresh, IconShare, IconStop } from './ui/icons'
import { ChatShareDialog } from './chat-share-dialog'
import { FooterText } from './footer'
import { UserMessage } from './message'
import { cn } from '../lib/utils'
import { shareChat } from '../app/actions'
import { UIState } from '../lib/types'

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | 'isLoading'
    | 'append'
    | 'reload'
    | 'messages'
    | 'stop'
    | 'input'
    | 'setInput'
  > {
  id?: string
  title?: string
  isAtBottom: boolean
  scrollToBottom: () => void
  onSubmit: (value: string) => Promise<void>
}

const exampleMessages = [
  {
    heading: 'Schedule an Estimate',
    message: 'I need an estimate for a bathroom remodel.'
  },
  {
    heading: 'Get Quick Quote',
    message: 'How much would it cost to replace a kitchen faucet?'
  },
  {
    heading: 'Home Improvement Advice',
    message: 'What improvements would add the most value to my home?'
  },
  {
    heading: 'Schedule a Repair',
    message: 'I need to schedule a repair for a leaking pipe.'
  }
]

export function ChatPanel({
  id,
  title,
  isLoading,
  append,
  reload,
  messages = [], // Add default empty array
  stop,
  input,
  setInput,
  isAtBottom,
  scrollToBottom,
  onSubmit
}: ChatPanelProps) {
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [aiState] = useAIState()
  const [uiState, setUIState] = useUIState()

  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% animate-in duration-300 ease-in-out dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />

      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
          {messages.length === 0 &&
            exampleMessages.map((example, index) => (
              <div
                key={example.heading}
                className={cn(
                  'cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900',
                  index > 1 && 'hidden md:block'
                )}
                onClick={async () => {
                  setUIState((currentMessages: UIState) => [
                    ...currentMessages,
                    {
                      id: nanoid(),
                      display: <UserMessage>{example.message}</UserMessage>
                    }
                  ])

                  await onSubmit(example.message)
                }}
              >
                <div className="text-sm font-semibold">{example.heading}</div>
                <div className="text-sm text-zinc-600">
                  {example.message}
                </div>
              </div>
            ))}
        </div>

        {messages?.length >= 2 ? (
          <div className="flex h-12 items-center justify-center">
            <div className="flex space-x-2">
              {id && title ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setShareDialogOpen(true)}
                  >
                    <IconShare className="mr-2" />
                    Share
                  </Button>
                  <ChatShareDialog
                    open={shareDialogOpen}
                    onOpenChange={setShareDialogOpen}
                    onCopy={() => setShareDialogOpen(false)}
                    shareChat={shareChat}
                    chat={{
                      id,
                      title,
                      messages: aiState?.messages ?? []
                    }}
                  />
                </>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={onSubmit}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  )
}
