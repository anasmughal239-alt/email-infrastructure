'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckIcon } from '@heroicons/react/24/solid';
import { DomainStep } from './setup-wizard/domain-step';
import { ProviderStep } from './setup-wizard/provider-step';
import { MailboxStep } from './setup-wizard/mailbox-step';
import { ReviewStep } from './setup-wizard/review-step';

export interface WizardData {
  domains: Array<{
    domain: string;
    isProvided: boolean;
  }>;
  emailProvider: string;
  mailboxConfig: {
    prefix: string;
    quantity: number;
  };
}

const STEPS = [
  { id: 1, name: 'Domain Configuration', description: 'Set up your domains' },
  { id: 2, name: 'Email Provider', description: 'Choose your provider' },
  { id: 3, name: 'Mailbox Configuration', description: 'Configure mailboxes' },
  { id: 4, name: 'Review & Confirmation', description: 'Review and confirm' },
];

export function SetupWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardData, setWizardData] = useState<WizardData>({
    domains: [],
    emailProvider: '',
    mailboxConfig: {
      prefix: '',
      quantity: 1
    }
  });
  const router = useRouter();

  const updateWizardData = (data: Partial<WizardData>) => {
    setWizardData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitWizard = async () => {
    try {
      const response = await fetch('/api/setup/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wizardData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit setup');
      }

      // Redirect to dashboard with success message
      router.push('/dashboard?setup=processing');
    } catch (error) {
      console.error('Error submitting wizard:', error);
      throw error;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <DomainStep
            data={wizardData}
            updateData={updateWizardData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <ProviderStep
            data={wizardData}
            updateData={updateWizardData}
            onNext={nextStep}
            onPrevious={previousStep}
          />
        );
      case 3:
        return (
          <MailboxStep
            data={wizardData}
            updateData={updateWizardData}
            onNext={nextStep}
            onPrevious={previousStep}
          />
        );
      case 4:
        return (
          <ReviewStep
            data={wizardData}
            onPrevious={previousStep}
            onSubmit={submitWizard}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Progress Bar */}
      <div className="px-6 py-4 border-b border-gray-200">
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {STEPS.map((step, stepIdx) => (
              <li
                key={step.id}
                className={`${
                  stepIdx !== STEPS.length - 1 ? 'pr-8 sm:pr-20' : ''
                } relative`}
              >
                {step.id < currentStep ? (
                  <>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-0.5 w-full bg-blue-600" />
                    </div>
                    <div className="relative w-8 h-8 flex items-center justify-center bg-blue-600 rounded-full hover:bg-blue-900">
                      <CheckIcon className="w-5 h-5 text-white" aria-hidden="true" />
                    </div>
                  </>
                ) : step.id === currentStep ? (
                  <>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-0.5 w-full bg-gray-200" />
                    </div>
                    <div className="relative w-8 h-8 flex items-center justify-center bg-white border-2 border-blue-600 rounded-full">
                      <span className="h-2.5 w-2.5 bg-blue-600 rounded-full" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-0.5 w-full bg-gray-200" />
                    </div>
                    <div className="relative w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                      <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
                    </div>
                  </>
                )}
                <div className="mt-3">
                  <span
                    className={`text-sm font-medium ${
                      step.id <= currentStep ? 'text-blue-600' : 'text-gray-500'
                    }`}
                  >
                    {step.name}
                  </span>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Step Content */}
      <div className="px-6 py-8">
        {renderStepContent()}
      </div>
    </div>
  );
}
