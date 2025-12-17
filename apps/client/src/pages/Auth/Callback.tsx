import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

const API_BASE_URL = '/api';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { refetch } = useAuth();
  const isExchangingRef = useRef(false);

  useEffect(() => {
    const code = searchParams.get('code');

    if (!code) {
      setError('No authorization code received');
      return;
    }

    // Prevent duplicate calls (React StrictMode runs useEffect twice)
    if (isExchangingRef.current) {
      return;
    }
    isExchangingRef.current = true;

    const exchangeCode = async () => {
      try {
        // Use current origin to match the redirect_uri used in Discord OAuth
        const redirectUri = `${window.location.origin}/auth/callback`;

        const response = await fetch(`${API_BASE_URL}/auth/discord`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ code, redirect_uri: redirectUri }),
        });

        if (!response.ok) {
          throw new Error('Failed to authenticate');
        }

        const data = await response.json();
        console.log('Login successful:', data.user);

        // Refetch user state to update AuthContext
        await refetch();

        // Redirect to home or previous page
        navigate('/notice-board', { replace: true });
      } catch (err) {
        console.error('Auth error:', err);
        setError('Authentication failed. Please try again.');
        isExchangingRef.current = false;
      }
    };

    exchangeCode();
  }, [searchParams, navigate, refetch]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Error</h1>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto size-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Logging in with Discord...</p>
      </div>
    </div>
  );
}
