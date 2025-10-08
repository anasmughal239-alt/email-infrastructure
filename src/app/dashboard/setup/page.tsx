'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SetupWizard } from '@/components/dashboard/setup-wizard';

export default function SetupPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    // Check if user has already completed setup
    checkSetupStatus();
  }, [session, status, router]);

  const checkSetupStatus = async () => {
    try {
      const response = await fetch('/api/setup/status');
      const data = await response.json();
      
      if (data.setupCompleted) {
        router.push('/dashboard');
        return;
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error checking setup status:', error);
      setLoading(false);
    }
  };

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Your Setup</h1>
          <p className="mt-2 text-lg text-gray-600">
            Let's get your email infrastructure configured in just a few steps
          </p>
        </div>
        
        <SetupWizard />
      </div>
    </div>
  );
}
