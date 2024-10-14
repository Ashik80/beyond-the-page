function InitPostgresOnUbuntu() {
  const psqlLink = document.getElementById("psql-link-external");

  psqlLink.onclick = (e) => {
    e.stopPropagation();
  };
}

InitPostgresOnUbuntu();
