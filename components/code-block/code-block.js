import globalCss from "../../styles/global.css" with { type: "css" };

const codeBlockTemplate = document.createElement("template");
codeBlockTemplate.innerHTML = `
  <style>
    pre {
      position: relative;
    }

    pre code {
      background-color: var(--code-block);
      border-radius: 0.2rem;
      padding: 1rem;
      display: block;
      color: var(--muted-grey);
      overflow-x: auto;
    }

    span {
      position: absolute;
      top: 0;
      right: 0.2rem;
      font-size: 0.7rem;
      color: var(--grey);
    }
  </style>
  <pre><span id="lang"></span><code><slot></slot></code></pre>
`;

export class CodeBlock extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(codeBlockTemplate.content.cloneNode(true));
    this.shadowRoot.adoptedStyleSheets = [globalCss];
  }

  get lang() {
    return this.getAttribute("lang");
  }

  connectedCallback() {
    const lang = this.shadowRoot.querySelector("#lang");
    lang.innerText = this.lang;
  }
}

customElements.define("code-block", CodeBlock);
