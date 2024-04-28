/**
 * @file get-all-decks-from-user/route.ts
 * @date 4/27/24
 */

import { NextRequest, NextResponse } from 'next/server'
import supabase from '../../supabase'

/**
 * @brief Gets all decks from a specified user
 *
 * @param user_id The id of the user to get decks from
 * 
 * @return decks: JSON[] The decks in the user
 * @note Evaluate error before accessing decks
 */
export async function POST(req: NextRequest) {
    try {
      const body = await req.json();
      
      let {data, error} = await supabase
      .from ("decks")
      .select('*')
      .eq('user_id', body["user_id"])
      
      if (data !== null) {
        return NextResponse.json({ decks: data, error: false})
      } else {
        return NextResponse.json({error: true})
      }
  
    } catch (error) {
      return NextResponse.json({error: true})
    }
}