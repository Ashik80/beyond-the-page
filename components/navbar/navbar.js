const appNavbarTemplate = document.createElement("template");
appNavbarTemplate.innerHTML = `
  <style>
    #navbar {
      border-bottom: 1px solid var(--grey);
    }
    #logo img {
      width: 11rem;
    }
    #hamburger-menu {
      display: block;
      background-color: transparent;
      color: var(--text);
      overflow: hidden;
    }
    #hamburger-menu img {
      height: 1.5rem;
    }
    #desktop-items {
      display: none;
      list-style: none;
    }
    #phone-items {
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
  <div id="navbar" class="py-1">
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
    this.appendChild(appNavbarTemplate.content.cloneNode(true));
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
    this.button = this.querySelector("#hamburger-menu");
    this.phoneItems = this.querySelector("#phone-items");
    this.phoneItemLinks = this.phoneItems.querySelectorAll("a");

    this.button.addEventListener("click", this.onMenuBtnClick.bind(this));
    for (const link of this.phoneItemLinks) {
      link.addEventListener("click", this.closeMenuOnClick.bind(this));
    }
  }

  disconnectedCallback() {
    this.button.removeEventListener("click", this.onMenuBtnClick.bind(this));
    for (const link of this.phoneItemLinks) {
      link.removeEventListener("click", this.closeMenuOnClick.bind(this));
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
