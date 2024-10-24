import { useActions, useUIState } from 'ai/rsc'
import { Button } from './button'
import type { AI } from '@/lib/chat/actions'

interface ActionCardProps {
  title: string
  description: string
  actions: {
    label: string
    message: string
  }[]
}

export function ActionCard({ title, description, actions }: ActionCardProps) {
  const [, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()

  return (
    <div className="w-full rounded-xl border bg-zinc-950 p-4">
      <h3 className="mb-2 text-lg font-medium text-zinc-300">{title}</h3>
      <p className="mb-4 text-sm text-zinc-500">{description}</p>
      <div className="flex flex-wrap gap-2">
        {actions.map(action => (
          <Button
            key={action.label}
            variant="outline"
            onClick={async () => {
              const response = await submitUserMessage(action.message)
              setMessages(currentMessages => [...currentMessages, response])
            }}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
