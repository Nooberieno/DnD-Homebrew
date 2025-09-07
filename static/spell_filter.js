function resetFilterButtons(){
    Array.from(['class', 'subclass', 'feat', 'race']).forEach(filterType => {
        document.querySelectorAll(`.${filterType}-filter`).forEach(button => {
            button.classList.remove("active")
        })
    })

    Array.from(['source', 'level']).forEach(filterType => {
        document.querySelectorAll(`.${filterType}-filter`).forEach(button => {
            button.classList.add("active")
        }) 
    })

    updateVisibility()
}

function clearFilterClass(filterClass){
    document.querySelectorAll(`.${filterClass}-filter`).forEach(button => {
        button.classList.remove("active")
    })
}

function addFilterClass(filterClass){
    document.querySelectorAll(`.${filterClass}-filter`).forEach(button => {
        button.classList.add("active")
    })
}

function initFilters(filterClass) {

    const filterButtons = document.querySelectorAll(`.${filterClass}-filter`);
    let previousActiveItems = null

    switch (filterClass) {
        case "subclass":
        case "class":
            previousActiveItems = localStorage.getItem(`${filterClass}es`)
            break;
    
        default:
            previousActiveItems = localStorage.getItem(`${filterClass}s`)
            break;
    }

    let previousActive = false
    if(previousActiveItems){
        previousActive = true
        previousActiveItems = previousActiveItems.split(",")
    }
    filterButtons.forEach(button => {
        if(previousActive && previousActiveItems.includes(button.dataset[filterClass])){
            button.classList.add("active")
        }else if(!previousActive && ["source", "level"].includes(filterClass)){
            button.classList.add("active")
        }
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
    const activeLevelFilters = Array.from(document.querySelectorAll('.level-filter.active'))
        .map(button => button.dataset.level);

    localStorage.setItem("sources", activeSourceFilters)
    localStorage.setItem("classes", activeClassFilters)
    localStorage.setItem("subclasses", activeSubclassFilters)
    localStorage.setItem("feats", activeFeatFilters)
    localStorage.setItem("races", activeRaceFilters)
    localStorage.setItem("levels", activeLevelFilters)

    spellItems.forEach(item => {
        const itemSource = item.dataset.source;
        const itemClasses = item.dataset.classes.split(' ');
        const itemSubclasses = item.dataset.subclasses.split('9').map(item => item.trim());
        const itemFeats = item.dataset.feats.split('9').map(item => item.trim());
        const itemRaces = item.dataset.races.split('9').map(item => item.trim())
        const itemLevel = item.dataset.level

        const sourceMatch = activeSourceFilters.includes(itemSource);
        const classMatch = activeClassFilters.length == 0 || itemClasses.some(cls => activeClassFilters.includes(cls));

        const subclassMatch = itemSubclasses.some(scls => activeSubclassFilters.includes(scls));
        const featMatch = itemFeats.some(ft => activeFeatFilters.includes(ft))
        const raceMatch = itemRaces.some(rc => activeRaceFilters.includes(rc))
        
        const levelMatch = activeLevelFilters.length == 0 || activeLevelFilters.includes(itemLevel)

        const otherSource = subclassMatch || featMatch || raceMatch
        
        if (sourceMatch && (classMatch || otherSource) && levelMatch) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

// Initialize filters when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    ['source', 'class', 'subclass', 'feat', 'race', 'level'].forEach(filterType => {
        initFilters(filterType);
    });

    updateVisibility()

    const popup = document.querySelector(".filters");
    const filterContainer = document.querySelector(".filter-container")
    const filterBtnOpen = document.querySelector(".open-filters")
    const filterBtnClose = document.querySelector(".close-filters")
    const spell_list = document.querySelector(".spell-list")

    // Close popup on outside click
    document.addEventListener("click", (e) => {
    if (!filterContainer.contains(e.target)) {
        popup.classList.remove("show");
        popup.classList.add("hidden");
        filterBtnOpen.classList.remove("active")
        spell_list.classList.remove("view")
    }
    });

    // Open popup with a button
    filterBtnOpen.addEventListener("click", (e) => {
    e.stopPropagation();
        filterBtnOpen.classList.add("active")
        popup.classList.remove("hidden");
        popup.classList.add("show");
        spell_list.classList.add("view")
    });

    // Close popup with a button
    filterBtnClose.addEventListener("click", (e) => {
        e.stopPropagation()
        popup.classList.remove("show")
        popup.classList.add("hidden")
        spell_list.classList.remove("view")
        filterBtnOpen.classList.remove("active")
    })
});