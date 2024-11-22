'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <Button onClick={() => signIn('google', { callbackUrl: '/dashboard' })}>
          Sign in with Google
        </Button>
      </div>
    </div>
  )
}

