import "../../components/blog-card/blog-card.js";
import { NavigationMixin } from "../../services/navigation-mixin.js";
import globalCss from "../../styles/global.css" with { type: "css" };
import strapCss from "../../styles/strapcss.css" with { type: "css" };

const blogList = [
  {
    title: "Manage Multiple Git Accounts",
    description: "Be it any platform that uses git version control",
    color: "light-green",
    image: "manage-multiple-git-accounts.png",
    size: {
      height: "130px",
      width: "auto",
    },
    link: "/manage-multiple-git-accounts",
  },
  {
    title: "Secure Auth with OAuth2.0",
    description: "How to use refresh tokens to generate access tokens",
    color: "pink",
    image: "oauth-jwt.png",
    link: "/secure-auth-with-oauth2",
  },
  {
    title: "Postgres on Ubuntu",
    description: "Steps to setup postgres on ubuntu, without the pain",
    color: "yellow",
    image: "postgres-on-ubuntu.png",
    link: "/postgres-on-ubuntu",
  },
];

const blogPageTemplate = document.createElement("template");
blogPageTemplate.innerHTML = `
<style>
#blogs-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
@media (min-width: 640px) {
  #blogs-container {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
<div class="flex justify-center py-3">
  <div id="blogs-container" class="container"></div>
</div>
`;

export class BlogPage extends NavigationMixin(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(blogPageTemplate.content.cloneNode(true));
    this.shadowRoot.adoptedStyleSheets = [globalCss, strapCss];
  }

  connectedCallback() {
    this.blogsContainer = this.shadowRoot.querySelector("#blogs-container");

    const blogs = [];
    for (const blog of blogList) {
      const blogCard = document.createElement("blog-card");
      blogCard.blogTitle = blog.title;
      blogCard.description = blog.description;
      blogCard.imageUrl = blog.image;
      blogCard.color = blog.color;
      if (blog.size) {
        blogCard.setAttribute("image-height", blog.size.height);
        blogCard.setAttribute("image-width", blog.size.width);
      }

      const atag = document.createElement("a");
      atag.href = blog.link;
      atag.style.textDecoration = "none";
      atag.appendChild(blogCard);
      blogs.push(atag);
    }

    this.blogsContainer.append(...blogs);
    this.setupNavigation("a");
  }
}

customElements.define("blogs-page", BlogPage);
