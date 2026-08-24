'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const playSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioCtx.createOscillator()
      const gainNode = audioCtx.createGain()
      oscillator.connect(gainNode)
      gainNode.connect(audioCtx.destination)
      oscillator.frequency.value = 800
      gainNode.gain.value = 0.08
      oscillator.start()
      setTimeout(() => oscillator.stop(), 100)
    } catch (e) { /* ไม่ต้องทำอะไร */ }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else router.push('/chat')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/5 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-96 border border-white/10"
      >
        <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
          MEKBOTAI
        </h1>
        <p className="text-gray-400 text-center mb-8">ยินดีต้อนรับกลับมา</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <motion.div initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <input
              type="email"
              placeholder="อีเมลของคุณ"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={playSound}
              className="w-full px-5 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 outline-none transition"
            />
          </motion.div>

          <motion.div initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="รหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={playSound}
              className="w-full px-5 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 outline-none transition pr-12"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-gray-400 hover:text-white">
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </motion.div>

          {error && <p className="text-red-400 text-sm bg-red-500/10 p-2 rounded-lg">{error}</p>}

          <motion.button initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }}
            type="submit" className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl font-bold text-black hover:shadow-lg hover:shadow-yellow-500/30 transition transform hover:scale-[1.02]">
            เข้าสู่ระบบ
          </motion.button>
        </form>
        <p className="text-gray-400 text-center mt-6 text-sm">
          ยังไม่มีบัญชี? <a href="/register" className="text-yellow-400 hover:underline font-semibold">สมัครสมาชิก</a>
        </p>
      </motion.div>
    </div>
  )
}
