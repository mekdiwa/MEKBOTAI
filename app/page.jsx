'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push('/chat')
      else router.push('/login')
    })
  }, [])
  return <div className="text-white text-center mt-20">กำลังโหลด...</div>
}
