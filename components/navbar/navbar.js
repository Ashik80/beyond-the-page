const appNavbarTemplate = document.createElement("template");
appNavbarTemplate.innerHTML = `
  <style>
    :root {
      #nav-container {
        border-bottom: 1px solid var(--grey);
      }

      #nav-logo {
        width: 15rem;
      }
    }
  </style>
  <nav id="nav-container" class="flex justify-center">
    <div class="container flex justify-between items-center py-2 w-100">
      <a href="/">
        <img id="nav-logo" src="assets/logo-white.png" alt="logo" />
      </a>
      <ul class="list-style-none flex">
        <li class="mr-3"><a href="/">Home</a></li>
        <li class="mr-3"><a href="/blogs">Blogs</a></li>
        <li><a href="/my-thoughts">My Thoughts</a></li>
      </ul>
    </div>
  </nav>
`;

class AppNavbar extends HTMLElement {
  constructor() {
    super();
    this.appendChild(appNavbarTemplate.content.cloneNode(true));
  }
}

customElements.define("app-navbar", AppNavbar);
