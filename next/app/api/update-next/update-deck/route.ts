import { NextRequest, NextResponse } from 'next/server'
import supabase from '../../supabase'

type response_data = {
    confirm: boolean
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    let {error} = await supabase
    .from ("decks")
    .update({name: body["name"]})
    .eq('deck_id', body["deck_id"])
    
    return NextResponse.json({error: false})

  } catch (error) {
    return NextResponse.json({ error: true})
  }
}