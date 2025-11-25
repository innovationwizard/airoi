import { useState } from 'react';
import { LogIn, Loader2 } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface AdminLoginProps {
  onLogin: (email: string, password: string) => void;
  loading: boolean;
  error: string | null;
}

export const AdminLogin = ({ onLogin, loading, error }: AdminLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <LogIn className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-800">Admin Login</h2>
        </div>
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{error}</div>
        )}
        <Input label="Email" type="email" value={email} onChange={setEmail} required />
        <Input label="Password" type="password" value={password} onChange={setPassword} required />
        <Button
          onClick={() => onLogin(email, password)}
          disabled={loading || !email || !password}
          className="w-full"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Ingresar'}
        </Button>
      </div>
    </div>
  );
};

