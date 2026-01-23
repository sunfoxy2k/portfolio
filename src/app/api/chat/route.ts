import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant representing a portfolio owner. Answer questions about their professional background, skills, projects, and experience. Keep responses conversational but professional. If you don't have specific information, politely say so and suggest they can contact directly for more details.`
        },
        {
          role: "user",
          content: message
        }
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 500,
    });

    return NextResponse.json({ 
      response: completion.choices[0].message.content 
    });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return NextResponse.json(
      { error: 'Failed to get response from AI' }, 
      { status: 500 }
    );
  }
}