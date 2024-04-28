import { NextRequest, NextResponse } from 'next/server'
import supabase from '../../supabase'

type response_data = {
    confirm: boolean
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    let {data, error} = await supabase
    .from ("cards")
    .delete()
    .eq('card_id', body["card_id"])
    
    
    if (data !== null) {
      return NextResponse.json({ data: data[0], error: false})
    } else {
      return NextResponse.json({ data: -1, error: true})
    }

  } catch (error) {
    return NextResponse.json({ data: -1, error: true})
  }
}