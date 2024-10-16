async function InitHomePage() {
  const homeReadingLink = document.getElementById("home-reading-link");

  const btnElm = await loadComponent("white-button");
  homeReadingLink.innerHTML = btnElm;

  if (homeReadingLink.children.length > 0) {
    const button = homeReadingLink.children[0];
    button.innerText = "Start Reading";
  }
}

InitHomePage();
