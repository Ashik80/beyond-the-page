async function InitHomePage() {
  const scriptExists = document.querySelector(
    "script[src='components/white-button/white-button.js']",
  );
  if (scriptExists) return;

  const script = document.createElement("script");
  script.src = "components/white-button/white-button.js";
  document.body.appendChild(script);
}

InitHomePage();
