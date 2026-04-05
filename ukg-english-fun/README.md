# 🎮 Kukhuri Ka - UKG English Fun

A delightful educational web application designed for UKG (Upper Kindergarten) students to learn English, Math, Science, and Nepali through interactive mini-games and engaging activities.

## 🌟 Features

### 📚 Educational Subjects
- **🅰️ English**: Alphabet recognition and phonics learning
- **🔢 Math**: Number sequencing and counting
- **🧪 Science**: Living vs non-living things classification
- **🇳🇵 Nepali**: Alphabet and word recognition

### 🎮 Interactive Games
- **Alphabet Treasure Hunt**: Find and drag letters to treasure chests
- **Phonics Pop Bubbles**: Pop balloons with the correct letters
- **Number Train Ride**: Arrange numbers in ascending/descending order
- **Living vs Non-Living Sort**: Categorize items into living and non-living groups
- **Nepali Word & Picture Match**: Match Nepali words with corresponding images

### 🏆 Gamification System
- **⭐ Stars**: Earn stars for completing activities
- **🎖️ Badges**: Unlock badges for reaching milestones
- **🖼️ Stickers**: Collect reward stickers for achievements
- **📊 Progress Tracking**: Visual dashboard for parents and teachers

## 🛠️ Technology Stack

- **Frontend**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.2
- **Styling**: TailwindCSS 4.1.12
- **Animations**: Framer Motion 12.23.12
- **Routing**: React Router DOM 7.8.1
- **Sound Effects**: Canvas Confetti for celebrations
- **Development**: ESLint, PostCSS, Autoprefixer

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ukg-english-fun
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality checks

## 📁 Project Structure

```
ukg-english-fun/
├── public/                 # Static assets
│   ├── assets/            # Images and media files
│   └── vite.svg           # Vite logo
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ConfettiBurst.tsx
│   │   ├── HomeLink.tsx
│   │   ├── LetterToken.tsx
│   │   ├── ParrotBuddy.tsx
│   │   ├── ParrotGuide.tsx
│   │   ├── SkyBackground.tsx
│   │   ├── StarsBar.tsx
│   │   ├── StarsCounter.tsx
│   │   ├── Train.tsx
│   │   └── TreasureChest.tsx
│   ├── pages/             # Main game pages
│   │   ├── AlphabetTreasureHunt.tsx
│   │   ├── EnglishHome.tsx
│   │   ├── LivingNonLivingSort.tsx
│   │   ├── MathHome.tsx
│   │   ├── NepaliAlphabetMatch.tsx
│   │   ├── NepaliHome.tsx
│   │   ├── NumberTrainRide.tsx
│   │   ├── PhonicsPopBubbles.tsx
│   │   └── ScienceHome.tsx
│   ├── routes/            # Route components
│   │   ├── Home.tsx
│   │   └── Reward.tsx
│   ├── hooks/             # Custom React hooks
│   │   └── useSound.ts
│   ├── state/             # State management
│   │   └── RewardsContext.tsx
│   ├── lib/               # Utility functions
│   │   └── letters.ts
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # App entry point
│   └── index.css          # Global styles
├── dist/                  # Build output
├── package.json           # Project dependencies
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # TailwindCSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🎯 Game Features in Detail

### English Module
1. **Alphabet Treasure Hunt**
   - Interactive drag-and-drop letter recognition
   - Visual feedback with animations
   - Progressive difficulty levels

2. **Phonics Pop Bubbles**
   - Letter sound association
   - Colorful bubble animations
   - Pop sound effects for engagement

### Math Module
1. **Number Train Ride**
   - Number sequencing practice
   - Visual train animations
   - Ascending and descending order challenges

### Science Module
1. **Living vs Non-Living Sort**
   - Classification skills development
   - Interactive drag-and-drop interface
   - Real-world object examples

### Nepali Module
1. **Word & Picture Match**
   - Nepali alphabet recognition
   - Visual word association
   - Cultural learning integration

## 🎨 Design Principles

- **Child-Friendly Interface**: Large, colorful buttons and intuitive navigation
- **Responsive Design**: Works on tablets, desktops, and mobile devices
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Engaging Animations**: Smooth transitions and micro-interactions
- **Positive Reinforcement**: Immediate feedback and celebration effects

## 🔊 Audio Features

- **Sound Effects**: Pop, cheer, and boing sounds for game interactions
- **Fallback Audio**: Web Audio API synthesis when audio files are unavailable
- **Mute Option**: Sound can be toggled on/off for different environments

## 📊 Progress Tracking

### For Students
- Visual star collection system
- Badge achievements display
- Sticker collection gallery
- Progress indicators for each subject

### For Parents & Teachers
- Simple dashboard overview
- Recent activity tracking
- Subject-wise progress display
- Tips for supporting learning

## 🌈 Customization

### Theming
- Color-coded subjects for easy navigation
- Consistent visual language across all modules
- Custom CSS variables for easy theme modifications

### Localization
- Support for multiple languages (English, Nepali)
- Culturally appropriate content and imagery
- Regional educational standards alignment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Notes

### Code Style
- TypeScript for type safety
- ESLint configuration for code quality
- Component-based architecture
- Custom hooks for reusable logic

### Performance
- Lazy loading of components
- Optimized animations with Framer Motion
- Efficient state management
- Minimal bundle size with Vite

## 🐛 Troubleshooting

### Common Issues
- **Sound not working**: Check browser audio permissions and ensure audio files exist in `/public/sfx/`
- **Animations lag**: Ensure GPU acceleration is enabled in browser
- **Build errors**: Clear node_modules and reinstall dependencies

### Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 12+)
- Mobile browsers: Optimized for touch interactions

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Designed for young learners with special attention to educational psychology principles
- Inspired by early childhood education best practices
- Built with love for the next generation of learners

---

**Made with ❤️ for little learners everywhere**
