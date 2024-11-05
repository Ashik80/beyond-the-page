function InitPostgresOnUbuntu() {
  const psqlLink = document.getElementById("psql-link-external");

  psqlLink.onclick = (e) => {
    e.stopPropagation();
  };

  attachComponentScript("components/code-block/code-block.js");
}

InitPostgresOnUbuntu();
