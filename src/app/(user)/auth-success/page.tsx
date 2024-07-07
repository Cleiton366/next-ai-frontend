'use client'
import { toast } from '@/components/ui/use-toast';
import { useUser } from '@/contexts/user-context';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthSuccess() {
  const router = useRouter();
  const userContext = useUser();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user = JSON.parse(decodeURIComponent(params.get('user') || ''));
    localStorage.setItem('user', JSON.stringify(user));

    if (user) {
      userContext.setUser(user);
      router.push('/chat');
    } else {
      toast({
        title: 'Failed to Login',
        description: 'An error occurred while trying to login. Please try again.',
        duration: 5000,
        className: 'bg-[#1E1F24] text-white'
      });
      router.push('/');
    }
  }, []);
  return (
    <main className="flex min-h-screen justify-center items-center bg-black">
      <div className="flex items-center">
        <CircularProgress
          sx={{
            "& .MuiCircularProgress-circle": {
              "color": "#8F91BF"
            },
          }} />
        <h1 className="ml-5 font-semibold">Loading...</h1>
      </div>
    </main>
  )
}

