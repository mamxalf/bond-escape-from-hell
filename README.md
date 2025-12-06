# Bond: Escape from Hell to Paradise

A challenging 2-player cooperative platformer game built with React Router and CapacitorJS.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🎮 2-player cooperative split-screen gameplay
- 📱 Mobile-ready with CapacitorJS for Android/iOS
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔒 TypeScript by default
- 🎨 TailwindCSS for styling
- 📖 Built with React Router

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Building for Mobile (Capacitor)

### Prerequisites

- Node.js and npm installed
- Android Studio (for Android builds)
- Xcode (for iOS builds on macOS)

### Setup Android

1. Install dependencies:
```bash
npm install
```

2. Build the web app:
```bash
npm run build
```

3. Add Android platform (first time only):
```bash
npm run cap:add android
```

4. Sync web assets with Capacitor:
```bash
npm run cap:sync
```

5. Open in Android Studio:
```bash
npm run cap:open
```

Then build and run from Android Studio.

### Setup iOS (macOS only)

1. Install dependencies:
```bash
npm install
```

2. Build the web app:
```bash
npm run build
```

3. Add iOS platform (first time only):
```bash
npm run cap:add ios
```

4. Sync web assets with Capacitor:
```bash
npm run cap:sync
```

5. Open in Xcode:
```bash
npm run cap:open
```

Then build and run from Xcode.

### Important Notes

- After making changes to the web app, run `npm run build` and then `npm run cap:sync` to update the native app
- Native configuration can be edited in `capacitor.config.ts`
- The `webDir` in `capacitor.config.ts` points to `build/client` (React Router output)

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
