import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 '>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-gray-800'>404</h1>
        <p className='text-xl text-gray-600 mt-4'>Page not found</p>
        <Link to="/dashboard">
            <Button className='mt-6'>Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}
