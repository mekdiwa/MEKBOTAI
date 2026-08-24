'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const scrollRef = useRef(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push('/login')
    })
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'model', content: data.reply || 'ขออภัย เกิดข้อผิดพลาด' }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', content: 'เชื่อมต่อ AI ไม่ได้ กรุณาลองใหม่' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Header */}
      <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">MEKBOTAI</h1>
        <button onClick={async () => { await supabase.auth.signOut(); router.push('/login') }} 
          className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 text-sm">
          ออกจากระบบ
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-6xl mb-4">💡</p>
            <p>เริ่มแชทกับ MEKBOTAI ได้เลย!</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] px-5 py-3 rounded-2xl shadow-lg ${msg.role === 'user' ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-gray-400 pl-2">กำลังคิด...</div>}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-gray-800 border-t border-gray-700 flex gap-3">
        <input
          className="flex-1 px-5 py-3 bg-gray-700 rounded-2xl outline-none text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500"
          placeholder="พิมพ์ข้อความ..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading} 
          className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl font-bold text-black hover:shadow-lg hover:shadow-yellow-500/30 transition disabled:opacity-50">
          ส่ง
        </button>
      </div>
    </div>
  )
}
