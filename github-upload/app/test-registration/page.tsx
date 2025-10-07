'use client'

import { useState } from 'react'

export default function TestRegistration() {
  const [email, setEmail] = useState('test@example.com')
  const [password, setPassword] = useState('TestPassword123!')
  const [name, setName] = useState('Test User')
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const testRegistration = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setMessage(`✅ Registration successful: ${data.message}`)
      } else {
        setMessage(`❌ Registration failed: ${data.error}`)
      }
    } catch (error) {
      setMessage(`❌ Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const testVerification = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, code }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setMessage(`✅ Verification successful: ${data.message}`)
      } else {
        setMessage(`❌ Verification failed: ${data.error}`)
      }
    } catch (error) {
      setMessage(`❌ Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const testResendCode = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setMessage(`✅ Resend successful: ${data.message}`)
      } else {
        setMessage(`❌ Resend failed: ${data.error}`)
      }
    } catch (error) {
      setMessage(`❌ Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Test Registration Flow</h1>
        
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-800">
            <strong>✅ Email Service Ready:</strong> Domain verified! You can now send emails to any email address.
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Verification Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="6-digit code"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="space-y-2">
            <button
              onClick={testRegistration}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Test Registration'}
            </button>
            
            <button
              onClick={testVerification}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Test Verification'}
            </button>
            
            <button
              onClick={testResendCode}
              disabled={loading}
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Test Resend Code'}
            </button>
          </div>
          
          {message && (
            <div className="mt-4 p-3 bg-gray-100 rounded-md">
              <p className="text-sm">{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}