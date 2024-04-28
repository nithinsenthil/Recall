import  { NextRequest, NextResponse } from 'next/server'
import supabase from '../../supabase'

type response_data = {
    decks: deck_data[]
}

type deck_data = {
    deck_id: number,
    user_id: number,
    name: string,
    num_cards: number
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        
        let {data, error} = await supabase
        .from ("decks")
        .select('*')
        .eq('user_id', body["user_id"])
        
        if (data !== null) {
          return NextResponse.json({ data: data, error: false})
        } else {
          return NextResponse.json({ data: -1, error: true})
        }
    
      } catch (error) {
        return NextResponse.json({ data: -1, error: true})
      }
}