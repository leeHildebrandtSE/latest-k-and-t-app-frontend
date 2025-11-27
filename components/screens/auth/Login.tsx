import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import { Logo } from '../../Logo';

interface LoginProps {
  // role: UserRole; (removed unused prop)
  onLogin: (email: string, password: string) => void;
  onBack: () => void;
  onRegister: () => void;
}

export function Login({ onLogin, onBack, onRegister }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-4 relative"
      style={{
        paddingTop: 'calc(var(--safe-area-inset-top) + 1rem)',
        paddingBottom: 'calc(var(--safe-area-inset-bottom) + 1rem)',
      }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/bg-mobile-user.jpg"
          alt="Mobile user background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <div className="relative z-10 w-full max-w-md">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-6 top-6 flex items-center gap-2 text-blue-200 hover:text-white text-base font-bold px-3 py-2 rounded-full bg-blue-900/60 shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="flex flex-col items-center mb-8">
          <Logo size="xl" variant="rounded" useImage={true} logoStyle="2" />
        </div>
        <Card className="shadow-2xl bg-white/95 backdrop-blur-sm rounded-3xl transition-transform duration-300 hover:scale-[1.02] focus-within:ring-2 focus-within:ring-blue-400" aria-label="Login Card">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-black text-blue-900 mb-2">Welcome Back</CardTitle>
            <CardDescription className="text-blue-700 text-lg">Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6" aria-label="Login Form">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-900 font-semibold">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 rounded-full bg-blue-50 border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200"
                    required
                    aria-label="Email Address"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-900 font-semibold">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 rounded-full bg-blue-50 border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200"
                    required
                    aria-label="Password"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full rounded-full bg-gradient-to-r from-blue-900 to-blue-500 text-white font-bold shadow-lg py-3 text-lg transition-transform duration-200 hover:scale-105 active:scale-95 focus:ring-2 focus:ring-blue-400" aria-label="Login Button">Login</Button>
              <div className="text-center mt-4">
                <p className="text-sm text-blue-700">
                  Not registered yet?{' '}
                  <button
                    type="button"
                    onClick={onRegister}
                    className="text-blue-900 hover:underline font-bold transition-transform duration-200 hover:scale-105 focus:ring-2 focus:ring-blue-400"
                    aria-label="Register Button"
                  >
                    Register
                  </button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
