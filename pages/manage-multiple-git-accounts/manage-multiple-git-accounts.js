import "../../components/code-block/code-block.js";
import globalCss from "../../styles/global.css" with { type: "css" };
import strapCss from "../../styles/strapcss.css" with { type: "css" };

const multipleGitAccoutPageTemplate = document.createElement("template");
multipleGitAccoutPageTemplate.innerHTML = `
<style>
#man-mul-git-acc-container p {
  margin: 1rem 0;
}

#man-mul-git-acc-container ol {
  padding-left: 2rem;
}
</style>
<div class="flex justify-center pt-2 pb-3">
  <div id="man-mul-git-acc-container" class="container">
    <h1>How to Manage Multiple Git Accounts in the Same Machine</h1>
    <p>
      Configuring multiple git accounts is a pretty easy task but requires a few
      steps. I always need to use two github accounts, one that I had to create
      for my office work and another that is for my personal use - where I keep
      my configurations and also this blog site.
    </p>
    <p>
      We will create an ssh key for this article. We will be naming this one
      <code>personal</code> as it will suggest it's for my personal github
      account. Assuming we are on a *NIX machine, let's create the first key by
      running this command in a terminal
    </p>
    <!-- prettier-ignore -->
    <code-block lang="sh">ssh-keygen</code-block>
    <p>
      This will prompt us to save the key in a file along with the path where
      the key is supposed to be. The prompt will look like this
    </p>
    <!-- prettier-ignore -->
    <code-block lang="sh">Generating public/private xxxxxxx key pair.
Enter file in which to save the key (/home/shuvo/.ssh/id_xxxxxxx):</code-block>
    <p>
      As you can see the we are shown an example of the file name. Make sure to
      provide the full path for this. So, in our case, we will type
      <code>/home/shuvo/.ssh/personal</code>.
    </p>
    <p>
      This will create a file in the <code>~/.ssh</code> directory and create
      two files, <code>personal</code> and <code>personal.pub</code>.
    </p>
    <p>
      Since github is the most popular platform, and I use it both for work and
      my personal use, I will talk about github only but all other platforms
      have the similar mechanisms. Whatever platform you are using you will have
      to set the ssh key for authorization. For github,
    </p>
    <ol>
      <li>Go to https://github.com/settings/keys</li>
      <li>
        Click on the button that says "New SSH key". This will open a form with
        "Title" and "Key"
      </li>
      <li>
        Copy the contents of <code>~/.ssh/personal.pub</code> and paste it in
        the "Key" field. "Title" can be anything you want
      </li>
      <li>Submit the form</li>
    </ol>
    <p>
      In the following sections we will talk about how to clone, push, pull etc.
      from a repository that belongs to the account you just added the ssh key
      to.
    </p>
    <h2>To Clone a Repository</h2>
    <p>
      To clone a repository, we will use the SSH option instead of HTTPS. But
      after running the command you will see that it fails and tell you that you
      might not have permissions. So we need to first pass in our ssh key as an
      argument. So instead of just <code>git clone</code> we are going to have
      to do this
    </p>
    <!-- prettier-ignore -->
    <code-block lang="sh">GIT_SSH_COMMAND="ssh -i ~/.ssh/personal" git clone git@github.com:.....</code-block>
    <p>
      This will allow us to clone the repository without any problems. To
      perform any other git commands on this repository you will need to pass in
      the ssh key command.
    </p>
    <h2>Set SSH key for the Repository</h2>
    <p>
      But passing the ssh command through the environment variable can be
      troublesome every single time. So we will configure the current repository
      to use the ssh key for any git commands. On your terminal, run
    </p>
    <!-- prettier-ignore -->
    <code-block lang="sh">git config -e</code-block>
    <p>
      This will open the project specific git configuration file in our editor.
      On the section that says <code>core</code> we will set our key, and also
      set our email and name while we are at it in the <code>user</code> section
    </p>
    <!-- prettier-ignore -->
    <code-block lang="gitconfig">[core]
    ...
    sshCommand = ssh -i ~/.ssh/personal
[user]
    name = Ashik
    email = mygitemail@mail.com</code-block>
    <p>
      Now you don't have to pass the environment variable again. Try simply
      running the command <code>git pull</code> and you will see that it works.
    </p>
    <p>
      Now you can create another key for another git account. It may be a bit
      troublesome that you have to configure this for every git account, but now
      you can use the same computer to do more.
    </p>
  </div>
</div>
`;

export class MultipleGitAccountPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(
      multipleGitAccoutPageTemplate.content.cloneNode(true),
    );
    this.shadowRoot.adoptedStyleSheets = [globalCss, strapCss];
  }
}

customElements.define(
  "manage-multiple-git-accounts-page",
  MultipleGitAccountPage,
);
