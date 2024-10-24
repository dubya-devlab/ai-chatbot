import Image from 'next/image'
import { cn } from '@/lib/utils'

interface MediaCardProps {
  title: string
  description: string
  imageUrl?: string
  videoUrl?: string
  className?: string
}

export function MediaCard({
  title,
  description,
  imageUrl,
  videoUrl,
  className
}: MediaCardProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border bg-zinc-950',
        className
      )}
    >
      {imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}
      {videoUrl && (
        <div className="relative h-48 w-full">
          <video
            src={videoUrl}
            controls
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="mb-2 text-lg font-medium text-zinc-300">{title}</h3>
        <p className="text-sm text-zinc-500">{description}</p>
      </div>
    </div>
  )
}
