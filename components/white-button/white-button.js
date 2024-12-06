import globalCss from "../../styles/global.css" with { type: "css" };

const whiteButtonTemplate = document.createElement("template");
whiteButtonTemplate.innerHTML = `
  <style>
    button {
      background-color: var(--text);
      color: var(--background);
      border: none;
      padding: 1rem 2rem;
      border-radius: 2rem;
      font-size: 1rem;
      font-family: inherit;
      cursor: pointer;
    }
  </style>
  <button><slot></slot></button>
`;

export class WhiteButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(whiteButtonTemplate.content.cloneNode(true));
    this.shadowRoot.adoptedStyleSheets = [globalCss];
  }
}

customElements.define("white-button", WhiteButton);
