'use client'

import { useState } from 'react'
import { useActions, useUIState } from 'ai/rsc'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'
import type { AI } from '../../lib/chat/actions'

interface FormField {
  label: string
  type: 'text' | 'number' | 'email' | 'tel'
  key: string
  placeholder?: string
  required?: boolean
}

interface FormBuilderProps {
  title: string
  description: string
  fields: FormField[]
  submitLabel: string
  onSubmitMessage: (formData: Record<string, string>) => string
}

export function FormBuilder({
  title,
  description,
  fields,
  submitLabel,
  onSubmitMessage
}: FormBuilderProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const message = onSubmitMessage(formData)
    const response = await submitUserMessage(message)
    setMessages(currentMessages => [...currentMessages, response])
  }

  return (
    <div className="w-full rounded-xl border bg-zinc-950 p-4">
      <h3 className="mb-2 text-lg font-medium text-zinc-300">{title}</h3>
      <p className="mb-4 text-sm text-zinc-500">{description}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(field => (
          <div key={field.key}>
            <Label htmlFor={field.key}>{field.label}</Label>
            <Input
              id={field.key}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.key] || ''}
              onChange={e =>
                setFormData(prev => ({
                  ...prev,
                  [field.key]: e.target.value
                }))
              }
            />
          </div>
        ))}
        <Button type="submit" className="w-full">
          {submitLabel}
        </Button>
      </form>
    </div>
  )
}
