import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/stores/authStore';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login({ username, password });
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Login failed. Please try again')
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 '>
            <div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow'>
                <div>
                    <h2 className='text-3xl font-bold text-center '>Sign In</h2>
                    <p className='mt-2 text-center text-gray-600 '>
                        Smart Reminder App
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-4' >
                    {error && (
                        <div className='p-3 bg-red-50 border border-red-200 text-red-600 rounded'>
                           {error}
                        </div>
                    )}
                    <div>
                        <label className='block text-sm font-medium mb-1'>Username</label>
                        <Input
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className='block text-sm fonte-medium mb-1 '>Password</label>
                        <Input
                            type='password'
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            required />
                    </div>

                    <Button type='submit' className='w-full'>
                        {loading ? 'Signing in...': 'Sign in'}
                    </Button>
                </form>

                <p className='text-center text-sm'>Don't have an account?{' '}
                    <Link to='/register' className="text-blue-600 hover:underline">
                        Sign up
                    </Link></p>

            </div>
        </div>
    )
}
