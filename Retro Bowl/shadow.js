// S.H.A.D.O.W - Retro Bowl Cracker
(function() {
    'use strict';

    // Prevent multiple injections
    if (window.shadowCrackerLoaded) return;
    window.shadowCrackerLoaded = true;

    // Find the actual save data file
    function findSaveData() {
        const saveKeys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.includes('RetroBowl') && key.includes('savedata') && key.includes('.ini')) {
                saveKeys.push(key);
            }
        }
        return saveKeys.length > 0 ? saveKeys[0] : null;
    }

    const saveKey = findSaveData();
    if (!saveKey) {
        console.log('S.H.A.D.O.W: No Retro Bowl save data found');
        return;
    }

    window.saveData = localStorage.getItem(saveKey);

    // Modification functions
    const addCredits = (count) => {
        const newSave = window.saveData.replace(/coach_credit="[0-9]+"/g, `coach_credit="${count}"`);
        localStorage.setItem(saveKey, newSave);
        window.saveData = newSave;
    }

    const changeSalaryCap = (salary) => {
        const newSave = window.saveData.replace(/salary_cap="[0-9]+"/, `salary_cap="${salary}"`);
        localStorage.setItem(saveKey, newSave);
        window.saveData = newSave;
    }

    const changeDraft = (picks) => {
        const newSave = window.saveData.replace(/draft_picks_0="[0-9]+"/, `draft_picks_0="${picks}"`);
        localStorage.setItem(saveKey, newSave);
        window.saveData = newSave;
    }

    const changeStadiumLvl = (lvl) => {
        let newSave = window.saveData;
        newSave = newSave.replace(/facility_upgraded_stadium="[0-9]+"/, `facility_upgraded_stadium="${lvl}"`);
        newSave = newSave.replace(/facility_stadium="[0-9]+"/, `facility_stadium="${lvl}"`);
        localStorage.setItem(saveKey, newSave);
        window.saveData = newSave;
    }

    const changeTrainingLvl = (lvl) => {
        let newSave = window.saveData;
        newSave = newSave.replace(/facility_upgraded_training="[0-9]+"/, `facility_upgraded_training="${lvl}"`);
        newSave = newSave.replace(/facility_training="[0-9]+"/, `facility_training="${lvl}"`);
        localStorage.setItem(saveKey, newSave);
        window.saveData = newSave;
    }

    const changeRehabLvl = (lvl) => {
        let newSave = window.saveData;
        newSave = newSave.replace(/facility_upgraded_rehab="[0-9]+"/, `facility_upgraded_rehab="${lvl}"`);
        newSave = newSave.replace(/facility_rehab="[0-9]+"/, `facility_rehab="${lvl}"`);
        localStorage.setItem(saveKey, newSave);
        window.saveData = newSave;
    }

    const changeFanSupport = (level) => {
        const newSave = window.saveData.replace(/fan_support="[0-9.]+"/, `fan_support="${level}"`);
        localStorage.setItem(saveKey, newSave);
        window.saveData = newSave;
    }

    const changeMorale = (level) => {
        const newSave = window.saveData.replace(/morale="[0-9.]+"/, `morale="${level}"`);
        localStorage.setItem(saveKey, newSave);
        window.saveData = newSave;
    }

    // Create S.H.A.D.O.W control bar
    const injectCtrlBar = () => {
        const body = document.querySelector("body");
        
        // Remove existing control bar if present
        const existingBar = document.getElementById("shadowCtrlBar");
        if (existingBar) existingBar.remove();

        let div = document.createElement("div");
        div.id = "shadowCtrlBar";
        div.style = `
            background: linear-gradient(135deg, #1a1a2a, #2d1a2a);
            position: fixed;
            z-index: 10000;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 20px;
            border-radius: 15px;
            border: 2px solid #ff00ff;
            box-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
            display: flex;
            gap: 10px;
            align-items: center;
            font-family: 'Courier New', monospace;
            backdrop-filter: blur(10px);
        `;
        
        // Add S.H.A.D.O.W title
        const title = document.createElement("div");
        title.style = `
            color: #00ffff;
            font-weight: bold;
            font-size: 14px;
            margin-right: 15px;
            text-shadow: 0 0 10px #00ffff;
        `;
        title.textContent = "S.H.A.D.O.W";
        div.appendChild(title);
        
        body.appendChild(div);
        return div;
    }

    // Create stylish buttons
    const createShadowButton = (text, color = '#00ffff') => {
        const btn = document.createElement("button");
        btn.style = `
            background: rgba(0, 0, 0, 0.7);
            color: ${color};
            border: 1px solid ${color};
            padding: 8px 12px;
            border-radius: 8px;
            cursor: pointer;
            font-family: 'Courier New', monospace;
            font-size: 11px;
            font-weight: bold;
            transition: all 0.3s;
            text-shadow: 0 0 5px ${color};
        `;
        btn.textContent = text;
        
        btn.addEventListener('mouseenter', () => {
            btn.style.background = color;
            btn.style.color = '#000';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.background = 'rgba(0, 0, 0, 0.7)';
            btn.style.color = color;
        });
        
        return btn;
    }

    const injectCreditsBtn = () => {
        const ctrlBar = document.querySelector("#shadowCtrlBar");
        let btn = createShadowButton("S.H.A.D.O.W Credits", "#00ff00");
        ctrlBar.appendChild(btn);

        btn.addEventListener("click", () => {
            const newCreditCount = window.prompt("S.H.A.D.O.W Credits - How many credits would you like?");
            if (!isNaN(newCreditCount)) {
                addCredits(newCreditCount);
                showShadowNotification(`S.H.A.D.O.W Credits set to ${newCreditCount}! Reloading...`, '#00ff00');
                setTimeout(() => window.location.reload(), 1500);
            }
        });
    }

    const injectSalaryBtn = () => {
        const ctrlBar = document.querySelector("#shadowCtrlBar");
        let btn = createShadowButton("Salary Cap", "#00ffff");
        ctrlBar.appendChild(btn);

        btn.addEventListener("click", () => {
            const newSalary = window.prompt("S.H.A.D.O.W Salary - What would you like your new salary cap to be?");
            if (!isNaN(newSalary)) {
                changeSalaryCap(newSalary);
                showShadowNotification(`Salary cap set to ${newSalary}! Reloading...`, '#00ffff');
                setTimeout(() => window.location.reload(), 1500);
            }
        });
    }

    const injectDraftBtn = () => {
        const ctrlBar = document.querySelector("#shadowCtrlBar");
        let btn = createShadowButton("Draft Picks", "#ffff00");
        ctrlBar.appendChild(btn);

        btn.addEventListener("click", () => {
            const newDraft = window.prompt("S.H.A.D.O.W Draft - How many 1st round draft picks would you like?");
            if (!isNaN(newDraft)) {
                changeDraft(newDraft);
                showShadowNotification(`Draft picks set to ${newDraft}! Reloading...`, '#ffff00');
                setTimeout(() => window.location.reload(), 1500);
            }
        });
    }

    const injectStadiumBtn = () => {
        const ctrlBar = document.querySelector("#shadowCtrlBar");
        let btn = createShadowButton("Stadium Level", "#ff00ff");
        ctrlBar.appendChild(btn);

        btn.addEventListener("click", () => {
            const newLvl = window.prompt("S.H.A.D.O.W Stadium - What level stadium do you want (0-10)?");
            if (!isNaN(newLvl)) {
                changeStadiumLvl(newLvl);
                showShadowNotification(`Stadium set to level ${newLvl}! Reloading...`, '#ff00ff');
                setTimeout(() => window.location.reload(), 1500);
            }
        });
    }

    const injectTrainingBtn = () => {
        const ctrlBar = document.querySelector("#shadowCtrlBar");
        let btn = createShadowButton("Training Facility", "#ff9900");
        ctrlBar.appendChild(btn);

        btn.addEventListener("click", () => {
            const newLvl = window.prompt("S.H.A.D.O.W Training - What level training facilities do you want (0-10)?");
            if (!isNaN(newLvl)) {
                changeTrainingLvl(newLvl);
                showShadowNotification(`Training facility set to level ${newLvl}! Reloading...`, '#ff9900');
                setTimeout(() => window.location.reload(), 1500);
            }
        });
    }

    const injectRehabBtn = () => {
        const ctrlBar = document.querySelector("#shadowCtrlBar");
        let btn = createShadowButton("Rehab Facility", "#ff4444");
        ctrlBar.appendChild(btn);

        btn.addEventListener("click", () => {
            const newLvl = window.prompt("S.H.A.D.O.W Rehab - What level rehab facilities do you want (0-10)?");
            if (!isNaN(newLvl)) {
                changeRehabLvl(newLvl);
                showShadowNotification(`Rehab facility set to level ${newLvl}! Reloading...`, '#ff4444');
                setTimeout(() => window.location.reload(), 1500);
            }
        });
    }

    const injectAllMaxBtn = () => {
        const ctrlBar = document.querySelector("#shadowCtrlBar");
        let btn = createShadowButton("ALL MAX", "#00ff00");
        btn.style.background = 'linear-gradient(45deg, #00ff00, #009900)';
        btn.style.color = '#000';
        btn.style.border = 'none';
        ctrlBar.appendChild(btn);

        btn.addEventListener("click", () => {
            if (confirm("S.H.A.D.O.W ALL MAX - Apply all maximum modifications?")) {
                addCredits(9999);
                changeSalaryCap(50000000);
                changeDraft(10);
                changeStadiumLvl(10);
                changeTrainingLvl(10);
                changeRehabLvl(10);
                changeFanSupport(100);
                changeMorale(100);
                showShadowNotification('S.H.A.D.O.W ALL MAX ACTIVATED! Reloading...', '#00ff00');
                setTimeout(() => window.location.reload(), 1500);
            }
        });
    }

    const injectInfoBtn = () => {
        const ctrlBar = document.querySelector("#shadowCtrlBar");
        let btn = createShadowButton("Info", "#888");
        ctrlBar.appendChild(btn);

        btn.addEventListener("click", () => {
            alert(`S.H.A.D.O.W - Retro Bowl Cracker v2.0

🔮 Secret Hacking Algorithm for Digital Operations & Warfare

Features:
• S.H.A.D.O.W Credits System
• Unlimited Salary Cap
• Draft Pick Control
• Facility Management
• And much more...

Status: ACTIVE
Mode: STEALTH
`);
        });
    }

    // Notification system
    const showShadowNotification = (message, color = '#00ffff') => {
        const notification = document.createElement('div');
        notification.style = `
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.9);
            color: ${color};
            padding: 15px 25px;
            border-radius: 10px;
            border: 2px solid ${color};
            z-index: 10001;
            font-family: 'Courier New', monospace;
            font-weight: bold;
            text-align: center;
            box-shadow: 0 0 20px ${color}80;
            backdrop-filter: blur(10px);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    // Initialize S.H.A.D.O.W system
    const methods = {
        ctrlBar: injectCtrlBar(),
        credits: injectCreditsBtn(),
        salary: injectSalaryBtn(),
        draft: injectDraftBtn(),
        stadium: injectStadiumBtn(),
        training: injectTrainingBtn(),
        rehab: injectRehabBtn(),
        allMax: injectAllMaxBtn(),
        info: injectInfoBtn()
    }

    console.log('🔮 S.H.A.D.O.W system activated');
    showShadowNotification('S.H.A.D.O.W system online', '#00ffff');

})();