import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useEmailJS } from '../useEmailJS'

// Mock emailjs
vi.mock('@emailjs/browser', () => ({
  default: {
    send: vi.fn(),
  },
}))

import emailjs from '@emailjs/browser'

describe('useEmailJS', () => {
  it('starts with idle status', () => {
    const { result } = renderHook(() => useEmailJS())
    expect(result.current.status).toBe('idle')
    expect(result.current.error).toBeNull()
    expect(result.current.canRetry).toBe(false)
  })

  it('sets loading status when sending', async () => {
    emailjs.send.mockImplementation(() => new Promise(() => {})) // never resolves
    const { result } = renderHook(() => useEmailJS())

    act(() => {
      result.current.sendEmail('template_id', { message: 'test' })
    })

    expect(result.current.status).toBe('loading')
  })

  it('sets success status on successful send', async () => {
    emailjs.send.mockResolvedValueOnce({ status: 200 })
    const { result } = renderHook(() => useEmailJS())

    let success
    await act(async () => {
      success = await result.current.sendEmail('template_id', { message: 'test' })
    })

    expect(success).toBe(true)
    expect(result.current.status).toBe('success')
  })

  it('sets error with user-friendly message on failure', async () => {
    emailjs.send.mockRejectedValueOnce({ status: 500 })
    const { result } = renderHook(() => useEmailJS())

    let success
    await act(async () => {
      success = await result.current.sendEmail('template_id', { message: 'test' })
    })

    expect(success).toBe(false)
    expect(result.current.status).toBe('error')
    expect(result.current.error).toContain('temporarily unavailable')
    expect(result.current.canRetry).toBe(true)
  })

  it('resets to idle state', async () => {
    emailjs.send.mockRejectedValueOnce({ status: 500 })
    const { result } = renderHook(() => useEmailJS())

    await act(async () => {
      await result.current.sendEmail('template_id', { message: 'test' })
    })

    act(() => {
      result.current.reset()
    })

    expect(result.current.status).toBe('idle')
    expect(result.current.error).toBeNull()
    expect(result.current.canRetry).toBe(false)
  })

  it('retries with saved data', async () => {
    emailjs.send.mockRejectedValueOnce({ status: 500 })
    const { result } = renderHook(() => useEmailJS())

    await act(async () => {
      await result.current.sendEmail('template_id', { message: 'test' })
    })

    emailjs.send.mockResolvedValueOnce({ status: 200 })

    let success
    await act(async () => {
      success = await result.current.retry()
    })

    expect(success).toBe(true)
    expect(result.current.status).toBe('success')
  })
})
