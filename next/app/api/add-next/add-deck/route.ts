import { NextRequest, NextResponse } from 'next/server'
import supabase from '../../supabase'

type response_data = {
    deck_id: number,
    error: boolean
}

export async function POST(req: NextRequest) {
    try {
      const body = await req.json();
      
      let {data, error} = await supabase
      .from ("decks")
      .insert({
        user_id: body["user_id"], 
        name: body["name"],
        num_cards: body["num_cards"]})
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