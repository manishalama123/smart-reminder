import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Link } from 'react-router-dom'

export default function Login() {
    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 '>
            <div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow'>
                <div>
                    <h2 className='text-3xl font-bold text-center text-red-800'>Sign In</h2>
                    <p>
                        Smart Reminder App
                    </p>
                </div>

                <form action="">
                    <div>
                        <label >Username</label>
                        <Input />
                    </div>

                    <div>
                        <label >Password</label>
                        <Input />
                    </div>

                    <Button>

                    </Button>
                </form>
                <p>Don't have an account?{' '}
                    <Link to='/'>
                        Sign up
                    </Link></p>

            </div>
        </div>
    )
}
