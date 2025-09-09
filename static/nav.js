function close_nav() {
  const nav = [...document.querySelectorAll(".nav-dropdown")];

  document.addEventListener("click", (e) => {
  nav.forEach(f => {
    if (!f.contains(e.target)) {
      f.removeAttribute("open");
    }
  });
});

}

document.addEventListener("DOMContentLoaded", close_nav)

function exit_preload(){
    setTimeout(() => {document.body.className = ""}, 1000)
}

document.addEventListener("DOMContentLoaded", exit_preload)