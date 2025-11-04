# 🎯 Tab Title Picker - Chrome Extension

A beautiful, minimal Chrome extension that lets you grab the current tab's title with one click.

![Loom video](https://www.loom.com/share/7380821ac36f44e1bfc34ece742a9d17)

## ✨ Features

- 🎨 **Beautiful gradient UI** with smooth animations
- ⚡ **One-click** tab title extraction
- 📋 **Copy to clipboard** functionality
- 🎯 **Minimal and fast** - no bloat
- 🌈 **Modern design** with glassmorphism effects
- ⌨️ **Keyboard shortcut** - Ctrl+Shift+T (Windows/Linux) or Cmd+Shift+T (Mac)
- 📝 **History tracking** - Saves last 10 extracted tabs
- 🌙 **Dark mode** - Toggle between light and dark themes
- 💾 **Export to CSV** - Export your entire history
- ⚙️ **Customizable settings** - Choose what info to display (Title/URL/Both)

## 📸 Screenshots

## 📸 Screenshots

![Popup View](./assets/image1.png)
![Dark Mode](./assets/image.png)


## 🚀 Installation

### From Source

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ushnika09/Chrome-extension.git
   cd Chrome-extension
   ```

2. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **Developer mode** (toggle in top-right corner)
   - Click **Load unpacked**
   - Select the extension folder
   - Done! The extension icon will appear in your toolbar

## 📁 Project Structure

```
chrome-extension/
│
├── manifest.json           # Extension configuration & permissions
├── popup.html             # Main popup UI
├── popup.js               # Main popup functionality
├── styles.css             # All styles (popup + dark mode)
├── README.md              # Documentation
│
└── icons/                 # Extension icons
    ├── icons-16.png         # 16x16 icon
    ├── icons-48.png         # 48x48 icon
    └── icons-128.png        # 128x128 icon
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

---

**Made with ❤️ and Chrome Extensions API**
