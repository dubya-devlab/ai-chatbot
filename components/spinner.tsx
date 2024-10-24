import { cn } from '@/lib/utils'

export function Spinner({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('animate-spin', className)}
      {...props}
    >
      <div className="h-4 w-4 rounded-full border-2 border-zinc-300 border-t-zinc-800" />
    </div>
  )
}
