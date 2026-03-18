document.addEventListener("DOMContentLoaded", () => {
  const toggleInput = document.querySelector(".toggle input");
  const rootElement = document.documentElement;

  const applyTheme = (isDark) => {
    if (isDark) {
      rootElement.classList.remove("theme-latte");
      rootElement.classList.add("theme-mocha");
    } else {
      rootElement.classList.remove("theme-mocha");
      rootElement.classList.add("theme-latte");
    }
  };
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const savedTheme = localStorage.getItem("theme");
  const currentTheme =
    savedTheme !== null ? savedTheme === "theme-mocha" : prefersDark;

  toggleInput.checked = currentTheme;
  applyTheme(currentTheme);

  toggleInput.addEventListener("input", (event) => {
    const darkPreferance = toggleInput.checked ? "theme-mocha" : "theme-latte";
    localStorage.setItem("theme", darkPreferance);
    applyTheme(toggleInput.checked);
  });
});
