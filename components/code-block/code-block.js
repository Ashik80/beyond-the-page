const codeBlockTemplate = document.createElement("template");
codeBlockTemplate.innerHTML = `
  <style>
    :root {
      --code-block: #000000;
      --muted-grey: #a9a9a9;
      --grey: #3c3d37;
    }

    pre {
      position: relative;
    }

    code {
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
