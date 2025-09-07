# Secondary Market Strategy Analyst - Frontend Application

This is a modern chat interface built with React + TypeScript + Vite for interacting with an AI secondary market strategy analyst.

## Features

- 🤖 **Intelligent Chat Interface**: Modern chat UI with real-time message display
- 💬 **Real-time Communication**: Real-time interaction with backend AI services
- 📱 **Responsive Design**: Support for desktop and mobile devices
- ⚡ **Fast Response**: Fast development experience based on Vite
- 🎨 **Beautiful Interface**: Gradient colors and smooth animation effects

## Tech Stack

- **Frontend Framework**: React 19.1.1
- **Development Language**: TypeScript
- **Build Tool**: Vite 7.1.2
- **Routing**: React Router DOM 7.8.2
- **Styling**: CSS3 (Native styles, no additional dependencies)

## Quick Start

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### Build Production Version

```bash
npm run build
```

### Preview Production Version

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Component directory
│   ├── Chat.tsx        # Chat interface component
│   ├── Header.tsx      # Navigation header component
│   └── About.tsx       # About page component
├── pages/              # Page directory
│   └── Home.tsx        # Home page component
├── App.tsx             # Main application component
├── App.css             # Global styles
├── main.tsx            # Application entry point
└── vite-env.d.ts       # Vite type definitions
```

## Main Component Description

### Chat.tsx

- Core component of the chat interface
- Handles message sending and receiving
- Manages chat state and UI interaction
- Supports typing indicator and error handling

### Header.tsx

- Application navigation bar
- Provides navigation between pages

### About.tsx

- About page, introducing application features and tech stack

## API Integration

The application communicates with the backend service through HTTP POST requests:

```typescript
const response = await fetch('http://localhost:3000/ask', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ question: inputValue }),
});
```

## Style Features

- **Modern Design**: Uses gradient backgrounds and rounded corner design
- **Responsive Layout**: Adapts to different screen sizes
- **Smooth Animation**: Message fade-in effects and typing indicators
- **User-friendly**: Clear visual hierarchy and interaction feedback

## Development Notes

1. Ensure the backend service is running at `http://localhost:3000`
2. The frontend development server runs at `http://localhost:5173`
3. Supports hot reload, automatically refreshing after code modifications
4. Uses TypeScript to provide type safety

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

MIT License
