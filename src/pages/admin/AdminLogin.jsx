import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Loader2 } from 'lucide-react';

const AdminLogin = () => {
    const [view, setView] = useState('login'); // 'login', 'forgot', 'reset'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    // Check if user is being redirected from a password recovery email
    React.useEffect(() => {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        if (hashParams.get('type') === 'recovery') {
            setView('reset');
        } else {
            // Also listen to auth state
            const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
                if (event === 'PASSWORD_RECOVERY') {
                    setView('reset');
                }
            });
            return () => subscription.unsubscribe();
        }
    }, []);

    const handleAction = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        if (view === 'login') {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) {
                setError(error.message);
                setLoading(false);
            } else {
                navigate('/admin/dashboard');
            }
        } else if (view === 'forgot') {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/admin/login`,
            });
            if (error) {
                setError(error.message);
            } else {
                setSuccessMessage("Password reset email sent! Please check your inbox.");
            }
            setLoading(false);
        } else if (view === 'reset') {
            const { error } = await supabase.auth.updateUser({ password });
            if (error) {
                setError(error.message);
            } else {
                setSuccessMessage("Password updated successfully! You can now log in.");
                setView('login');
                setPassword('');
            }
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center font-sans">
            <div className="w-full max-w-md p-8 bg-[#0a0a0a] border border-luxury-gold/20 shadow-2xl rounded-xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif text-luxury-gold tracking-widest uppercase mb-2">Admin Panel</h1>
                    <p className="text-luxury-nude/50 text-sm font-light uppercase tracking-wider">
                        {view === 'login' && 'Sign in to manage content'}
                        {view === 'forgot' && 'Reset your password'}
                        {view === 'reset' && 'Enter your new password'}
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-sm text-center rounded">
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="mb-6 p-3 bg-green-500/10 border border-green-500/50 text-green-500 text-sm text-center rounded">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleAction} className="space-y-6">
                    {view !== 'reset' && (
                        <div>
                            <label className="block text-luxury-gold/80 text-xs uppercase tracking-widest mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#111] border border-luxury-gold/20 py-3 px-4 text-luxury-nude font-light focus:outline-none focus:border-luxury-gold transition-colors rounded-lg"
                            />
                        </div>
                    )}

                    {view !== 'forgot' && (
                        <div>
                            <label className="block text-luxury-gold/80 text-xs uppercase tracking-widest mb-2">
                                {view === 'reset' ? 'New Password' : 'Password'}
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#111] border border-luxury-gold/20 py-3 px-4 text-luxury-nude font-light focus:outline-none focus:border-luxury-gold transition-colors rounded-lg"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-luxury-gold text-luxury-black py-3 px-4 uppercase tracking-widest font-medium hover:bg-luxury-lightGold transition-colors rounded-lg disabled:opacity-50"
                    >
                        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                        {!loading && view === 'login' && 'Log In'}
                        {!loading && view === 'forgot' && 'Send Reset Link'}
                        {!loading && view === 'reset' && 'Update Password'}
                    </button>

                    {view === 'login' && (
                        <div className="text-center mt-4">
                            <button type="button" onClick={() => { setView('forgot'); setError(null); setSuccessMessage(null); }} className="text-luxury-nude/50 hover:text-luxury-gold text-xs uppercase tracking-wider transition-colors">
                                Forgot password?
                            </button>
                        </div>
                    )}

                    {view === 'forgot' && (
                        <div className="text-center mt-4">
                            <button type="button" onClick={() => { setView('login'); setError(null); setSuccessMessage(null); }} className="text-luxury-nude/50 hover:text-luxury-gold text-xs uppercase tracking-wider transition-colors">
                                Back to Login
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
