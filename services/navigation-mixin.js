export const NavigationMixin = (superClass) =>
  class extends superClass {
    /**
     * Adds navigation event dispatch functionality to a web component
     * @param {string} selector - CSS selector for the link element
     * @param {string} eventName - Custom event name to emit (default: 'nav-link-click')
     */
    setupNavigation(selector, eventName = "nav-link-click") {
      // Wait for shadow DOM to be ready
      if (this.shadowRoot) {
        this.initializeNavigation(selector, eventName);
      } else {
        // If called before shadow DOM is ready, wait for component to connect
        this.addEventListener(
          "connected",
          () => {
            this.initializeNavigation(selector, eventName);
          },
          { once: true },
        );
      }
    }

    /**
     * Initialize navigation event listeners
     * @private
     */
    initializeNavigation(selector, eventName) {
      const links = this.shadowRoot.querySelectorAll(selector);
      links.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          if (this.isExternalLink(link)) {
            window.open(link.href, "_blank");
          } else {
            this.emitNavigationEvent(link.href, eventName);
          }
        });
      });
    }

    /**
     * Check if a link is external
     * @param {HTMLAnchorElement} link
     * @returns {boolean}
     * @private
     */
    isExternalLink(link) {
      // Check if the link starts with http:// or https:// or uses target="_blank"
      return link.target === "_blank";
    }

    /**
     * Emit navigation event
     * @param {string} link - URL to navigate to
     * @param {string} eventName - Custom event name
     * @private
     */
    emitNavigationEvent(link, eventName) {
      const event = new CustomEvent(eventName, {
        detail: link,
        bubbles: true,
        composed: true, // Allows event to cross shadow DOM boundary
      });
      this.dispatchEvent(event);
    }
  };
