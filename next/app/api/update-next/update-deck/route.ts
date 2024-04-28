/**
 * @file update-deck/route.ts
 * @date 4/27/24
 */

import { NextRequest, NextResponse } from 'next/server'
import supabase from '../../supabase'

/**
 * @brief Updates a deck in the database
 *
 * @param deck_id The id of the deck to update
 * @param name The name of the deck
 * 
 * @return error: true if there was an error, false otherwise
 */
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