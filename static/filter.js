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

function initSubClassFilters(){
    const filterButtons = document.querySelectorAll('.subclass-filter')
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            updateVisibility();
        })
    })
}

function updateVisibility() {
    const spellItems = document.querySelectorAll('.spell-item');
    const activeSourceFilters = Array.from(document.querySelectorAll('.source-filter.active'))
        .map(button => button.dataset.source);
    const activeClassFilters = Array.from(document.querySelectorAll('.class-filter.active'))
        .map(button => button.dataset.class);
    const activeSubclassFilters = Array.from(document.querySelectorAll('.subclass-filter.active'))
        .map(button => button.dataset.subclass);

    spellItems.forEach(item => {
        const itemSource = item.dataset.source;
        const itemClasses = item.dataset.classes.split(' ');
        const itemSubClasses = item.dataset.subclasses.split('9').map(item => item.trim());

        const sourceMatch = activeSourceFilters.includes(itemSource);
        const classMatch = itemClasses.some(cls => activeClassFilters.includes(cls));
        const subClassMatch = itemSubClasses.some(scls => activeSubclassFilters.includes(scls));
        
        if (sourceMatch && (classMatch || subClassMatch)) {
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
    initSubClassFilters();
});