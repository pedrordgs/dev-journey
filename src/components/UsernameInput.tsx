'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface UsernameInputProps {
  onSubmit: (username: string) => void
  loading?: boolean
}

export function UsernameInput({
  onSubmit,
  loading = false,
}: UsernameInputProps) {
  const [username, setUsername] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      onSubmit(username.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
      <Input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={loading}
        className="flex-1"
      />
      <Button type="submit" disabled={loading || !username.trim()}>
        {loading ? 'Loading...' : 'Generate Timeline'}
      </Button>
    </form>
  )
}
