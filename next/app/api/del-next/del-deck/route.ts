/**
 * @file del-deck/route.ts
 * @date 4/27/24
 */

import { NextRequest, NextResponse } from 'next/server'
import supabase from '../../supabase'

/**
 * @brief Deletes a deck from the database
 *
 * @param deck_id The id of the deck to delete
 * 
 * @return data: true if there was an error, false otherwise
 */
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
      return NextResponse.json({error: false})
    } else {
      return NextResponse.json({error: true})
    }

  } catch (error) {
    return NextResponse.json({error: true})
  }
}