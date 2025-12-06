# Bond: Escape from Hell to Paradise

Welcome to **Bond: Escape from Hell to Paradise**, a challenging 2-player cooperative platformer where trust and synchronization are your only keys to survival.

![Bond Game Splash](public/favicon.ico)

## 🎮 Game Overview

In this split-screen adventure, two players control Kai and Lena—two souls bound by destiny—as they attempt to ascend from the depths of Hell. The twist? **Asymmetric Foresight**.

- **Kai (Player 1)** is a devilish rogue who sees obstacles and platforms that Lena cannot.
- **Lena (Player 2)** is an angelic spirit who reveals paths hidden from Kai.

Players must communicate constantly to guide each other through invisible hazards. If one falls, both restart.

## ✨ Features

- **Co-op Split-Screen Gameplay**: True local multiplayer experience on a single screen.
- **Asymmetric Mechanics**: Each player perceives a different version of the reality.
- **Cross-Platform**: Playable on Web, Android, and iOS.
- **Dynamic Audio**: Immersive background music and sound effects.
- **Touch & Keyboard Support**: Seamlessly switch between desktop and mobile play.

## 🕹️ Controls

### Desktop (Keyboard)
| Action | Player 1 (Kai) | Player 2 (Lena) |
|--------|----------------|-----------------|
| **Move Left** | Left Arrow | A |
| **Move Right** | Right Arrow | D |
| **Jump** | Up Arrow | W |

### Mobile (Touch)
On-screen controls will appear automatically on mobile devices.
- **Landscape Mode** is required for the best experience.

## 🚀 Tech Stack

- **Framework**: [React Router 7](https://reactrouter.com/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Graphics**: HTML5 Canvas API
- **Mobile Runtime**: CapacitorJS
- **Audio**: Web Audio API

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation

```bash
git clone https://github.com/mamxalf/bond-escape-from-hell.git
cd bond-escape-from-hell
npm install
```

### Running Locally

```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

## 📱 building for Mobile

### Android
```bash
npm run build
npm run cap:sync
npm run cap:open android
```

### iOS (macOS only)
```bash
npm run build
npm run cap:sync
npm run cap:open ios
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built with ❤️ by FPK Creative
