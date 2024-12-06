import "../../components/code-block/code-block.js";
import { NavigationMixin } from "../../services/navigation-mixin.js";
import globalCss from "../../styles/global.css" with { type: "css" };
import strapCss from "../../styles/strapcss.css" with { type: "css" };

const postgresOnUbuntuTemplate = document.createElement("template");
postgresOnUbuntuTemplate.innerHTML = `
<style>
#posgres-on-ubuntu-container p {
  margin: 1rem 0;
}
</style>
<div class="flex justify-center pt-2 pb-3">
  <div id="posgres-on-ubuntu-container" class="container">
    <h1>Postgres On Ubuntu</h1>
    <p>
      For a long time I have used Fedora and Arch Linux on my two machines. But
      these days I'm back to Ubuntu (no particular reason to move away from
      Fedora - Arch on the other hand, I wanted to get tasks done). I'm very
      fond of Linux Mint which gives me a bit of nostalgia as it was one of the
      distros I used on my earlier days on linux based operating systems. So
      this guide will work for any ubuntu based systems.
    </p>
    <p>
      If you ever tried to setup postgres on your ubuntu based system, not
      through docker, but by itself, you might have faced some difficulties
      creating new users and accessing the <code>psql</code> interface with the
      cli. So let's go over the whole setup and configuration step by step:
    </p>
    <h3>Installation</h3>
    <p>To install postgres on Ubuntu you need to run the command</p>
    <!-- prettier-ignore -->
    <code-block lang="sh">sudo apt install postgresql</code-block>
    <p>
      The <code>psql</code> cli is an important cli tool and required to a lot
      more than just manage your database in the terminal (which I obviously do
      - I manage my databases in the terminal, I'm a terminal freak). It can
      also be used to run sql scripts programmatically. See the official
      documentaion of
      <a
        id="psql-link-external"
        target="_blank"
        href="https://www.postgresql.org/docs/current/app-psql.html"
        >psql</a
      >
      to learn more about it.
    </p>
    <p>Now try getting into the psql interface with</p>
    <!-- prettier-ignore -->
    <code-block lang="sh">psql -U postgres</code-block>
    <p>
      You'll be prompted to provided a password for the user postgres. But
      what's the password? I never found out. But I found a way to change the
      default password. And it was not like the first link on google search that
      tells me how to do it. I had to go through a few links before I was able
      to figure it out. The purpose of this article is to be a clear cut steps I
      needed to do to fix it.
    </p>
    <h3>Configuration</h3>
    <p>
      To change the password for the use postgres, we need to go into the psql
      repl (?) first. We can do it by running the command
    </p>
    <!-- prettier-ignore -->
    <code-block lang="sh">sudo -u postgres psql</code-block>
    <p>
      You'll see your terminal enter the psql interface. It'll probably start
      with <code>postgres=#</code> if you are using default settings in your
      terminal. Then change the password by running an sql query
    </p>
    <!-- prettier-ignore -->
    <code-block lang="sh">postgres=# ALTER USER postgres PASSWORD 'my_postgres_password';</code-block>
    <p>
      The password is changed for the user postgres so now you can exit the psql
      interface by typing \q and enter
    </p>
    <!-- prettier-ignore -->
    <code-block lang="sh">postgres=# \q</code-block>
    <p>
      Even after all this you will not be able to access the psql interface with
      the psql -U postgres command. For that you will need to change a file
      named pg_hba.conf, where you will specify what kind of authentication you
      want. I suggest you do this with vim (or nano)
    </p>
    <!-- prettier-ignore -->
    <code-block lang="sh">sudo vim /etc/postgresql/&lt;version&gt;/main/pg_hba.conf</code-block>
    <p>
      Replace &lt;version&gt; with the psql version you have installed. Search
      for the word <code>peer</code> and replace it with md5 for the first two
      occurences. From:
    </p>
    <!-- prettier-ignore -->
    <code-block lang="conf"># TYPE  DATABASE        USER            ADDRESS                 METHOD
local   all             postgres                                peer
local   all             all                                     peer</code-block>
    <p>To:</p>
    <!-- prettier-ignore -->
    <code-block lang="conf">local   all             postgres                                md5
local   all             all                                     md5</code-block>
    <p>Save the file and restart postgresql service with the command</p>
    <!-- prettier-ignore -->
    <code-block lang="sh">sudo systemctl restart postgresql</code-block>
    <p>
      Now when you want to access the psql interface with the postgres user, you
      will be prompted to provide the password. Enter the new password and you
      are all set.
    </p>
  </div>
</div>
`;

export class PostgresOnUbuntuPage extends NavigationMixin(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(
      postgresOnUbuntuTemplate.content.cloneNode(true),
    );
    this.shadowRoot.adoptedStyleSheets = [globalCss, strapCss];
  }

  connectedCallback() {
    this.setupNavigation("a");
  }
}

customElements.define("postgres-on-ubuntu-page", PostgresOnUbuntuPage);
