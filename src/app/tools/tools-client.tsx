'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiMail, 
  FiCheck, 
  FiUsers,
  FiHome,
  FiDownload
} from 'react-icons/fi';

interface CheckResult {
  spf: {
    exists: boolean;
    record: string;
    valid: boolean;
    issues: string[];
    warnings: string[];
    recommendations: string[];
    score: number;
  };
  dkim: {
    exists: boolean;
    record: string;
    valid: boolean;
    issues: string[];
    warnings: string[];
    recommendations: string[];
    score: number;
    selectors: string[];
  };
  dmarc: {
    exists: boolean;
    record: string;
    valid: boolean;
    issues: string[];
    warnings: string[];
    recommendations: string[];
    score: number;
    policy: string;
  };
}

export default function ToolsClient() {
  const [domain, setDomain] = useState('');
  const [email, setEmail] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<CheckResult | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  const handleCheck = async () => {
    if (!domain.trim()) return;
    
    setIsChecking(true);
    setError(null);
    setResults(null);
    
    try {
      const response = await fetch('/api/tools/email-auth-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain: domain.trim() }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      // Validate response structure
      if (!data || typeof data !== 'object' || !data.spf || !data.dkim || !data.dmarc) {
        throw new Error('Invalid response format from server');
      }
      
      setResults(data);
      setShowLeadForm(true);
    } catch (error) {
      console.error('Error checking domain:', error);
      
      let errorMessage = 'An unexpected error occurred while checking your domain.';
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage = 'Network error. Please check your internet connection and try again.';
        } else if (error.message.includes('timeout')) {
          errorMessage = 'Request timed out. The domain may be unreachable or DNS servers are slow.';
        } else if (error.message.includes('Domain not found')) {
          errorMessage = 'Domain not found. Please verify the domain name is correct.';
        } else if (error.message.includes('Invalid domain format')) {
          errorMessage = 'Invalid domain format. Please enter a valid domain name (e.g., example.com).';
        } else {
          errorMessage = error.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsChecking(false);
    }
  };

  const handleLeadCapture = async () => {
    if (!email.trim()) return;
    
    setIsSubmittingLead(true);
    
    try {
      const response = await fetch('/api/tools/capture-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email.trim(), 
          domain: domain.trim(),
          toolUsed: 'email-auth-checker',
          results 
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit email');
      }
      
      setLeadCaptured(true);
      setShowLeadForm(false);
    } catch (error) {
      console.error('Error capturing lead:', error);
      setError(error instanceof Error ? error.message : 'Failed to submit email. Please try again.');
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const getStatusIcon = (valid: boolean, exists: boolean) => {
    if (!exists) return <FiMail className="text-red-500" />;
    if (valid) return <FiCheck className="text-green-500" />;
    return <FiUsers className="text-yellow-500" />;
  };

  const getStatusText = (valid: boolean, exists: boolean) => {
    if (!exists) return 'Not Found';
    if (valid) return 'Valid';
    return 'Issues Found';
  };

  const getStatusColor = (valid: boolean, exists: boolean) => {
    if (!exists) return 'text-red-500';
    if (valid) return 'text-green-500';
    return 'text-yellow-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Free Email Authentication Checker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Verify your SPF, DKIM, and DMARC records instantly. Improve your email deliverability 
            and protect your domain from spoofing attacks.
          </p>
        </motion.div>

        {/* Tool Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label htmlFor="domain" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter your domain
                </label>
                <input
                  type="text"
                  id="domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="example.com"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleCheck}
                  disabled={!domain || isChecking}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                >
                  {isChecking ? (
                    <>
                      <FiHome className="animate-spin" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <FiUsers />
                      Check Records
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6"
              >
                <div className="flex items-start gap-3">
                  <FiMail className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-red-800 dark:text-red-200 font-semibold mb-1">Error</h4>
                    <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                  </div>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="mt-3 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 text-sm font-medium"
                >
                  Dismiss
                </button>
              </motion.div>
            )}

            {/* Results */}
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Results for {domain}
                </h3>

                {/* Overall Score */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 mb-6">
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Overall Email Security Score</h4>
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {Math.round((results.spf.score + results.dkim.score + results.dmarc.score) / 3)}%
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {Math.round((results.spf.score + results.dkim.score + results.dmarc.score) / 3) >= 80 
                        ? 'Excellent security configuration' 
                        : Math.round((results.spf.score + results.dkim.score + results.dmarc.score) / 3) >= 60
                        ? 'Good security with room for improvement'
                        : 'Security needs attention'}
                    </p>
                  </div>
                </div>

                {/* SPF Results */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">SPF Record</h4>
                      {getStatusIcon(results.spf.valid, results.spf.exists)}
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${results.spf.score >= 80 ? 'text-green-500' : results.spf.score >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                        {results.spf.score}%
                      </div>
                      <span className={`text-sm font-medium ${getStatusColor(results.spf.valid, results.spf.exists)}`}>
                        {getStatusText(results.spf.valid, results.spf.exists)}
                      </span>
                    </div>
                  </div>
                  
                  {results.spf.record && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded p-3 mb-4">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">SPF Record:</div>
                      <code className="text-sm text-gray-800 dark:text-gray-200 break-all">{results.spf.record}</code>
                    </div>
                  )}
                  
                  {results.spf.issues.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">Issues:</h5>
                      <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                        {results.spf.issues.map((issue, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <FiMail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {results.spf.warnings.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-yellow-600 dark:text-yellow-400 mb-2">Warnings:</h5>
                      <ul className="text-sm text-yellow-600 dark:text-yellow-400 space-y-1">
                        {results.spf.warnings.map((warning, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <FiUsers className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {results.spf.recommendations.length > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">Recommendations:</h5>
                      <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                        {results.spf.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <FiCheck className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* DKIM Results */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">DKIM Record</h4>
                      {getStatusIcon(results.dkim.valid, results.dkim.exists)}
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${results.dkim.score >= 80 ? 'text-green-500' : results.dkim.score >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                        {results.dkim.score}%
                      </div>
                      <span className={`text-sm font-medium ${getStatusColor(results.dkim.valid, results.dkim.exists)}`}>
                        {getStatusText(results.dkim.valid, results.dkim.exists)}
                      </span>
                    </div>
                  </div>
                  
                  {results.dkim.selectors && results.dkim.selectors.length > 0 && (
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Checked Selectors:</div>
                      <div className="flex flex-wrap gap-2">
                        {results.dkim.selectors.map((selector, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs rounded">
                            {selector}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {results.dkim.record && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded p-3 mb-4">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">DKIM Record:</div>
                      <code className="text-sm text-gray-800 dark:text-gray-200 break-all">{results.dkim.record}</code>
                    </div>
                  )}
                  
                  {results.dkim.issues.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">Issues:</h5>
                      <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                        {results.dkim.issues.map((issue, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <FiMail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {results.dkim.warnings.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-yellow-600 dark:text-yellow-400 mb-2">Warnings:</h5>
                      <ul className="text-sm text-yellow-600 dark:text-yellow-400 space-y-1">
                        {results.dkim.warnings.map((warning, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <FiUsers className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {results.dkim.recommendations.length > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">Recommendations:</h5>
                      <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                        {results.dkim.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <FiCheck className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* DMARC Results */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">DMARC Record</h4>
                      {getStatusIcon(results.dmarc.valid, results.dmarc.exists)}
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${results.dmarc.score >= 80 ? 'text-green-500' : results.dmarc.score >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                        {results.dmarc.score}%
                      </div>
                      <span className={`text-sm font-medium ${getStatusColor(results.dmarc.valid, results.dmarc.exists)}`}>
                        {getStatusText(results.dmarc.valid, results.dmarc.exists)}
                      </span>
                    </div>
                  </div>
                  
                  {results.dmarc.policy && (
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Policy:</div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        results.dmarc.policy === 'reject' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        results.dmarc.policy === 'quarantine' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {results.dmarc.policy.toUpperCase()}
                      </span>
                    </div>
                  )}
                  
                  {results.dmarc.record && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded p-3 mb-4">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">DMARC Record:</div>
                      <code className="text-sm text-gray-800 dark:text-gray-200 break-all">{results.dmarc.record}</code>
                    </div>
                  )}
                  
                  {results.dmarc.issues.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">Issues:</h5>
                      <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                        {results.dmarc.issues.map((issue, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <FiMail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {results.dmarc.warnings.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-yellow-600 dark:text-yellow-400 mb-2">Warnings:</h5>
                      <ul className="text-sm text-yellow-600 dark:text-yellow-400 space-y-1">
                        {results.dmarc.warnings.map((warning, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <FiUsers className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {results.dmarc.recommendations.length > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">Recommendations:</h5>
                      <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                        {results.dmarc.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <FiCheck className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Lead Capture Form */}
          {showLeadForm && !leadCaptured && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white"
            >
              <div className="text-center mb-6">
                <FiDownload className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Get Your Detailed Report</h3>
                <p className="text-blue-100">
                  Enter your email to receive a comprehensive analysis with actionable recommendations 
                  to improve your email deliverability.
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                />
                <button
                  onClick={handleLeadCapture}
                  disabled={!email.trim() || isSubmittingLead}
                  className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 disabled:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  {isSubmittingLead ? (
                    <>
                      <FiHome className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiUsers />
                      Get Report
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* Success Message */}
          {leadCaptured && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-2xl p-8 text-center"
            >
              <FiCheck className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
                Report Sent Successfully!
              </h3>
              <p className="text-green-600 dark:text-green-300">
                Check your email for the detailed analysis and recommendations. 
                Our team will also reach out with personalized suggestions to improve your email infrastructure.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-6xl mx-auto mt-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Use Our Email Authentication Checker?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Comprehensive Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Check SPF, DKIM, and DMARC records in one place with detailed explanations and recommendations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Improve Deliverability
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Identify and fix issues that prevent your emails from reaching the inbox.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Expert Recommendations
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get actionable insights from email deliverability experts to optimize your setup.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
