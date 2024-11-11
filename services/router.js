const main = document.getElementsByTagName("main")[0];
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
  } else if (element.parentElement.tagName === "A") {
    e.preventDefault();
    const url = new URL(element.parentElement.href);
    if (window.location.pathname === url.pathname) return;
    loadPage(url.pathname);
  }
});

async function loadPage(page) {
  history.pushState(page, null, page);

  const pageName = page === "/" ? "home" : page.split("/")[1];
  const filepath = `pages/${pageName}/${pageName}`;
  const url = `${filepath}.html`;
  const cssUrl = `${filepath}.css`;
  const jsUrl = `${filepath}.js`;

  loader.progress = 30;

  try {
    loadCSS(cssUrl);

    const res = await fetch(url);
    loader.progress = 70;
    if (!res.ok) {
      throw new Error(res);
    }

    const html = await res.text();
    main.innerHTML = html;

    loader.progress = 90;

    loadJS(jsUrl);

    loader.progress = 95;
  } catch (err) {
    console.error("Error loading page:", err);
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function loadJS(url) {
  const existingJSScripts = document.querySelector(`script[src="${url}"]`);
  if (existingJSScripts) existingJSScripts.remove();
  const script = document.createElement("script");
  script.src = url;
  document.body.appendChild(script);
}

function loadCSS(url) {
  const existingCssLink = document.querySelector(
    `link[rel="stylesheet"][href="${url}"]`,
  );
  if (existingCssLink) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}
