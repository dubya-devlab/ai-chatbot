import { clsx, type ClassValue } from 'clsx'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge'

export enum ResultCode {
  SUCCESS = 'success',
  ERROR = 'error',
  INVALID_CREDENTIALS = 'invalid_credentials',
  USER_EXISTS = 'user_exists',
  INVALID_INPUT = 'invalid_input'
}

export function getMessageFromCode(code: ResultCode): string {
  switch (code) {
    case ResultCode.SUCCESS:
      return 'Success'
    case ResultCode.ERROR:
      return 'An error occurred'
    case ResultCode.INVALID_CREDENTIALS:
      return 'Invalid credentials'
    case ResultCode.USER_EXISTS:
      return 'User already exists'
    case ResultCode.INVALID_INPUT:
      return 'Invalid input'
    default:
      return 'Unknown error'
  }
}

export function getStringFromBuffer(buffer: ArrayBuffer): string {
  return new TextDecoder().decode(buffer)
}

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
