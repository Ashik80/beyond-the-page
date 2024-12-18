import globalCss from "../../styles/global.css" with { type: "css" };
import strapCss from "../../styles/strapcss.css" with { type: "css" };

const myThoughtsPageTemplate = document.createElement("template");
myThoughtsPageTemplate.innerHTML = `
<style>
  #my-story-container p {
    margin: 1rem 0;
  }
</style>
<div class="flex justify-center pb-3 pt-2">
  <div id="my-story-container" class="container">
    <h1>A little intro...</h1>
    <p>
      I have been programming for a few years now but long enough to form my own
      opinions about software, and this blog site is just for me to share my
      thoughts and my rant. Whatever I write about is just my opinion, as I
      mentioned, which may change in the future as I'm always open to change.
      But at the time of writing about any of the topic, it is what I believe to
      be right. I encouraged myself, and so I encourage other people too, to
      question the norms that are the rules and standards today. And this is not
      just limited to technology and software. This is something that I do in
      every step of my life. My goal is to share insights and deepen our
      understanding through my writing for whoever stumbles upon this website.
    </p>
    <p>
      This website will host no ads. Also this website is an experimentation of
      mine, where I use my own framework instead of well-known and more complex
      frameworks like Next, Angular, Vue etc.
    </p>
    <h1 class="mt-2">Why?...</h1>
    <p>
      I strive for simplicity and seeing some people work has strengthened this
      feeling in me that we need to make things more simple. Layers and layers
      of abstraction has burnt me out (just like my laptop) and I want to do
      things my way. When I hear the saying "Why reinvent the wheel?", I
      completely hate this saying as it offers no value whatsoever and I think
      there is three reasons why people say this:
    </p>
    <ol class="pl-2">
      <li>
        They heard someone else say it and thought it was a cool thing to say
      </li>
      <li>
        They think it's a waste of time, and instead of using the time to
        actually learn they think it's better to do some capitalist shenanigans
      </li>
      <li>
        They are the ones that are actually reinventing the wheels and selling
        their frameworks and making profit, while telling you that you should
        not do it
      </li>
    </ol>
    <p>
      Just to prove this theory, I created this website with vanilla JS (routing
      and everything) instead of using any popular frameworks.
    </p>
    <p>
      I'm not starting any revolution, because many of you will already know the
      revolution against complexity started way before and by far more
      intelligent minds. I'm just part of that rebel group.
    </p>
    <p>
      I will also be centralizing a few of my notes that solves some problems I
      had to deal with. So this will be the place to look instead of googling
      for the solution again.
    </p>
  </div>
</div>
`;

export class MyThoughtsPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(myThoughtsPageTemplate.content.cloneNode(true));
    this.shadowRoot.adoptedStyleSheets = [globalCss, strapCss];
  }
}

customElements.define("my-thoughts-page", MyThoughtsPage);
