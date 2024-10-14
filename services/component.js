async function loadComponent(component) {
  const filepath = `components/${component}/${component}`;
  const url = `${filepath}.html`;
  const jsUrl = `${filepath}.js`;
  const cssUrl = `${filepath}.css`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(res);
    }
    loadCSS(cssUrl);
    const html = await res.text();
    loadJS(jsUrl);
    return html;
  } catch (error) {
    console.error(error);
    return "";
  }
}
