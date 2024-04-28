import { NextRequest, NextResponse, userAgent } from 'next/server'
import supabase from '../../supabase'


type response_data = {
    user_id: number
    error: boolean
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    let {data, error} = await supabase
      .from ("users")
      .insert({
        user_name: body["user_name"], 
        num_decks: 0})
      .select()

    if (data !== null) {
      return NextResponse.json({ data: data[0], error: false})
    } else {
      return NextResponse.json({ data: -1, error: true})
    }

  } catch (error) {
    return NextResponse.json({ data: -1, error: true})
  }
}