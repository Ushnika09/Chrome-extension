# 🎯 Tab Title Picker - Chrome Extension

A beautiful, minimal Chrome extension that lets you grab the current tab's title with one click.

![Extension Preview](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🎨 **Beautiful gradient UI** with smooth animations
- ⚡ **One-click** tab title extraction
- 📋 **Copy to clipboard** functionality
- 🎯 **Minimal and fast** - no bloat
- 🌈 **Modern design** with glassmorphism effects
- ⌨️ Keyboard shortcut - Ctrl+Shift+T (Windows/Linux) or Cmd+Shift+T (Mac)
- 📝 History tracking - Saves last 10 extracted tabs
- 🌙 Dark mode - Toggle between light and dark themes
- 💾 Export to CSV - Export your entire history
- ⚙️ Customizable settings - Choose what info to display (Title/URL/Both)

## 📸 Screenshots

[Add your screenshots here after recording]

## 🚀 Installation

### From Source

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/tab-title-picker-extension.git
   cd tab-title-picker-extension
   ```

2. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **Developer mode** (toggle in top-right corner)
   - Click **Load unpacked**
   - Select the extension folder
   - Done! The extension icon will appear in your toolbar

## 📁 Project Structure

```
tab-title-picker-extension/
├── manifest.json          # Extension configuration
├── popup.html            # UI structure
├── popup.js              # Main functionality
├── styles.css            # Styling and animations
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

## 💻 How It Works

The extension uses Chrome's `tabs` API to:
1. Query the currently active tab
2. Extract the tab's title
3. Display it in a beautiful popup
4. Allow copying with one click

```javascript
// Core functionality
const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
titleText.textContent = tab.title;
```

## 🎨 Customization

### Change Color Scheme

Edit `styles.css` to customize colors:

```css
/* Change gradient colors */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Change accent color */
color: #667eea;
```

### Modify Button Text

Edit `popup.html`:

```html
<button id="getTitle" class="btn">
  Your Custom Text Here
</button>
```

## 🛠️ Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with animations
- **JavaScript (ES6+)** - Functionality
- **Chrome Extensions API** - Tab management

## 📝 Permissions

The extension requires:
- `activeTab` - To read the current tab's title

No data is collected or sent anywhere. Everything happens locally.



## 👤 Author

**My Name**
- GitHub: [@your_username](https://github.com/Ushnika09)
- LinkedIn: [Your Profile](https://www.linkedin.com/in/ushnika-kar-32246a36a/)

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Made with ❤️ and Chrome Extensions API**
