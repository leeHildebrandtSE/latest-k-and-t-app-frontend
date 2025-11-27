import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Lock } from 'lucide-react';

export function ForgotPassword({ onBack }: { onBack?: () => void }) {
	const [email, setEmail] = useState('');
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitted(true);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-4" style={{ paddingTop: 'calc(var(--safe-area-inset-top) + 1rem)', paddingBottom: 'calc(var(--safe-area-inset-bottom) + 1rem)' }}>
			<div className="w-full max-w-md">
				<Card className="shadow-2xl bg-white/95 backdrop-blur-sm rounded-3xl transition-transform duration-300 hover:scale-[1.02] focus-within:ring-2 focus-within:ring-blue-400" aria-label="Forgot Password Card">
					<CardHeader className="text-center">
						<div className="mx-auto mb-4">
							<Lock className="w-12 h-12 text-blue-700 mx-auto" />
						</div>
						<CardTitle className="text-3xl font-black text-blue-900 mb-2">Forgot Password?</CardTitle>
						<CardDescription className="text-blue-700 text-lg">No worries, we’ll send you reset instructions</CardDescription>
					</CardHeader>
					<CardContent>
						{!submitted ? (
							  <form onSubmit={handleSubmit} className="space-y-6" aria-label="Forgot Password Form">
								<div className="space-y-2">
									<Label htmlFor="email" className="text-blue-900 font-semibold">Email Address</Label>
									<div className="relative">
										<Input
											id="email"
											type="email"
											placeholder="Enter your Email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											  className="pl-4 rounded-full bg-blue-50 border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200"
											  aria-label="Email Address"
											required
										/>
									</div>
								</div>
								<Button type="submit" className="w-full rounded-full bg-gradient-to-r from-blue-900 to-blue-500 text-white font-bold shadow-lg py-3 text-lg">Reset Password</Button>
												<Button type="submit" className="w-full rounded-full bg-gradient-to-r from-blue-900 to-blue-500 text-white font-bold shadow-lg py-3 text-lg transition-transform duration-200 hover:scale-105 active:scale-95 focus:ring-2 focus:ring-blue-400" aria-label="Reset Password Button">Reset Password</Button>
								<div className="text-center mt-4">
									<button
										type="button"
										onClick={onBack}
										className="text-blue-900 hover:underline font-bold transition-transform duration-200 hover:scale-105 focus:ring-2 focus:ring-blue-400"
										aria-label="Back to Login Button"
									>
										Back to Login
									</button>
								</div>
							</form>
						) : (
							<div className="text-center py-8">
								<p className="text-blue-700 text-lg font-semibold mb-2">Check your email</p>
								<p className="text-blue-900">We’ve sent password reset instructions to <span className="font-bold">{email}</span></p>
								<div className="mt-6">
									<button
										type="button"
										onClick={onBack}
										className="text-blue-900 hover:underline font-bold"
									>
										Back to Login
									</button>
								</div>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
Create a forgot password screen that matches the new UI/UX design: blue gradient background, rounded card, bold headings, icon, and modern input/button styling.