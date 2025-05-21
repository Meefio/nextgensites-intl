import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();

    // In a real-world scenario, you might want to:
    // 1. Validate the data
    // 2. Process it (store in database, forward to another service, etc.)
    // 3. Add authentication/authorization

    // For now, we'll just log it in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics event received:', body);
    }

    // Return a success response
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error processing analytics event:', error);
    return NextResponse.json(
      { error: 'Failed to process analytics data' },
      { status: 500 }
    );
  }
}

// Allow OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
} 
