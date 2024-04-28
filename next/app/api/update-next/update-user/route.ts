/**
 * @file update-user/route.ts
 * @date 4/27/24
 */

import { NextRequest, NextResponse } from 'next/server'
import supabase from '../../supabase'

/**
 * @brief Updates a user in the database
 *
 * @param user_id The id of the user to update
 * @param user_name The name of the user
 * 
 * @return error: true if there was an error, false otherwise
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    let {error} = await supabase
    .from ("users")
    .update({user_name: body["user_name"]})
    .eq('user_id', body["user_id"])
    
    return NextResponse.json({error: false})

  } catch (error) {
    return NextResponse.json({ error: true})
  }
}