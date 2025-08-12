# 🧘 Hamro Meditation Timer

A beautiful, feature-rich meditation timer built with Nuxt.js and Vue 3. This
application provides a peaceful environment for meditation practice with
customizable timers, guided instructions, ambient sounds, and comprehensive
statistics tracking.

![Meditation Timer](public/images/og-image.jpg)

## ✨ Features

### 🕐 Timer Functionality

- **Multiple Preset Durations**: Quick access to 10 minutes, 30 minutes, and 1
  hour sessions
- **Custom Duration**: Add extra time to any preset with the "Add +" buttons
- **Interval Bell**: Optional bell chiming at the halfway point of your session
- **Ending Bell with Timer**: Configurable bell that rings when your meditation
  session ends, with customizable duration and sound selection
- **Large, Clear Display**: Easy-to-read timer with responsive design

### 🎵 Audio Options

- **Start/End Bell Sounds**: Choose from 4 different gong sounds to mark the
  beginning and end of your session
- **Ending Bell Configuration**:
  - Set custom duration for how long the ending bell rings (e.g., 10 seconds, 30
    seconds, 1 minute)
  - Choose from multiple bell sound options (Gong 1-4, or S.N. Goenka bell)
  - Independent volume control for ending bell
  - Option to disable ending bell completely
- **Guided Meditation**:
  - English (Goenka method)
  - Hindi instructions
  - Nepali instructions
  - Custom audio file support
- **Background Sounds**:
  - Forest with Birds
  - Water in Stream
  - River with Birds
  - Birds only

### 📊 Statistics & Progress Tracking

- **Comprehensive Analytics**: Track total sessions, total time, and average
  duration
- **Streak Counter**: Monitor your daily meditation consistency
- **Weekly Activity Chart**: Visual representation of your meditation habits
- **Time of Day Analysis**: See when you meditate most often (Morning,
  Afternoon, Evening, Night)
- **Recent Session History**: Quick overview of your last 5 meditation sessions
- **Data Export/Import**: Backup and restore your meditation data

### 🎨 User Experience

- **Beautiful Gradient Themes**: Dynamic color themes that change with
  inspirational quotes
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **No Sleep Mode**: Prevents device from sleeping during meditation sessions
- **Battery Indicator**: Shows device battery level
- **Inspirational Quotes**: Rotating collection of wisdom from Buddhist teachers
  and meditation masters
- **Smooth Animations**: Elegant transitions and hover effects

### 🔧 Technical Features

- **PWA Ready**: Can be installed as a progressive web app
- **Offline Support**: Works without internet connection
- **Local Storage**: All data stored locally on your device
- **Custom Audio Upload**: Support for personal guided meditation files
- **Cache Management**: Built-in cache reset functionality

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/samanshakya/hamro-meditation-timer.git
   cd hamro-meditation-timer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

### Production Deployment

```bash
# Build for production
npm run build

# Start production server
npm run start

# Generate static files (for static hosting)
npm run generate
```

## 🎯 How to Use

### Basic Meditation Session

1. Choose your preferred duration (10 min, 30 min, or 1 hour)
2. Optionally enable interval bell for halfway reminder
3. Select your preferred bell sound
4. Press the play button to start your session
5. Press the stop button to end early, or let it complete naturally

### Adding Audio Options

1. Click the settings icon (⚙️) in the top right
2. **For Guided Meditation**:
   - Toggle "Guided Meditation" on
   - Select your preferred language
   - For custom audio: choose "Custom Audio" and upload your file
3. **For Background Sounds**:
   - Toggle "Background Sounds" on
   - Select from nature sounds available

### Viewing Statistics

1. Click the statistics icon (📊) in the top right
2. View your meditation progress, streaks, and patterns
3. Export your data for backup or import previous data

## 🛠️ Technical Stack

