import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// ใช้ Gemini 2.0 Flash (เร็วที่สุด รองรับดี)
export const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })
