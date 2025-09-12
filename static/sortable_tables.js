function makeTableSortable(table){
    const headers = table.querySelectorAll('th');
    let sortDirection = false;

    headers.forEach((header, idx) => {
        // Now make them actually clickable
        header.addEventListener('click', (e) => {
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));
            
            headers.forEach(h => h.removeAttribute("data-after"));

            header.setAttribute("data-after", sortDirection ? "\u21BE" : "\u21C2")
            sortDirection = !sortDirection;

            rows.sort((a, b) => {

                if (a.dataset.level !== undefined && b.dataset.level !== undefined) {
                    valA = parseFloat(a.dataset.level);
                    valB = parseFloat(b.dataset.level);
                } else if(header.textContent.trim() === "Upgradable?"){
                    valA = a.children[idx].textContent.trim() === "No" ? 0 : 1
                    valB = b.children[idx].textContent.trim() === "No" ? 0 : 1
                } else {
                    valA = a.children[idx].textContent.trim();
                    valB = b.children[idx].textContent.trim();

                     // Try to parse as number if possible
                    let numA = parseFloat(valA.replace(/[^0-9.-]+/g, ""));
                    let numB = parseFloat(valB.replace(/[^0-9.-]+/g, ""));
                    if (!isNaN(numA) && !isNaN(numB)) {
                        valA = numA;
                        valB = numB;
                    }
                }

                if (valA < valB) return sortDirection ? -1 : 1;
                if (valA > valB) return sortDirection ? 1 : -1;
                return 0;
            });

            // Re-append sorted rows
            rows.forEach(row => tbody.appendChild(row));
        });
    });
}
document.addEventListener("DOMContentLoaded", () =>  {
    let tables = document.getElementsByClassName("sortable-table")
    for(const element of tables){
        makeTableSortable(element)
    }
}
);