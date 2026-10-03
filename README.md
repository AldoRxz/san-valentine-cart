# 💕 Valentine's Day Card

A beautiful, animated Valentine's Day card built with React + Vite. Send a personalized love letter with floating hearts, sparkles, and smooth animations.

![Valentine Card Preview](https://img.shields.io/badge/Made%20with-Love-ff69b4?style=for-the-badge&logo=heart)

## ✨ Features

- 💌 **Interactive Envelope** - Click to open with smooth animation
- 💖 **Floating Hearts** - Continuous heart emojis floating upward
- ✨ **Sparkle Effects** - Golden particles twinkling in the background
- 📝 **Personalized Message** - Customizable recipient name via environment variable
- 🎨 **Beautiful Design** - Premium gradients, glassmorphism, and modern aesthetics
- 📱 **Responsive** - Works on desktop and mobile devices
- 🚀 **Fast** - Built with Vite for lightning-fast development

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/san-valentine-cart.git
cd san-valentine-cart
```

2. Install dependencies:
```bash
npm install
```

3. Create your `.env` file:
```bash
cp .env.example .env
```

4. Edit `.env` with your data (see [Customization](#-customization)):
```env
VITE_RECIPIENT_NAME=YourLoveName
VITE_SENDER_NAME=YourName
```

5. Start the development server:
```bash
npm run dev
```

6. Open http://localhost:5173 in your browser 💕

## 🎨 Customization

Everything personal lives in two places, so the card can be reused for anyone:

### `.env` — short values

| Variable | Description |
| --- | --- |
| `VITE_RECIPIENT_NAME` | Recipient's name (default: `Mi Amor`) |
| `VITE_SENDER_NAME` | Name that signs the card and letter (optional) |
| `VITE_START_DATE` | Date for the "time together" counter, `YYYY-MM-DD`. Empty hides the counter |
| `VITE_COUNTER_TITLE` | Title shown above the counter |
| `VITE_CARD_PHOTO` / `VITE_CARD_PHOTO_CAPTION` | Photo on the main card. Empty hides it |
| `VITE_LETTER_PHOTO` / `VITE_LETTER_PHOTO_CAPTION` | Photo shown after the letter. Empty hides it |
| `VITE_SONG_URL` | Background song (path in `public/` or URL) |
| `VITE_CARD_GIF_URL` | GIF on the main card |

Photos go in the `public/` folder and are referenced by path, e.g. `VITE_CARD_PHOTO=/us.jpg`. They are optional — if you don't set them the card works without them.

### `src/config.js` — long texts

Edit the card message, the love letter (`letterLines`) and the easter-egg secret messages directly in this file.

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder, ready to deploy to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Animations and styling
- **Google Fonts** - Dancing Script, Playfair Display, Quicksand

## 📁 Project Structure

```
san-valentine-cart/
├── public/
│   └── heart.svg          # Favicon
├── src/
│   ├── components/
│   │   ├── Envelope.jsx   # Interactive envelope component
│   │   ├── Envelope.css
│   │   ├── FloatingHearts.jsx
│   │   ├── FloatingHearts.css
│   │   ├── Sparkles.jsx
│   │   ├── Sparkles.css
│   │   ├── ValentineCard.jsx  # Main card with message
│   │   └── ValentineCard.css
│   ├── config.js          # All personalizable content
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env.example           # Environment variables template
├── index.html
└── package.json
```


**Happy Valentine's Day!** 💕
