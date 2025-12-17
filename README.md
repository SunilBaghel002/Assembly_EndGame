# ⚙️ Assembly: EndGame

<div align="center">

![Assembly EndGame Banner](https://img.shields.io/badge/Assembly-EndGame-ff5757?style=for-the-badge&logo=react&logoColor=white)

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**A thrilling word-guessing game where you save programming languages from extinction!**

[🎮 Play Now](#-quick-start) • [📖 How to Play](#-how-to-play) • [🛠️ Installation](#️-installation) • [🤝 Contributing](#-contributing)

</div>

---

## 🌟 Introduction

**Assembly: EndGame** is an exciting and interactive word-guessing game built with React. In this game, you're humanity's last hope to save all programming languages from being replaced by Assembly! 

Guess the hidden word letter by letter before you run out of attempts. Each wrong guess eliminates a beloved programming language forever. Can you save them all? 🦸‍♂️

> 💡 *"With great power comes great responsibility... to save JavaScript!"*

---

## ✨ Features

### 🎯 Core Gameplay
- 🔤 **Word Guessing** - Guess the hidden word one letter at a time
- ❤️ **8 Attempts** - You have 8 lives to save all programming languages
- 🎨 **Visual Feedback** - Instant color-coded feedback for correct/wrong guesses
- 🎉 **Confetti Celebration** - Beautiful confetti animation when you win!

### ⌨️ Keyboard Support
- 🖱️ **Click or Type** - Use on-screen keyboard or your physical keyboard
- ⏎ **Quick Restart** - Press `Enter` to start a new game when game ends
- 🎹 **Visual Key Press** - See which keys you're pressing in real-time

### 📊 Statistics Panel (Left Side)
- 📈 **Game Stats** - Track games played, won, and lost
- 🏆 **Win Rate** - Visual progress bar showing your success rate
- 🔥 **Streaks** - Current and best winning streaks
- 🎖️ **Achievements** - Unlock badges for milestones
- 💾 **Persistent Data** - Stats saved automatically to localStorage

### 🎮 Game Info Panel (Right Side)
- 📏 **Current Game Status** - Word length, lives, correct/wrong counts
- 🔤 **Guessed Letters** - Visual display of all attempted letters
- 📚 **How to Play** - Step-by-step instructions
- 🌐 **Languages at Stake** - See which languages are in danger

### 📱 Responsive Design
- 💻 **Desktop** - Full 3-column layout with side panels
- 📱 **Tablet/Mobile** - Slide-in panels with toggle buttons
- 🎨 **Beautiful UI** - Animated backgrounds, glowing effects, smooth transitions

---

## 🎬 Screenshots

<div align="center">

| Desktop View |

![Dektop view](./src/assets/images/Screenshot%202025-12-17%20215412.png)
<!-- ![Moblie View](./src/assets/images/Screenshot%202025-12-17%20215441.png)| -->
| 🖥️ Full experience with side panels |

</div>

---

## 🎮 How to Play

1. **🎯 Start the Game**
   - A random word is selected and displayed as blank spaces
   - You have 8 attempts to guess the word

2. **🔤 Guess Letters**
   - Click on the on-screen keyboard OR use your physical keyboard
   - Each letter can only be guessed once

3. **✅ Correct Guess**
   - The letter appears in green on the keyboard
   - The letter is revealed in the word

4. **❌ Wrong Guess**
   - The letter appears in red on the keyboard
   - A programming language is eliminated 💀
   - Your remaining attempts decrease

5. **🏆 Win Condition**
   - Guess all letters in the word before running out of attempts
   - Save all programming languages and celebrate with confetti! 🎉

6. **💀 Lose Condition**
   - Run out of attempts before guessing the word
   - Assembly takes over... Better start learning it! 😅

---

## 🛠️ Installation

### Prerequisites

Make sure you have the following installed on your machine:

| Requirement | Version |
|-------------|---------|
| 📦 Node.js | v16.x or higher |
| 📦 npm | v8.x or higher |

### 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/SunilBaghel002/assembly-endgame.git
   ```

2. **Navigate to project directory**
   ```bash
   cd assembly-endgame
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

🎉 **That's it! You're ready to play!**

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| ⚛️ `react` | UI Library |
| ⚛️ `react-dom` | React DOM rendering |
| 🎨 `clsx` | Conditional CSS classes |
| 🎊 `react-confetti` | Celebration effects |
| 🆔 `nanoid` | Unique ID generation |

### Dev Dependencies

| Package | Purpose |
|---------|---------|
| ⚡ `vite` | Build tool & dev server |
| 🔷 `@vitejs/plugin-react` | React plugin for Vite |

---

## 📁 Project Structure

```
assembly-endgame/
├── 📂 public/
│   └── 🖼️ favicon.ico
├── 📂 src/
│   ├── 📂 assets/
│   │   ├── 📄 languages.js      # Programming languages data
│   │   ├── 📄 words.js          # Word list for the game
│   │   └── 📄 utils.js          # Helper functions
│   ├── 📂 components/
│   │   ├── ⚛️ Header.jsx        # Game header component
│   │   ├── ⚛️ Main.jsx          # Main game logic
│   │   ├── ⚛️ Language.jsx      # Language chip component
│   │   ├── ⚛️ StatsPanel.jsx    # Statistics sidebar
│   │   └── ⚛️ InfoPanel.jsx     # Game info sidebar
│   ├── ⚛️ App.jsx               # Root component
│   ├── 🎨 index.css             # Global styles
│   └── 📄 main.jsx              # Entry point
├── 📄 index.html
├── 📄 package.json
├── 📄 vite.config.js
└── 📄 README.md
```

---

## 🎨 Customization

### 🔤 Adding New Words

Edit `src/assets/words.js`:

```javascript
export const words = [
  "react",
  "javascript",
  "python",
  // Add your words here! ✨
];
```

### 🌐 Adding New Languages

Edit `src/assets/languages.js`:

```javascript
export const languages = [
  {
    name: "Your Language",
    backgroundColor: "#hexcolor",
    color: "#textcolor"
  },
  // Add more languages! 🚀
];
```

### 😢 Adding Farewell Messages

Edit `src/assets/utils.js`:

```javascript
const options = [
  `Farewell, ${language}! 👋`,
  `Your custom message for ${language}! 🎭`,
  // Add more messages! 💬
];
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `A-Z` | Guess a letter |
| `Enter` | Start new game (when game is over) |

---

## 🏆 Achievements

| Badge | Name | How to Unlock |
|:---:|---|---|
| 🎮 | First Steps | Play your first game |
| 🏅 | Winner | Win your first game |
| ⭐ | Veteran | Win 10 games |
| 🔥 | Hot Streak | Get a 3-win streak |
| 💎 | Unstoppable | Get a 5-win streak |
| 🚀 | Speed Demon | Win with 10 or fewer guesses |

---

## 🤝 Contributing

Contributions are always welcome! Here's how you can help:

1. 🍴 **Fork** the repository
2. 🌿 **Create** a new branch (`git checkout -b feature/amazing-feature`)
3. 💻 **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. 📤 **Push** to the branch (`git push origin feature/amazing-feature`)
5. 🔃 **Open** a Pull Request

### 💡 Ideas for Contributions

- [ ] 🌍 Add internationalization (i18n)
- [ ] 🎵 Add sound effects
- [ ] 📊 Add more statistics and graphs
- [ ] 🏅 Add more achievements
- [ ] 🎨 Add theme customization
- [ ] 📱 Add PWA support

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Sunil Baghel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 🙏 Acknowledgments

- 🎨 Inspired by classic Hangman game
- ⚛️ Built with React and love
- 🎊 Confetti by [react-confetti](https://github.com/alampros/react-confetti)
- 💜 Thanks to all contributors!

---

## 📧 Contact

Have questions or suggestions? Feel free to reach out!

- 📧 Email: sunilbaghel93100@gmail.com
- 💼 LinkedIn: [Sunil Baghel](https://www.linkedin.com/in/sunil-baghel-140a60348/)

---

<div align="center">

### ⭐ Star this repo if you enjoyed playing!

Made with ❤️ and ☕ by [Sunil Baghel](https://github.com/SunilBaghel002)

**Save the languages. Save the world. 🌍**

</div>
