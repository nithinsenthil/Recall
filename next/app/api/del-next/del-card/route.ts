/**
 * @file del-card/route.ts
 * @date 4/27/24
 */

import { NextRequest, NextResponse } from 'next/server'
import supabase from '../../supabase'

/**
 * @brief Deletes a card from the database
 *
 * @param card_id The id of the card to delete
 * 
 * @return error: true if there was an error, false otherwise
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    let {data, error} = await supabase
    .from ("cards")
    .delete()
    .eq('card_id', body["card_id"])
    
    
    if (data !== null) {
      return NextResponse.json({error: false})
    } else {
      return NextResponse.json({error: true})
    }

  } catch (error) {
    return NextResponse.json({error: true})
  }
}