function close_nav(){
    const nav = [...document.querySelectorAll(".nav-dropdown")]
    document.addEventListener("click", (e) => {
        if(nav.some(f => f.contains(e.target)).length != 0){
            nav.forEach(f => {
                    f.removeAttribute("Open")
            });
        }
    })
}

document.addEventListener("DOMContentLoaded", close_nav)

function exit_preload(){
    setTimeout(() => {document.body.className = ""}, 1000)
}

document.addEventListener("DOMContentLoaded", exit_preload)