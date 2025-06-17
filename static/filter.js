function initSourceFilters() {
    const filterButtons = document.querySelectorAll('.source-filter');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            updateVisibility();
        });
    });
}

function initClassFilters() {
    const filterButtons = document.querySelectorAll('.class-filter');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            updateVisibility();
        });
    });
}

function updateVisibility() {
    const spellItems = document.querySelectorAll('.spell-item');
    const activeSourceFilters = Array.from(document.querySelectorAll('.source-filter.active'))
        .map(button => button.dataset.source);
    const activeClassFilters = Array.from(document.querySelectorAll('.class-filter.active'))
        .map(button => button.dataset.class);

    spellItems.forEach(item => {
        const itemSource = item.dataset.source;
        const itemClasses = item.dataset.classes.split(' ');
        
        const sourceMatch = activeSourceFilters.includes(itemSource);
        const classMatch = itemClasses.some(cls => activeClassFilters.includes(cls));
        
        if (sourceMatch && classMatch) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

// Initialize filters when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSourceFilters();
    initClassFilters();
});