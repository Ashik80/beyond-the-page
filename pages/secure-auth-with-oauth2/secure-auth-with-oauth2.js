function SecureAuthWithOAuthInit() {
  const mdnDocLink = document.getElementById("mdn-doc-link-external");
  mdnDocLink.onclick = (e) => {
    e.stopPropagation();
  };

  attachComponentScript("components/code-block/code-block.js");
}

SecureAuthWithOAuthInit();
