'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

interface VerificationFormData {
  code: string
  email: string
  password: string
  name?: string
}

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [formData, setFormData] = useState<VerificationFormData>({
    code: '',
    email: searchParams.get('email') || '',
    password: searchParams.get('password') || '',
    name: searchParams.get('name') || '',
  })
  
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | 'warning' | ''>('')
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes in seconds
  
  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Redirect if no email in params
  useEffect(() => {
    if (!formData.email) {
      router.push('/auth/signup')
    }
  }, [formData.email, router])

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const showMessage = (msg: string, type: 'success' | 'error' | 'warning') => {
    setMessage(msg)
    setMessageType(type)
    setTimeout(() => {
      setMessage('')
      setMessageType('')
    }, 5000)
  }

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return // Prevent multiple characters
    
    const newCode = formData.code.split('')
    newCode[index] = value
    
    setFormData(prev => ({
      ...prev,
      code: newCode.join('')
    }))

    // Auto-focus next input
    if (value && index < 5) {
      codeInputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !formData.code[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    setFormData(prev => ({ ...prev, code: pastedData }))
    
    // Focus the next empty input or the last one
    const nextIndex = Math.min(pastedData.length, 5)
    codeInputRefs.current[nextIndex]?.focus()
  }

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.code.length !== 6) {
      showMessage('Please enter the complete 6-digit verification code.', 'error')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        showMessage('Email verified successfully! Signing you in...', 'success')
        
        // Auto sign in after successful verification
        setTimeout(async () => {
          const result = await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: false,
          })

          if (result?.ok) {
            router.push('/dashboard')
          } else {
            router.push('/auth/login?message=Account created successfully. Please sign in.')
          }
        }, 1500)
      } else {
        showMessage(data.error || 'Verification failed', 'error')
        if (data.attemptsRemaining !== undefined) {
          setAttemptsRemaining(data.attemptsRemaining)
        }
      }
    } catch (error) {
      console.error('Verification error:', error)
      showMessage('An error occurred. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleResendCode = async () => {
    setResendLoading(true)

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        showMessage('New verification code sent! Please check your email.', 'success')
        setTimeLeft(900) // Reset timer
        setFormData(prev => ({ ...prev, code: '' })) // Clear current code
        setAttemptsRemaining(null)
        codeInputRefs.current[0]?.focus()
      } else {
        showMessage(data.error || 'Failed to resend code', 'error')
      }
    } catch (error) {
      console.error('Resend error:', error)
      showMessage('An error occurred. Please try again.', 'error')
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a 6-digit verification code to
          </p>
          <p className="text-center text-sm font-medium text-blue-600">
            {formData.email}
          </p>
        </div>

        {message && (
          <div className={`rounded-md p-4 ${
            messageType === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
            messageType === 'warning' ? 'bg-yellow-50 text-yellow-800 border border-yellow-200' :
            'bg-red-50 text-red-800 border border-red-200'
          }`}>
            <p className="text-sm font-medium">{message}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleVerification}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Verification Code
            </label>
            <div className="flex justify-center space-x-2">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  ref={(el) => (codeInputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={formData.code[index] || ''}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-500">
              Code expires in: <span className="font-medium text-red-600">{formatTime(timeLeft)}</span>
            </div>
            {attemptsRemaining !== null && (
              <div className="text-orange-600">
                {attemptsRemaining} attempts remaining
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || formData.code.length !== 6}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResendCode}
              disabled={resendLoading || timeLeft > 840} // Allow resend after 1 minute
              className="text-blue-600 hover:text-blue-500 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendLoading ? 'Sending...' : 'Resend Code'}
            </button>
            {timeLeft > 840 && (
              <p className="text-xs text-gray-500 mt-1">
                You can request a new code in {formatTime(timeLeft - 840)}
              </p>
            )}
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => router.push('/auth/signup')}
              className="text-gray-600 hover:text-gray-500 text-sm"
            >
              ← Back to Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
