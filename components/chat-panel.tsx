import { type UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconRefresh, IconShare, IconStop } from '@/components/ui/icons'
import { useUIState } from 'ai/rsc'
import { ChatShareDialog } from '@/components/chat-share-dialog'
import { useState } from 'react'
import { shareChat } from '@/app/actions'
import { useAIState } from 'ai/rsc'
import { FooterText } from '@/components/footer'
import { nanoid } from 'nanoid'
import { UserMessage } from '@/components/llm-stock/stocks'
import { cn } from '@/lib/utils'

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
    heading: 'Explain technical concepts',
    message: 'What is a "serverless function"?'
  },
  {
    heading: 'Summarize an article',
    message: 'Summarize the following article for me: [Insert article text or URL]'
  },
  {
    heading: 'Draft an email',
    message: 'Draft a professional email to a client explaining a project delay'
  },
  {
    heading: 'Solve a coding problem',
    message: 'How do I reverse a string in Python?'
  }
]

export function ChatPanel({
  id,
  title,
  isLoading,
  append,
  reload,
  messages,
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
                  setUIState(currentMessages => [
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
                      messages: aiState.messages
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
