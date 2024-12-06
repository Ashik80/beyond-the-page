import globalCss from "../../styles/global.css" with { type: "css" };

const loaderTemplate = document.createElement("template");
loaderTemplate.innerHTML = `
  <style>
    #container {
      width: 100%;
      position: fixed;
      top: 0;
    }
    #progress {
      height: 5px;
      width: 0px;
      background-color: var(--light-blue);
      transition: width 0.2s ease;
    }
  </style>
  <div id="container">
    <div id="progress"></div>
  </div>
`;

class AppLoader extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(loaderTemplate.content.cloneNode(true));
    this.shadowRoot.adoptedStyleSheets = [globalCss];
    this.progressBar = this.shadowRoot.querySelector("#progress");
  }

  /**
   * @param {number} progressPercentage
   */
  set progress(progressPercentage) {
    this._progress = progressPercentage;
    this.progressBar.style.width = `${progressPercentage}%`;
    if (progressPercentage === 95) {
      this.timer = setTimeout(() => {
        this.progressBar.style.visibility = "hidden";
        this.progressBar.style.width = "0";
      }, 250);
    } else {
      this.progressBar.style.visibility = "visible";
    }
  }

  disconnectedCallback() {
    clearTimeout(this.timer);
  }
}

customElements.define("app-loader", AppLoader);
