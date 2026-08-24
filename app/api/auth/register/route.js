import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(request) {
  try {
    const { email, password, display_name } = await request.json()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name } }
    })
    if (error) throw error
    return NextResponse.json({ user: data.user })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
