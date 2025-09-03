function initFilters(filterClass) {
    const filterButtons = document.querySelectorAll(`.${filterClass}-filter`);
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
    const activeSubclassFilters = Array.from(document.querySelectorAll('.subclass-filter.active'))
        .map(button => button.dataset.subclass);
    const activeFeatFilters = Array.from(document.querySelectorAll('.feat-filter.active'))
        .map(button => button.dataset.feat);
    const activeRaceFilters = Array.from(document.querySelectorAll('.race-filter.active'))
        .map(button => button.dataset.race);
    const activeLangFilters = Array.from(document.querySelectorAll('.lang-filter.active'))
        .map(button => button.dataset.language);

    spellItems.forEach(item => {
        const itemSource = item.dataset.source;
        const itemClasses = item.dataset.classes.split(' ');
        const itemSubclasses = item.dataset.subclasses.split('9').map(item => item.trim());
        const itemFeats = item.dataset.feats.split('9').map(item => item.trim());
        const itemRaces = item.dataset.races.split('9').map(item => item.trim())
        const itemLang = item.dataset.language.split(' ').map(item => item.trim())

        const sourceMatch = activeSourceFilters.includes(itemSource);
        const classMatch = itemClasses.some(cls => activeClassFilters.includes(cls));

        const subclassMatch = itemSubclasses.some(scls => activeSubclassFilters.includes(scls));
        const featMatch = itemFeats.some(ft => activeFeatFilters.includes(ft))
        const raceMatch = itemRaces.some(rc => activeRaceFilters.includes(rc))
        
        const langMatch = item.dataset.language ? itemLang.some(lang => activeLangFilters.includes(lang)) : true

        const otherSource = subclassMatch || featMatch || raceMatch
        
        if (sourceMatch && (classMatch || otherSource) && langMatch) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

// Initialize filters when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    ['source', 'class', 'subclass', 'feat', 'race', 'lang'].forEach(filterType => {
        initFilters(filterType);
    });
});