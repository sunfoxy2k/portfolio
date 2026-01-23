# Personal Portfolio with AI Assistant

A modern, responsive portfolio website built with Next.js, Tailwind CSS, and OpenAI's ChatGPT API. Features an interactive AI assistant that can answer questions about your professional background.

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- 🤖 AI-powered chatbot integration using OpenAI API
- ⚡ Built with Next.js 14 and TypeScript
- 📱 Mobile-friendly responsive layout
- 🔒 Secure API key handling with environment variables

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key (get one at https://platform.openai.com/api-keys)

### Setup Instructions

1. **Install dependencies:**
```bash
npm install
```

2. **Set up your OpenAI API key:**
   - Get your API key from https://platform.openai.com/api-keys
   - Update `.env.local` with your actual API key:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

3. **Customize your portfolio:**
   - Update `src/app/page.tsx` with your personal information
   - Modify the AI assistant's knowledge in `src/app/api/chat/route.ts`
   - Add your projects, skills, and contact information

4. **Run the development server:**
```bash
npm run dev
```

5. **Open your portfolio:**
   Visit [http://localhost:3000](http://localhost:3000) to see your portfolio

## Customization Guide

### Personal Information
Edit `src/app/page.tsx` to update:
- Your name and professional title
- Skills and technologies
- Contact information
- Project showcase

### AI Assistant Configuration
Customize the chatbot in `src/app/api/chat/route.ts`:
- Update the system prompt with your background details
- Add information about your projects and experience
- Adjust response length and behavior

## Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts      # ChatGPT API integration
│   ├── page.tsx               # Main portfolio page
│   └── layout.tsx             # App layout
├── components/
│   └── ChatBot.tsx            # AI chat interface
└── ...
```

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add `OPENAI_API_KEY` environment variable in Vercel dashboard
4. Deploy!

### Other Platforms
- Set `OPENAI_API_KEY` environment variable
- Use Node.js 18+ runtime
- Build: `npm run build`
- Start: `npm start`

## Technologies

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **OpenAI API** - AI chat functionality
