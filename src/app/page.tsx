'use client';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col md:flex-row min-h-screen items-center justify-center bg-black" >
      <img
        src="/logomark.svg"
        alt="logo"
        className="w-60 h-60 md:w-[30rem] md:h-[30rem]"
      />
      <div>
        <div className="flex flex-col items-center">
          <div className="mb-8 font-semibold md:text-[16pt] text-center">
            <h1>Your everyday <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#FBFBFB] to-[#8a8dd6]">Open Source</span> Web-UI for</h1>
            <h1>Your everyday <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#FBFBFB] to-[#8a8dd6]">LLMs</span></h1>
          </div>
          <div className="flex flex-col md:flex-row gap-1 md:gap-4">
            <Button
              className='bg-accent border-[0.1rem] border-white/15'
              onClick={() => router.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/auth/google`)}
            >
              <FaGoogle className='md:h-5 md:w-5 mr-2' />
              <span className='text-[8pt] md:text[14pt]'>Sign in with Google</span>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
