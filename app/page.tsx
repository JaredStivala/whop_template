'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-24">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-8 text-center">
          {session ? `Welcome, ${session.user?.name}!` : 'Welcome to Whop Auth App'}
        </h1>
        
        {session ? (
          <div className="space-y-4">
            <p className="text-center">You are signed in!</p>
            <button
              onClick={() => signOut()}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn('whop')}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Sign In with Whop
          </button>
        )}
      </div>
    </main>
  )
}