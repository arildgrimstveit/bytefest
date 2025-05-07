import { NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: Request) {
  console.log('[DEBUG /api/ping] Ping route hit!');
  return NextResponse.json({ message: 'pong' });
} 