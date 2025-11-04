// Get DOM elements
const getTitleBtn = document.getElementById('getTitle');
const resultDiv = document.getElementById('result');
const titleText = document.getElementById('titleText');
const copyBtn = document.getElementById('copyBtn');

// Get tab title when button is clicked
getTitleBtn.addEventListener('click', async () => {
  try {
    // Query the active tab in the current window
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Display the title
    if (tab && tab.title) {
      titleText.textContent = tab.title;
      resultDiv.classList.remove('hidden');
      
      // Add a subtle animation effect
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
    
    // Visual feedback
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