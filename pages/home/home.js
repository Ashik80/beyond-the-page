import globalCss from "../../styles/global.css" with { type: "css" };
import strapCss from "../../styles/strapcss.css" with { type: "css" };
import "../../components/white-button/white-button.js";
import { NavigationMixin } from "../../services/navigation-mixin.js";

const homePageTemplate = document.createElement("template");
homePageTemplate.innerHTML = `
<style>
  #home-container {
    padding-top: 4.5rem;
  }
  @media (min-width: 640px) {
    #home-container {
      padding-top: 6rem;
    }
  }

  #home-content h1 {
    font-size: 2.5rem;
    line-height: 1;
  }
  @media (min-width: 640px) {
    #home-content h1 {
      font-size: 4rem;
    }
  }
</style>
<div id="home-container" class="flex justify-center">
  <div id="home-content" class="container flex flex-col gap-2">
    <h1>
      Reading<br />
      Beyong the Page
    </h1>
    <div>
      <p>
        A world of stories and ideas where you can dive into thought-provoking
        articles.
      </p>
      <p>A place to deepen your understanding and spark innovation.</p>
    </div>
    <a href="/blogs">
      <white-button>Start Reading</white-button>
    </a>
  </div>
</div>
`;

export class HomePage extends NavigationMixin(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(homePageTemplate.content.cloneNode(true));
    this.shadowRoot.adoptedStyleSheets = [globalCss, strapCss];
  }

  connectedCallback() {
    this.setupNavigation("a");
  }
}

customElements.define("home-page", HomePage);
