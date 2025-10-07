'use client';

import { useState } from 'react';
import { WizardData } from '../setup-wizard';

interface ReviewStepProps {
  data: WizardData;
  onPrevious: () => void;
  onSubmit: () => Promise<void>;
}

export function ReviewStep({ data, onPrevious, onSubmit }: ReviewStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    
    try {
      await onSubmit();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during submission');
      setIsSubmitting(false);
    }
  };

  // Generate mailbox preview
  const generateMailboxPreview = () => {
    if (!data.mailboxConfig?.prefix || !data.mailboxConfig?.quantity) return [];
    
    const mailboxes = [];
    const domains = data.domains.filter(d => d.domain && d.domain !== 'Domain will be provided');
    const sampleDomain = domains.length > 0 ? domains[0].domain : 'yourdomain.com';
    
    for (let i = 1; i <= data.mailboxConfig.quantity; i++) {
      mailboxes.push(`${data.mailboxConfig.prefix}${i}@${sampleDomain}`);
    }
    
    return mailboxes;
  };

  const mailboxPreview = generateMailboxPreview();
  const providerName = data.emailProvider === 'GOOGLE_WORKSPACE' ? 'Google Workspace' : 'Microsoft Outlook';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Confirmation</h2>
        <p className="text-gray-600">
          Please review your configuration before submitting your setup request.
        </p>
      </div>

      {/* Configuration Summary */}
      <div className="space-y-6">
        
        {/* Domains Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
            </svg>
            Domains
          </h3>
          
          {data.domains.some(d => d.isProvided) ? (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <p className="text-blue-800 font-medium">Domain Provision Requested</p>
              <p className="text-blue-700 text-sm mt-1">
                A domain will be provided for you during the setup process.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {data.domains.filter(d => d.domain && !d.isProvided).map((domainObj, index) => (
                <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 border border-gray-200 rounded-md">
                  <span className="font-mono text-sm text-gray-900">{domainObj.domain}</span>
                  <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                    Pending Verification
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Email Provider Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email Provider
          </h3>
          
          <div className="flex items-center space-x-3">
            {data.emailProvider === 'GOOGLE_WORKSPACE' ? (
              <svg className="w-8 h-8" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            ) : (
              <svg className="w-8 h-8" viewBox="0 0 24 24">
                <path fill="#0078D4" d="M7 2h10c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2z"/>
                <path fill="#FFFFFF" d="M12 6c-2.2 0-4 1.8-4 4v4c0 2.2 1.8 4 4 4s4-1.8 4-4v-4c0-2.2-1.8-4-4-4zm0 6.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z"/>
              </svg>
            )}
            <div>
              <p className="font-medium text-gray-900">{providerName}</p>
              <p className="text-sm text-gray-600">Selected email provider</p>
            </div>
          </div>
        </div>

        {/* Mailboxes Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            Mailboxes
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Prefix:</span>
              <span className="font-mono text-sm text-gray-900">{data.mailboxConfig?.prefix}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <span className="text-sm text-gray-900">{data.mailboxConfig?.quantity} mailboxes</span>
            </div>
            
            {mailboxPreview.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                <div className="bg-gray-50 border border-gray-200 rounded-md p-3 max-h-40 overflow-y-auto">
                  <div className="space-y-1">
                    {mailboxPreview.slice(0, 5).map((mailbox, index) => (
                      <div key={index} className="font-mono text-sm text-gray-700">
                        {mailbox}
                      </div>
                    ))}
                    {mailboxPreview.length > 5 && (
                      <div className="text-sm text-gray-500 italic">
                        ... and {mailboxPreview.length - 5} more
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Important Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-yellow-800">Important</h4>
            <p className="text-sm text-yellow-700 mt-1">
              Once you confirm, your setup request will be submitted and processed. 
              You'll receive notifications about the progress and be able to track the status in your dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          disabled={isSubmitting}
          className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-8 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Submitting...</span>
            </>
          ) : (
            <span>Confirm & Submit</span>
          )}
        </button>
      </div>
    </div>
  );
}