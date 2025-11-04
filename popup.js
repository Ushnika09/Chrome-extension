// Get DOM elements
const getTitleBtn = document.getElementById('getTitle');
const resultDiv = document.getElementById('result');
const titleText = document.getElementById('titleText');
const copyBtn = document.getElementById('copyBtn');
const exportBtn = document.getElementById('exportBtn');
const historyDiv = document.getElementById('history');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistory');
const darkModeToggle = document.getElementById('darkModeToggle');
const settingsBtn = document.getElementById('settingsBtn');

// Load settings
let settings = {
  format: 'both', // 'title', 'url', 'both'
  darkMode: false
};

// Initialize
chrome.storage.sync.get(['settings', 'darkMode'], (data) => {
  if (data.settings) {
    settings = data.settings;
  }
  if (data.darkMode) {
    document.body.classList.add('dark-mode');
  }
});

// Load and display history
function loadHistory() {
  chrome.storage.local.get(['titleHistory'], (data) => {
    const history = data.titleHistory || [];
    if (history.length > 0) {
      historyDiv.classList.remove('hidden');
      historyList.innerHTML = '';
      
      history.forEach((item, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        const titleLine = document.createElement('div');
        titleLine.textContent = item.title.substring(0, 50) + (item.title.length > 50 ? '...' : '');
        
        const timestamp = document.createElement('div');
        timestamp.className = 'history-timestamp';
        timestamp.textContent = new Date(item.timestamp).toLocaleString();
        
        historyItem.appendChild(titleLine);
        historyItem.appendChild(timestamp);
        
        historyItem.addEventListener('click', () => {
          titleText.textContent = formatTabInfo(item);
          resultDiv.classList.remove('hidden');
        });
        
        historyList.appendChild(historyItem);
      });
    } else {
      historyDiv.classList.add('hidden');
    }
  });
}

// Format tab info based on settings
function formatTabInfo(tab) {
  switch (settings.format) {
    case 'title':
      return tab.title;
    case 'url':
      return tab.url;
    case 'both':
    default:
      return `Title: ${tab.title}\n\nURL: ${tab.url}`;
  }
}

// Get tab title when button is clicked
getTitleBtn.addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (tab && tab.title) {
      const formattedInfo = formatTabInfo(tab);
      titleText.textContent = formattedInfo;
      resultDiv.classList.remove('hidden');
      
      // Save to history
      chrome.storage.local.get(['titleHistory'], (data) => {
        const history = data.titleHistory || [];
        history.unshift({
          title: tab.title,
          url: tab.url,
          timestamp: Date.now()
        });
        
        // Keep last 10 items
        const updatedHistory = history.slice(0, 10);
        chrome.storage.local.set({ titleHistory: updatedHistory }, () => {
          loadHistory();
        });
      });
      
      // Animation effect
      resultDiv.style.animation = 'none';
      setTimeout(() => {
        resultDiv.style.animation = 'slideIn 0.3s ease';
      }, 10);
    }
  } catch (error) {
    console.error('Error getting tab title:', error);
    titleText.textContent = 'Error: Could not get tab title';
    resultDiv.classList.remove('hidden');
  }
});

// Copy title to clipboard
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(titleText.textContent);
    
    const originalText = copyBtn.innerHTML;
    copyBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      Copied!
    `;
    
    setTimeout(() => {
      copyBtn.innerHTML = originalText;
    }, 1500);
  } catch (error) {
    console.error('Error copying to clipboard:', error);
  }
});

// Export to CSV
exportBtn.addEventListener('click', () => {
  chrome.storage.local.get(['titleHistory'], (data) => {
    const history = data.titleHistory || [];
    
    if (history.length === 0) {
      alert('No history to export!');
      return;
    }
    
    // Create CSV content
    let csv = 'Title,URL,Timestamp\n';
    history.forEach(item => {
      const title = item.title.replace(/"/g, '""');
      const url = item.url.replace(/"/g, '""');
      const timestamp = new Date(item.timestamp).toISOString();
      csv += `"${title}","${url}","${timestamp}"\n`;
    });
    
    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tab-history-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    // Visual feedback
    const originalText = exportBtn.innerHTML;
    exportBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      Exported!
    `;
    
    setTimeout(() => {
      exportBtn.innerHTML = originalText;
    }, 1500);
  });
});

// Clear history
clearHistoryBtn.addEventListener('click', () => {
  if (confirm('Clear all history?')) {
    chrome.storage.local.set({ titleHistory: [] }, () => {
      historyDiv.classList.add('hidden');
      historyList.innerHTML = '';
    });
  }
});

// Dark mode toggle
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  chrome.storage.sync.set({ darkMode: isDark });
});


// Load history on startup
loadHistory();