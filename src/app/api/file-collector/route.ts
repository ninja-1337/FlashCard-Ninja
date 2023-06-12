import { NextResponse } from 'next/server'
 
export async function GET(request: Request) {
console.log("Here Test")
  const res = "ggggg"
  const product = res
 
  return NextResponse.json({ product })
}