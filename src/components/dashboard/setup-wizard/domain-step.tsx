'use client';

import { useState, useEffect } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { WizardData } from '../setup-wizard';

interface DomainStepProps {
  data: WizardData;
  updateData: (data: Partial<WizardData>) => void;
  onNext: () => void;
}

export function DomainStep({ data, updateData, onNext }: DomainStepProps) {
  const [domains, setDomains] = useState<Array<{ domain: string; isProvided: boolean }>>(
    data.domains.length > 0 ? data.domains : [{ domain: '', isProvided: false }]
  );
  const [needDomainProvision, setNeedDomainProvision] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    updateData({ domains });
  }, [domains, updateData]);

  const addDomain = () => {
    setDomains([...domains, { domain: '', isProvided: false }]);
  };

  const removeDomain = (index: number) => {
    if (domains.length > 1) {
      const newDomains = domains.filter((_, i) => i !== index);
      setDomains(newDomains);
    }
  };

  const updateDomain = (index: number, value: string) => {
    const newDomains = [...domains];
    newDomains[index] = { ...newDomains[index], domain: value };
    setDomains(newDomains);
  };

  const handleProvisionToggle = (checked: boolean) => {
    setNeedDomainProvision(checked);
    if (checked) {
      // If user wants domain provision, add a placeholder domain
      setDomains([{ domain: 'Domain will be provided', isProvided: true }]);
    } else {
      // Reset to empty domain input
      setDomains([{ domain: '', isProvided: false }]);
    }
  };

  const validateDomains = () => {
    const newErrors: string[] = [];
    
    if (needDomainProvision) {
      // If domain provision is requested, no validation needed
      return true;
    }

    domains.forEach((domainObj, index) => {
      const domain = domainObj.domain.trim();
      if (!domain) {
        newErrors.push(`Domain ${index + 1} is required`);
        return;
      }

      // Basic domain validation
      const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
      if (!domainRegex.test(domain)) {
        newErrors.push(`Domain ${index + 1} is not valid`);
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNext = () => {
    if (validateDomains()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Domain Configuration</h2>
        <p className="text-gray-600">
          Enter the domain(s) you want to use for your email infrastructure.
        </p>
      </div>

      {/* Domain Provision Checkbox */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={needDomainProvision}
            onChange={(e) => handleProvisionToggle(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm font-medium text-blue-900">
            I don't have a domain, please provide one for me
          </span>
        </label>
        {needDomainProvision && (
          <p className="mt-2 text-sm text-blue-700">
            We'll provide a domain for you as part of the setup process.
          </p>
        )}
      </div>

      {/* Domain Inputs */}
      {!needDomainProvision && (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Your Domains
          </label>
          
          {domains.map((domainObj, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={domainObj.domain}
                  onChange={(e) => updateDomain(index, e.target.value)}
                  placeholder="example.com"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {domains.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDomain(index)}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addDomain}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add another domain</span>
          </button>
        </div>
      )}

      {/* Domain Provision Display */}
      {needDomainProvision && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Domain Provision Request</h3>
          <p className="text-sm text-gray-600">
            A domain will be provided for you during the setup process. You'll receive details about your new domain once the setup is complete.
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
      <div className="flex justify-end">
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