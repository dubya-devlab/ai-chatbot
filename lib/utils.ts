import { clsx, type ClassValue } from 'clsx'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
)

export async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function runAsyncFnWithoutBlocking<T>(
  fn: () => Promise<T>
): Promise<T> {
  const result = await fn()
  return result
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}
