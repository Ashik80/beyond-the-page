const codeBlockTemplate = document.createElement("template");
codeBlockTemplate.innerHTML = `
  <style>
    @import url('styles/global.css');

    pre {
      position: relative;
    }

    code {
      background-color: var(--code-block);
      border-radius: 0.2rem;
      padding: 1rem;
      width: 100%;
      display: block;
      color: var(--muted-grey);
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

class CodeBlock extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  get lang() {
    return this.getAttribute("lang");
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.appendChild(codeBlockTemplate.content.cloneNode(true));
    const lang = this.shadowRoot.querySelector("#lang");
    lang.innerText = this.lang;
  }
}

customElements.define("code-block", CodeBlock);
