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

4. Edit `.env` and set your recipient's name:
```env
VITE_RECIPIENT_NAME=YourLoveName
```

5. Start the development server:
```bash
npm run dev
```

6. Open http://localhost:5173 in your browser 💕

## 🎨 Customization

### Change Recipient Name

Edit the `.env` file:
```env
VITE_RECIPIENT_NAME=Maria
```

### Customize the Message

Edit `src/components/ValentineCard.jsx` and modify the `message` variable with your own love letter.

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
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env.example           # Environment variables template
├── index.html
└── package.json
```

## 💝 License

Made with ❤️ for that special someone.

---

**Happy Valentine's Day!** 💕
