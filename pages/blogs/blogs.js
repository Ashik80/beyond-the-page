async function InitBlogPage() {
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

  const blogsContainer = document.getElementById("blogs-container");
  const parser = new DOMParser();

  for (const blog of blogList) {
    const blogCard = await loadComponent("blog-card");
    const cardElem = parser.parseFromString(blogCard, "text/html").body
      .children[0];

    const imageContainer = cardElem.children[0];
    setBlogCardImage(imageContainer, blog);

    const blogInfoContainer = cardElem.children[1];
    setBlogCardInfo(blogInfoContainer, blog);

    const atag = document.createElement("a");
    atag.href = blog.link;
    atag.style.textDecoration = "none";
    atag.onclick = (e) => {
      e.preventDefault();
      const url = new URL(atag.href);
      loadPage(url.pathname);
    };
    atag.appendChild(cardElem);
    blogsContainer.appendChild(atag);
  }
}

function setBlogCardImage(imageContainer, blog) {
  imageContainer.style.backgroundColor = `var(--${blog.color})`;
  const image = document.createElement("img");
  if (blog.size) {
    image.style.height = blog.size.height;
    image.style.width = blog.size.width;
  }
  image.src = `assets/${blog.image}`;
  imageContainer.appendChild(image);
}

function setBlogCardInfo(blogInfoContainer, blog) {
  blogInfoContainer.children[0].innerHTML = blog.title;
  blogInfoContainer.children[1].innerHTML = blog.description;
}

InitBlogPage();
