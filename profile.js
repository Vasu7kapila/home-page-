document.addEventListener('DOMContentLoaded', () => {
    // 1. GENERATE THE HEATMAP GRID
    const grid = document.getElementById('activityGrid');
    if (grid) {
        // Create 84 boxes (12 weeks * 7 days)
        for (let i = 0; i < 84; i++) {
            const day = document.createElement('div');
            // Randomly assign a brightness level for the "hackathon" look
            const level = Math.floor(Math.random() * 4); 
            day.className = `w-3 h-3 rounded-sm transition-colors duration-500 bg-slate-800`;
            
            // Apply colors based on level
            if (level === 1) day.style.backgroundColor = '#1e3a8a';
            if (level === 2) day.style.backgroundColor = '#2563eb';
            if (level === 3) {
                day.style.backgroundColor = '#60a5fa';
                day.style.boxShadow = '0 0 8px rgba(96, 165, 250, 0.4)';
            }
            
            grid.appendChild(day);
        }
    }

    // 2. LOAD SHARED DATA FROM LOCALSTORAGE
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
        if (document.getElementById("solvedCount")) 
            document.getElementById("solvedCount").innerText = userData.totalSolved;
        
        if (document.getElementById("xpDisplay")) 
            document.getElementById("xpDisplay").innerText = (userData.level * 100) + userData.xp;
            
        if (document.getElementById("levelBadge")) 
            document.getElementById("levelBadge").innerText = `Level ${userData.level}`;
    }
});
