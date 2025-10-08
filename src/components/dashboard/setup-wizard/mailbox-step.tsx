'use client';

import { useState, useEffect, useMemo } from 'react';
import { WizardData } from '../setup-wizard';

interface MailboxStepProps {
  data: WizardData;
  updateData: (data: Partial<WizardData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

// Plan-based limits (you can adjust these based on your actual plans)
const PLAN_LIMITS = {
  basic: 5,
  pro: 25,
  enterprise: 100
};

export function MailboxStep({ data, updateData, onNext, onPrevious }: MailboxStepProps) {
  const [prefix, setPrefix] = useState(data.mailboxConfig?.prefix || '');
  const [quantity, setQuantity] = useState(data.mailboxConfig?.quantity || 1);
  const [errors, setErrors] = useState<string[]>([]);
  
  // For demo purposes, assuming 'pro' plan. In real app, get from user's subscription
  const userPlan = 'pro';
  const maxMailboxes = PLAN_LIMITS[userPlan as keyof typeof PLAN_LIMITS];

  useEffect(() => {
    updateData({
      mailboxConfig: {
        prefix,
        quantity
      }
    });
  }, [prefix, quantity, updateData]);

  // Generate preview mailbox addresses
  const previewMailboxes = useMemo(() => {
    if (!prefix || quantity < 1) return [];
    
    const mailboxes = [];
    const domains = data.domains.filter(d => d.domain && d.domain !== 'Domain will be provided');
    const sampleDomain = domains.length > 0 ? domains[0].domain : 'yourdomain.com';
    
    for (let i = 1; i <= quantity; i++) {
      mailboxes.push(`${prefix}${i}@${sampleDomain}`);
    }
    
    return mailboxes;
  }, [prefix, quantity, data.domains]);

  const validateInputs = () => {
    const newErrors: string[] = [];
    
    if (!prefix.trim()) {
      newErrors.push('Mailbox prefix is required');
    } else if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(prefix)) {
      newErrors.push('Prefix must start with a letter and contain only letters and numbers');
    } else if (prefix.length < 2) {
      newErrors.push('Prefix must be at least 2 characters long');
    } else if (prefix.length > 20) {
      newErrors.push('Prefix must be no more than 20 characters long');
    }
    
    if (quantity < 1) {
      newErrors.push('You must create at least 1 mailbox');
    } else if (quantity > maxMailboxes) {
      newErrors.push(`Your ${userPlan} plan allows up to ${maxMailboxes} mailboxes`);
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNext = () => {
    if (validateInputs()) {
      onNext();
    }
  };

  const handlePrefixChange = (value: string) => {
    // Remove any non-alphanumeric characters and convert to lowercase
    const cleanValue = value.toLowerCase().replace(/[^a-z0-9]/g, '');
    setPrefix(cleanValue);
  };

  const handleQuantityChange = (value: number) => {
    const clampedValue = Math.max(1, Math.min(maxMailboxes, value));
    setQuantity(clampedValue);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Mailbox Configuration</h2>
        <p className="text-gray-600">
          Configure your mailboxes with a custom prefix and specify how many you need.
        </p>
      </div>

      {/* Plan Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-blue-900">Your Plan: {userPlan.charAt(0).toUpperCase() + userPlan.slice(1)}</h3>
            <p className="text-sm text-blue-700">Maximum mailboxes: {maxMailboxes}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-700">Remaining: {maxMailboxes - quantity}</p>
          </div>
        </div>
      </div>

      {/* Prefix Input */}
      <div className="space-y-2">
        <label htmlFor="prefix" className="block text-sm font-medium text-gray-700">
          Mailbox Prefix
        </label>
        <input
          type="text"
          id="prefix"
          value={prefix}
          onChange={(e) => handlePrefixChange(e.target.value)}
          placeholder="sales"
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="text-sm text-gray-500">
          This will be used to create mailboxes like: {prefix || 'prefix'}1@yourdomain.com, {prefix || 'prefix'}2@yourdomain.com, etc.
        </p>
      </div>

      {/* Quantity Input */}
      <div className="space-y-2">
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Number of Mailboxes
        </label>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            min="1"
            max={maxMailboxes}
            className="block w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center"
          />
          
          <button
            type="button"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= maxMailboxes}
            className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Preview */}
      {previewMailboxes.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-900">Preview Mailboxes</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-60 overflow-y-auto">
            <div className="grid gap-2">
              {previewMailboxes.map((mailbox, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 px-3 bg-white border border-gray-200 rounded-md"
                >
                  <span className="font-mono text-sm text-gray-900">{mailbox}</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    #{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {quantity} mailbox{quantity !== 1 ? 'es' : ''} will be created with the prefix "{prefix}"
          </p>
        </div>
      )}

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-red-800 mb-2">Please fix the following errors:</h3>
          <ul className="list-disc list-inside space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="text-sm text-red-700">{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
