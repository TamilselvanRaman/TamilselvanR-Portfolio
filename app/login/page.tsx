'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setRedirecting(true);
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border-4 border-black p-8 shadow-[10px_10px_0px_#000]">
        
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black mb-2">ACCESS_DENIED</h1>
          <p className="font-mono text-sm">AUTHENTICATION REQUIRED</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block font-bold text-sm mb-2">IDENTIFIER</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-black p-3 font-mono focus:outline-none focus:bg-yellow-100"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-sm mb-2">ACCESS_KEY</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-black p-3 font-mono focus:outline-none focus:bg-yellow-100"
              required
            />
          </div>

          {error && (
            <div className="bg-red-100 border-2 border-red-500 p-3 text-red-700 text-sm font-bold">
              ERROR: {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || redirecting}
            className="w-full bg-black text-white font-bold py-4 border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000] transition-all disabled:opacity-50"
          >
            {redirecting ? 'REDIRECTING...' : loading ? 'AUTHENTICATING...' : 'INITIATE_SESSION'}
          </button>
        </form>

      </div>
    </div>
  );
}
