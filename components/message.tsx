import { cn } from '@/lib/utils'
import { IconOpenAI } from '@/components/ui/icons'
import { Spinner } from '@/components/spinner'


export function BotMessage({
  content,
  className,
  ...props
}: {
  content: string
  className?: string
} & React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('group relative flex items-start md:pl-12', className)}
      {...props}
    >
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-white">
        <IconOpenAI />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <div className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0">
          {content}
        </div>
      </div>
    </div>
  )
}

export function BotCard({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
} & React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'group relative flex items-start md:pl-12',
        className
      )}
      {...props}
    >
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-white">
        <IconOpenAI />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        {children}
      </div>
    </div>
  )
}

export function SystemMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
      <span className="bg-zinc-100 dark:bg-zinc-800 rounded-lg px-2 py-1">
        {children}
      </span>
    </div>
  )
}

export function UserMessage({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
} & React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'group relative flex items-start md:pl-12',
        className
      )}
      {...props}
    >
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-white">
        <UserIcon />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <div className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0">
          {children}
        </div>
      </div>
    </div>
  )
}

export function SpinnerMessage() {
  return (
    <div className="group relative flex items-start md:pl-12">
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-white">
        <IconOpenAI />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <Spinner />
      </div>
    </div>
  )
}

function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
