const main = document.querySelector("main");
const loader = document.querySelector("app-loader");

window.addEventListener("popstate", (e) => {
  if (e.state) {
    loadPage(e.state);
  } else {
    loadPage("/");
  }
});

window.addEventListener("load", () => {
  loadPage(window.location.pathname);
});

window.addEventListener("nav-link-click", (e) => {
  const url = new URL(e.detail);
  if (window.location.pathname === url.pathname) return;
  loadPage(url.pathname);
});

window.addEventListener("click", (e) => {
  const element = e.target;
  if (element.shadowRoot) {
    e.preventDefault();
  }
  if (element.tagName === "A") {
    e.preventDefault();
    const url = new URL(element.href);
    if (window.location.pathname === url.pathname) return;
    loadPage(url.pathname);
  }
});

async function loadPage(page) {
  history.pushState(page, null, page);

  loader.progress = 30;

  let strippedPath = page === "/" ? "home" : page.split("/")[1];
  const componentName = `${strippedPath}-page`;
  import(`../pages/${strippedPath}/${strippedPath}.js`);

  loader.progress = 70;

  const component = document.createElement(componentName);
  main.replaceChildren(component);

  loader.progress = 95;

  window.scrollTo({ top: 0, behavior: "smooth" });
}
