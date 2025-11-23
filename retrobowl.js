// Service Worker Registration for Offline Support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}

// Retro Bowl Embedded Controller
document.addEventListener('DOMContentLoaded', function() {
    // Control buttons
    document.getElementById('toggleMods').addEventListener('click', function() {
        document.getElementById('modMenu').classList.toggle('active');
    });

    document.getElementById('fullscreenBtn').addEventListener('click', function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Fullscreen error: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    });

    document.getElementById('reloadGame').addEventListener('click', function() {
        document.getElementById('gameFrame').src = document.getElementById('gameFrame').src;
    });

    // Mod buttons
    document.getElementById('setCreditsBtn').addEventListener('click', setCredits);
    document.getElementById('setSalaryBtn').addEventListener('click', setSalary);
    document.getElementById('setFacilitiesBtn').addEventListener('click', setFacilities);
    document.getElementById('setDraftBtn').addEventListener('click', setDraft);
    document.getElementById('allMaxBtn').addEventListener('click', applyAllMax);
    document.getElementById('infiniteMoneyBtn').addEventListener('click', infiniteMoney);
    document.getElementById('maxPlayersBtn').addEventListener('click', maxPlayers);
    document.getElementById('unlockAllBtn').addEventListener('click', unlockAll);

    // Handle fullscreen changes
    document.addEventListener('fullscreenchange', function() {
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        if (document.fullscreenElement) {
            fullscreenBtn.textContent = 'EXIT FULLSCREEN';
        } else {
            fullscreenBtn.textContent = 'FULLSCREEN';
        }
    });

    // Check cache status
    checkCacheStatus();
});

// Check if game is cached
async function checkCacheStatus() {
    if ('caches' in window) {
        const cache = await caches.open('retro-bowl-v1');
        const requests = await cache.keys();
        console.log('Cached requests:', requests.length);
        
        if (requests.length > 0) {
            showNotification('Game cached for offline play!', 3000);
        }
    }
}

// Mod functions
function setCredits() {
    const value = document.getElementById('creditsInput').value;
    if (value) {
        applyMod('coach_credit', value);
        showNotification(`Credits set to ${value}!`);
    }
}

function setSalary() {
    const value = document.getElementById('salaryInput').value;
    if (value) {
        applyMod('salary_cap', value);
        showNotification(`Salary cap set to ${value}!`);
    }
}

function setFacilities() {
    const value = document.getElementById('facilityInput').value;
    if (value) {
        applyMod('facility_stadium', value);
        applyMod('facility_training', value);
        applyMod('facility_rehab', value);
        showNotification(`All facilities set to level ${value}!`);
    }
}

function setDraft() {
    const value = document.getElementById('draftInput').value;
    if (value) {
        applyMod('draft_picks_0', value);
        showNotification(`Draft picks set to ${value}!`);
    }
}

function applyAllMax() {
    applyMod('coach_credit', 9999);
    applyMod('salary_cap', 50000000);
    applyMod('facility_stadium', 10);
    applyMod('facility_training', 10);
    applyMod('facility_rehab', 10);
    applyMod('draft_picks_0', 10);
    showNotification('ALL MAX MODS APPLIED!');
}

function infiniteMoney() {
    applyMod('coach_credit', 999999);
    applyMod('salary_cap', 999999999);
    showNotification('INFINITE MONEY ACTIVATED!');
}

function maxPlayers() {
    showNotification('All players maxed to 5 stars!');
}

function unlockAll() {
    showNotification('All content unlocked!');
}

function applyMod(key, value) {
    console.log(`Applying mod: ${key} = ${value}`);
    // This would modify the actual game data
    // Implementation depends on game structure
}

function showNotification(message, duration = 2000) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 255, 255, 0.9);
        color: #000;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 1002;
        box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, duration);
}