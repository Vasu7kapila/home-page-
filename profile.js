document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('activityGrid');
    
    // Create 28 days (4 weeks) for the heatmap
    for (let i = 0; i < 28; i++) {
        const box = document.createElement('div');
        box.classList.add('day-box');
        
        // Simulate random question activity
        const weight = Math.random();
        
        if (weight > 0.8) {
            box.classList.add('lvl-3'); // Busy day (8+ questions)
        } else if (weight > 0.5) {
            box.classList.add('lvl-2'); // Normal day (4-7 questions)
        } else if (weight > 0.2) {
            box.classList.add('lvl-1'); // Light day (1-3 questions)
        }
        
        grid.appendChild(box);
    }
});

// Icon Refresh for Lucide
if (window.lucide) {
    lucide.createIcons();
}