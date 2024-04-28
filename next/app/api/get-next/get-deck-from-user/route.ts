


// DEPRECATED


// import  { NextRequest, NextResponse } from 'next/server'
// import supabase from '../../supabase'

// type response_data = {
//     decks: deck_data
// }

// type deck_data = {
//     deck_id: number,
//     user_id: number,
//     name: string,
//     num_cards: number
// }

// export async function POST(req: NextRequest) {
//     try {
//         const body = await req.json();
        
//         console.log(body["user_name"])
//         let {data, error} = await supabase
//         .from ("users")
//         .select()
//         .eq('user_name', body["user_name"])
        
//         if (data !== null) {
//           return NextResponse.json({ data: data[0], error: false})
//         } else {
//           return NextResponse.json({ data: -1, error: true})
//         }
    
//       } catch (error) {
//         return NextResponse.json({ data: -1, error: true})
//       }
// }