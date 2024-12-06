import globalCss from "../../styles/global.css" with { type: "css" };
import strapCss from "../../styles/strapcss.css" with { type: "css" };

const blogCardTemplate = document.createElement("template");
blogCardTemplate.innerHTML = `
<style>
  #blog-card {
    height: 100%;
    width: 100%;
    overflow: hidden;
    border-radius: 0.2rem;
  }
  .image-container {
    justify-content: center;
    padding: 1rem;
    align-items: center;
  }
  .image-container img {
    width: 100%;
  }
  .info-container {
    background-color: var(--grey);
    padding: 1rem;
    flex: 1 1 auto;
  }
</style>
<div id="blog-card" class="container flex flex-col">
  <div class="image-container flex flex-col">
    <img/>
  </div>
  <div class="info-container">
    <h2></h2>
    <p></p>
  </div>
</div>`;

export class BlogCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(blogCardTemplate.content.cloneNode(true));
    this.shadowRoot.adoptedStyleSheets = [globalCss, strapCss];

    this.imageContainer = this.shadowRoot.querySelector(".image-container");
    this.imageTag = this.shadowRoot.querySelector("img");
    this.titleTag = this.shadowRoot.querySelector("h2");
    this.descriptionTag = this.shadowRoot.querySelector("p");
  }

  connectedCallback() {
    this.imageContainer.style.backgroundColor = `var(--${this.color})`;

    this.imageTag.src = `assets/${this.imageUrl}`;
    if (this.imageHeight && this.imageWidth) {
      this.imageTag.style.height = this.imageHeight;
      this.imageTag.style.width = this.imageWidth;
    }

    this.titleTag.innerText = this.blogTitle;
    this.descriptionTag.innerText = this.description;
  }

  /**
   * @param {string} val
   */
  set blogTitle(val) {
    this._title = val;
    this.titleTag.innerText = val;
  }
  get blogTitle() {
    return this._title;
  }

  /**
   * @param {string} val
   */
  set description(val) {
    this._description = val;
    this.descriptionTag.innerText = val;
  }
  get description() {
    return this._description;
  }

  /**
   * @param {string} val
   */
  set imageUrl(val) {
    this._imageUrl = val;
    this.imageTag.src = `assets/${val}`;
  }
  get imageUrl() {
    return this._imageUrl;
  }

  /**
   * @param {string} val
   */
  set color(val) {
    this._color = val;
    this.imageContainer.style.backgroundColor = `var(--${this.color})`;
  }
  get color() {
    return this._color;
  }

  get imageHeight() {
    return this.getAttribute("image-height");
  }

  get imageWidth() {
    return this.getAttribute("image-width");
  }
}

customElements.define("blog-card", BlogCard);