- **Framework**: [Nuxt.js 4](https://nuxt.com/) - Vue.js meta-framework
- **Frontend**: [Vue 3](https://vuejs.org/) with Composition API
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS
  framework
- **Fonts**: [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
- **Build Tool**: Nuxt's built-in Vite-based build system
- **Data Storage**: Browser LocalStorage and IndexedDB (for audio files)
- **PWA Features**: NoSleep.js for preventing device sleep

## 📁 Project Structure

```
meditationtimer/
├── assets/              # Uncompiled assets
│   ├── css/            # Stylesheets
│   ├── data/           # Application data (quotes)
│   └── fonts/          # SVG icon definitions
├── components/         # Vue components
│   ├── Battery.vue     # Battery level indicator
│   ├── Settings.vue    # Settings panel
│   ├── Statistics.vue  # Statistics and analytics
│   └── SvgIcons.vue   # SVG icon symbols
├── pages/             # Application pages
│   └── index.vue      # Main meditation timer page
├── public/            # Static assets
│   ├── media/         # Audio files
│   │   ├── bell/      # Bell sounds
│   │   ├── instructions/ # Guided meditation audio
│   │   └── sounds/    # Background nature sounds
│   └── images/        # Image assets
└── nuxt.config.ts     # Nuxt configuration
```

## 🎨 Customization

### Adding New Bell Sounds

1. Add your audio file to `public/media/bell/`
2. Update the bell sound list in the main component's
   `presetsList.bellSound.list`

### Adding Background Sounds

1. Add your audio file to `public/media/sounds/nature/`
2. Update the background sound list in `presetsList.backgroundSound.sound`

### Adding Guided Instructions

1. Add your audio file to `public/media/instructions/anapana/`
2. Update the language list in `presetsList.guidedInstruction.language`

## 🌟 Features in Detail

### Timer Presets

- **10 Minutes**: Perfect for beginners or quick sessions
- **30 Minutes**: Standard meditation length
- **1 Hour**: Extended practice sessions
- **Custom Duration**: Add extra time in increments (5, 15, or 30 minutes)

### Audio Experience

- **High Quality**: All audio files optimized for meditation
- **Multiple Formats**: Support for various audio formats
- **Custom Upload**: Upload your own guided meditations
- **Loop Support**: Background sounds automatically loop

### Data Privacy

- **Local Only**: All data stays on your device
- **No Tracking**: No analytics or user tracking
- **Export Control**: Full control over your meditation data

## 🤝 Contributing

We welcome contributions from the meditation and developer communities! This
project was created with love by [Saman Shakya](https://saman.com.np), and we'd
love your help to make it even better.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Add features, fix bugs, or improve documentation
4. **Test thoroughly**: Ensure your changes work across different devices
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**: Describe your changes and their benefits

### Types of Contributions Welcome

- 🐛 **Bug fixes**: Help us improve stability and user experience
- ✨ **New features**: Add meditation techniques, audio options, or analytics
- 🎨 **UI/UX improvements**: Make the interface more beautiful and intuitive
- 🌐 **Translations**: Help make meditation accessible in more languages
- 📚 **Documentation**: Improve guides, add tutorials, or clarify instructions
- 🎵 **Audio content**: Contribute guided meditations or nature sounds
- 🧪 **Testing**: Help test on different devices and browsers

### Development Guidelines

- Keep the code clean and well-commented
- Follow Vue.js and Nuxt.js best practices
- Maintain the peaceful, mindful aesthetic
- Ensure accessibility for all users
- Test on mobile and desktop devices
- Respect the meditation theme and purpose

### Audio Contributions

If contributing audio content:

- Use high-quality recordings (minimum 128kbps)
- Keep background noise minimal
- Follow meditation best practices
- Ensure you have rights to share the content
- Consider different meditation traditions and approaches

### Community Guidelines

- Be respectful and mindful in all interactions
- Focus on creating a peaceful, inclusive environment
- Share constructive feedback and suggestions
- Help fellow contributors and users
- Embrace the spirit of mindfulness and compassion

## 💬 Community & Support

- **Issues**: Report bugs or request features via GitHub Issues
- **Discussions**: Join conversations about meditation and development
- **Facebook Group**:
  [Join our meditation community](https://www.facebook.com/groups/1664234698303384)
- **Contact**: Reach out via [Messenger](http://m.me/61565128987107)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details. This means you can freely use, modify, and distribute this software
while maintaining the original copyright notice.

## 🙏 Acknowledgments

- Meditation instructions and philosophy inspired by the Vipassana tradition
- Audio samples from various meditation teachers and nature recordings
- Icons and design elements crafted for mindful experiences
- Special thanks to the meditation community for inspiration and feedback

---

**May all beings be happy! 🙏😊**

_"The present moment is the only time over which we have dominion." - Thich Nhat
Hanh_
