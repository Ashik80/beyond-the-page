import globalCss from "../../styles/global.css" with { type: "css" };
import strapCss from "../../styles/strapcss.css" with { type: "css" };

const appFooterTemplate = document.createElement("template");
appFooterTemplate.innerHTML = `
  <style>
    #footer-container {
      border-top: 1px solid var(--grey);
      height: 2.5rem;
    }

    .footer-small-text {
      color: var(--muted-grey);
      font-size: 0.8rem;
    }

    .footer-link {
      text-decoration: none;
    }
  </style>
  <footer id="footer-container" class="flex justify-center">
    <ul class="list-style-none flex gap-2">
      <li><a href="/" class="footer-small-text footer-link">Home</a></li>
      <li><a href="/blogs" class="footer-small-text footer-link">Blogs</a></li>
      <li>
        <a href="/my-thoughts" class="footer-small-text footer-link">
          My Thoughts
        </a>
      </li>
    </ul>
  </footer>
`;

class AppFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(appFooterTemplate.content.cloneNode(true));
    this.shadowRoot.adoptedStyleSheets = [globalCss, strapCss];
  }

  connectedCallback() {
    this.allATags = this.shadowRoot.querySelectorAll("a");
    for (const link of this.allATags) {
      link.addEventListener(
        "click",
        this.dispatchLinkClickEvent.bind(this, link),
      );
    }
  }

  dispatchLinkClickEvent(link) {
    const ev = new CustomEvent("nav-link-click", {
      detail: link.href,
      bubbles: true,
    });
    this.dispatchEvent(ev);
  }
}

customElements.define("app-footer", AppFooter);
