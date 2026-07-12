import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { ApiResponse } from '@/shared/types/api'

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface FetchArgs {
  url: string
  method?: HttpMethod
  body?: unknown
  params?: Record<string, string | number | undefined | null>
}

function buildUrl(url: string, params?: FetchArgs['params']): string {
  if (!params) return url

  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue
    search.set(key, String(value))
  }

  const qs = search.toString()
  return qs ? `${url}?${qs}` : url
}

/**
 * Thin fetch baseQuery that unwraps the backend's { success, message, data } envelope.
 */
export const baseQuery: BaseQueryFn<
  FetchArgs,
  unknown,
  { status: number; message: string }
> = async ({ url, method = 'GET', body, params }) => {
  try {
    const response = await fetch(buildUrl(url, params), {
      method,
      headers: {
        Accept: 'application/json',
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })

    const json = (await response.json()) as ApiResponse<unknown>

    if (!response.ok || json.success === false) {
      return {
        error: {
          status: response.status,
          message: json.message || 'Request failed',
        },
      }
    }

    return { data: json.data }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Network error'
    return {
      error: {
        status: 0,
        message,
      },
    }
  }
}
