'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { gql } from '@apollo/client';
import { apolloClient } from '@/lib/apollo-client';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { CheckCircle, XCircle, Loader2, Eye, EyeOff } from 'lucide-react';

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword) {
      success
      message
    }
  }
`;

type Status = 'idle' | 'loading' | 'success' | 'error';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [validationErrors, setValidationErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setErrorMessage('Geen reset token gevonden. Vraag een nieuwe reset link aan.');
    }
  }, [token]);

  const validateForm = (): boolean => {
    const errors: { password?: string; confirmPassword?: string } = {};

    if (password.length < 6) {
      errors.password = 'Wachtwoord moet minimaal 6 tekens bevatten';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Wachtwoorden komen niet overeen';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !token) {
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const { data } = await apolloClient.mutate({
        mutation: RESET_PASSWORD_MUTATION,
        variables: { token, newPassword: password },
      });

      if (data?.resetPassword?.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data?.resetPassword?.message || 'Er is een fout opgetreden');
      }
    } catch (err) {
      setStatus('error');
      const error = err as Error & { graphQLErrors?: Array<{ message: string }> };
      setErrorMessage(
        error.graphQLErrors?.[0]?.message ||
        'Er is een fout opgetreden. Probeer het opnieuw.'
      );
    }
  };

  // No token provided
  if (!token && status === 'error') {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="max-w-md mx-auto px-4 py-12 text-center">
            <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Ongeldige link
            </h1>
            <p className="text-muted-foreground mb-6">
              {errorMessage}
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              Terug naar home
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Success state
  if (status === 'success') {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="max-w-md mx-auto px-4 py-12 text-center">
            <div className="bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Wachtwoord gewijzigd
            </h1>
            <p className="text-muted-foreground mb-6">
              Je wachtwoord is succesvol gewijzigd. Je kunt nu inloggen met je nieuwe wachtwoord in de app.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-foreground mb-2 text-center">
              Nieuw wachtwoord instellen
            </h1>
            <p className="text-muted-foreground mb-8 text-center">
              Voer je nieuwe wachtwoord in
            </p>

            {status === 'error' && errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                <div className="flex items-start">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Nieuw wachtwoord
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setValidationErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    className={`w-full px-4 py-3 pr-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      validationErrors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Minimaal 6 tekens"
                    disabled={status === 'loading'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="mt-2 text-sm text-red-500">{validationErrors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                  Bevestig wachtwoord
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setValidationErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                    }}
                    className={`w-full px-4 py-3 pr-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      validationErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Herhaal je wachtwoord"
                    disabled={status === 'loading'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {validationErrors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-500">{validationErrors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Bezig met opslaan...
                  </>
                ) : (
                  'Wachtwoord opslaan'
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Laden...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
