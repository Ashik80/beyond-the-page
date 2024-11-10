class BlogCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.shadowRoot.replaceChildren();
  }

  /**
   * @param {string} val
   */
  set blogTitle(val) {
    this._title = val;
  }
  get blogTitle() {
    return this._title;
  }

  /**
   * @param {string} val
   */
  set description(val) {
    this._description = val;
  }
  get description() {
    return this._description;
  }

  /**
   * @param {string} val
   */
  set imageUrl(val) {
    this._imageUrl = val;
  }
  get imageUrl() {
    return this._imageUrl;
  }

  /**
   * @param {string} val
   */
  set color(val) {
    this._color = val;
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

  render() {
    const container = document.createElement("div");
    container.classList.add("container", "flex");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container", "flex");
    imageContainer.style.backgroundColor = `var(--${this.color})`;

    const image = document.createElement("img");
    image.src = `assets/${this.imageUrl}`;
    if (this.imageHeight && this.imageWidth) {
      image.style.height = this.imageHeight;
      image.style.width = this.imageWidth;
    }
    imageContainer.appendChild(image);

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container");

    this.titleTag = document.createElement("h2");
    this.titleTag.innerText = this.blogTitle;
    this.descriptionTag = document.createElement("p");
    this.descriptionTag.innerText = this.description;

    infoContainer.append(this.titleTag, this.descriptionTag);

    container.append(imageContainer, infoContainer);

    const styles = this.createStyles();

    this.shadowRoot.replaceChildren(styles, container);
  }

  createStyles() {
    const styles = document.createElement("style");
    styles.textContent = `
      :root {
        --grey: #3c3d37;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      .flex {
        display: flex;
      }

      .container {
        border-radius: 0.2rem;
        overflow: hidden;
        flex-direction: column;
        height: 100%;
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
    `;

    return styles;
  }
}

customElements.define("blog-card", BlogCard);
