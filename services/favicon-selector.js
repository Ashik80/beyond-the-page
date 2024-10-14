const faviconLink = document.querySelector('link[rel="icon"]');

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    if (event.matches) {
      faviconLink.href = "assets/favicon-white.png";
    } else {
      faviconLink.href = "assets/favicon-dark.png";
    }
  });

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  faviconLink.href = "assets/favicon-white.png";
} else {
  faviconLink.href = "assets/favicon-dark.png";
}
