const appNavbarTemplate = document.createElement("template");
appNavbarTemplate.innerHTML = `
  <style>
    :root {
      --text: #ffffff;
      --grey: #3c3d37;
      --max-container-width: 1192px;
    }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    .w-100 {
      width: 100%;
    }
    .hidden {
      display: none;
    }
    .flex {
      display: flex;
    }
    .justify-center {
      justify-content: center;
    }
    .justify-between {
      justify-content: space-between;
    }
    .items-center {
      align-items: center;
    }
    .list-style-none {
      list-style: none;
    }
    .mr-3 {
      margin-right: 3rem;
    }
    .text-center {
      text-align: center;
    }
    a {
      color: var(--text);
    }
    .container {
      width: 85%;
      max-width: var(--max-container-width);
    }
    @media (min-width: 640px) {
      .container {
        width: 100%;
      }
    }

    #navbar {
      border-bottom: 1px solid var(--grey);
      padding: 1rem 0;
    }
    #logo img {
      width: 11rem;
    }
    #hamburger-menu {
      background-color: transparent;
      color: var(--text);
      overflow: hidden;
    }
    #hamburger-menu img {
      height: 1.5rem;
    }
    #desktop-items {
      display: none;
    }
    #phone-items {
      margin-top: 2rem;
      transition: display 2s ease-in;
    }

    @media (min-width: 640px) {
      nav {
        padding: 1rem 0;
      }
      #logo img {
        width: 15rem;
      }
      #hamburger-menu {
        display: none;
      }
      #hamburger-menu img {
        height: 2rem;
      }
      #desktop-items {
        display: flex;
      }
    }
  </style>
  <div id="navbar">
    <nav class="flex justify-center">
      <div class="container flex justify-between items-center">
        <a id="logo" href="/">
          <img src="assets/logo-white.png" alt="logo" />
        </a>
        <ul id="desktop-items" class="list-style-none">
          <li class="mr-3"><a href="/">Home</a></li>
          <li class="mr-3"><a href="/blogs">Blogs</a></li>
          <li><a href="/my-thoughts">My Thoughts</a></li>
        </ul>
        <div id="hamburger-menu">
          <img src="/assets/hamburger-menu-icon.svg" alt="nav-menu" />
        </div>
      </div>
    </nav>
    <div id="phone-items" class="hidden w-100 justify-center mt-2">
      <ul class="list-style-none">
        <li class="text-center"><a href="/">Home</a></li>
        <li class="text-center"><a href="/blogs">Blogs</a></li>
        <li class="text-center"><a href="/my-thoughts">My Thoughts</a></li>
      </ul>
    </div>
  </div>
`;

class AppNavbar extends HTMLElement {
  constructor() {
    super();
    this._opened = false;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(appNavbarTemplate.content.cloneNode(true));
  }

  /**
   * @param {boolean} val
   */
  set opened(val) {
    if (val) {
      this.phoneItems.classList.add("flex");
      this.phoneItems.classList.remove("hidden");
      this._opened = val;
    } else {
      this.phoneItems.classList.add("hidden");
      this.phoneItems.classList.remove("flex");
      this._opened = val;
    }
  }
  get opened() {
    return this._opened;
  }

  connectedCallback() {
    this.button = this.shadowRoot.querySelector("#hamburger-menu");
    this.phoneItems = this.shadowRoot.querySelector("#phone-items");
    this.phoneItemLinks = this.phoneItems.querySelectorAll("a");

    this.allLinks = this.shadowRoot.querySelectorAll("a");
    for (const link of this.allLinks) {
      link.addEventListener(
        "click",
        this.dispatchLinkClickEvent.bind(this, link),
      );
    }

    this.button.addEventListener("click", this.onMenuBtnClick.bind(this));
    for (const link of this.phoneItemLinks) {
      link.addEventListener("click", this.closeMenuOnClick.bind(this));
    }
  }

  dispatchLinkClickEvent(link) {
    const ev = new CustomEvent("nav-link-click", {
      detail: link.href,
      bubbles: true,
    });
    this.dispatchEvent(ev);
  }

  disconnectedCallback() {
    this.button.removeEventListener("click", this.onMenuBtnClick.bind(this));
    for (const link of this.phoneItemLinks) {
      link.removeEventListener("click", this.closeMenuOnClick.bind(this));
    }
    for (const link of this.allLinks) {
      link.removeEventListener(
        "click",
        this.dispatchLinkClickEvent.bind(this, link),
      );
    }
  }

  onMenuBtnClick() {
    if (this.opened) {
      this.opened = false;
    } else {
      this.opened = true;
    }
  }

  closeMenuOnClick() {
    this.opened = false;
  }
}

customElements.define("app-navbar", AppNavbar);
