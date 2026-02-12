'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center p-4">
      <div className="bg-brutalist-beige border-4 border-brutalist-black max-w-md w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-brutalist-black">SIGN IN</h2>
          <button
            onClick={onClose}
            className="text-2xl font-bold text-brutalist-black hover:text-brutalist-yellow"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2 text-brutalist-black">
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-brutalist-black px-4 py-2 bg-white text-brutalist-black focus:outline-none focus:border-brutalist-yellow"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-brutalist-black">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-brutalist-black px-4 py-2 bg-white text-brutalist-black focus:outline-none focus:border-brutalist-yellow"
              required
            />
          </div>

          {error && (
            <div className="bg-red-100 border-2 border-red-500 px-4 py-2 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brutalist-black text-white px-6 py-3 font-bold border-2 border-brutalist-black hover:bg-brutalist-yellow hover:text-brutalist-black transition-all disabled:opacity-50"
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>
      </div>
    </div>
  );
}
