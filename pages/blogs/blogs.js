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
    atag.onclick = (e) => {
      e.preventDefault();
      const url = new URL(atag.href);
      loadPage(url.pathname);
    };
    atag.appendChild(blogCard);
    blogs.push(atag);
  }
  blogsContainer.append(...blogs);

  attachComponentScript("components/blog-card/blog-card.js");
}

InitBlogPage();
