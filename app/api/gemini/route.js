import { NextResponse } from 'next/server'
import { model } from '@/lib/geminiClient'

export async function POST(request) {
  try {
    const { prompt } = await request.json()
    const result = await model.generateContent(prompt)
    const reply = result.response.text()
    return NextResponse.json({ reply })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
