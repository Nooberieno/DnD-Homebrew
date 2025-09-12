function initFilters(){
    const filterButtons = document.querySelectorAll(".subclass-button")
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active')
            updateVisibility();
        })
    })
}

function updateVisibility(){
    const subclassItems = document.querySelectorAll(".subclass-feature")
    const activeSubclasses = Array.from(document.querySelectorAll(".subclass-button.active"))
        .map(button => button.dataset.subclass)

    subclassItems.forEach(item => {
        const subclass = item.dataset.subclass
    
        if(activeSubclasses.includes(subclass)){
            item.classList.remove('hidden');
        }else{
            item.classList.add("hidden")
        }
    })
}

document.addEventListener('DOMContentLoaded', () => {
    initFilters()
})