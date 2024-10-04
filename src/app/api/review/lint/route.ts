import { ESLint } from 'eslint';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    const eslint = new ESLint();
    const results = await eslint.lintText(code);

    
    return NextResponse.json({
      success: true,
      review: results[0].messages,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ success: false, error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}
