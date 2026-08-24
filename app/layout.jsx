import { Prompt } from 'next/font/google'
import './globals.css'

const prompt = Prompt({ 
  weight: ['300', '400', '600', '700'], 
  subsets: ['latin', 'thai'] 
})

export const metadata = {
  title: 'MEKBOTAI',
  description: 'AI Chatbot by Gemini',
}

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className={`${prompt.className} bg-gray-900`}>{children}</body>
    </html>
  )
}
