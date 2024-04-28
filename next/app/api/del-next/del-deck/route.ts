import { NextRequest, NextResponse } from 'next/server'
import supabase from '../../supabase'

type response_data = {
    confirm: boolean
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    let {data: data1} = await supabase
    .from ("cards")
    .delete()
    .eq('deck_id', body["deck_id"])

    let {data: data2} = await supabase
    .from ("decks")
    .delete()
    .eq('deck_id', body["deck_id"])
    
    
    if (data1 !== null) {
      return NextResponse.json({ data: true, error: false})
    } else {
      return NextResponse.json({ data: -1, error: true})
    }

  } catch (error) {
    return NextResponse.json({ data: -1, error: true})
  }
}