const main = document.getElementsByTagName("main")[0];

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

window.addEventListener("click", (e) => {
  const element = e.target;
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

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(res);
    }
    loadCSS(cssUrl);

    const html = await res.text();
    main.innerHTML = html;

    loadJS(jsUrl);
  } catch (err) {
    console.error("Error loading page:", err);
  }
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
