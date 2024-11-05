function attachComponentScript(link) {
  let script = document.querySelector(`script[src='${link}']`);
  if (script) return;
  script = document.createElement("script");
  script.src = link;
  document.body.appendChild(script);
}
