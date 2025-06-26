class Routing {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.init();
  }
  addRoute({ path, component, callback, redirectTo }) {
    if (typeof path !== "string" || !path.startsWith("/")) {
      throw new Error('Path must be a string starting with "/"');
    }
    if (component && typeof component !== "function") {
      throw new Error("Component must be a function");
    }
    if (callback && typeof callback !== "function") {
      throw new Error("Callback must be a function");
    }
    if (redirectTo && typeof redirectTo !== "string") {
      throw new Error("RedirectTo must be a string");
    }

    this.routes[path] = {
      component,
      callback,
      redirectTo,
    };
  }

  async navigate({ path }) {
    const cleanedPath = path.replace(/\/$/, "") || "/";
    const route = this.routes[cleanedPath];
    this.currentRoute = cleanedPath; // Update the current route


    if (!route) {
      this.renderContent(
        '<h1>404 - Not Found</h1> <p>The page you are looking for does not exist.</p> <a href="#/home">Go to Home</a>'
      );
      return;
    }

    if ((await route?.callback) && (await route?.callback?.()) === false) {
      this.navigate({ path: "/login" });
      return;
    }

    if (route?.redirectTo) {
      this.navigate({ path: route.redirectTo });
      return;
    }

    setTimeout(() => {
    try {
      if (route && typeof route.component === "function") {
        const content = route.component();

        this.renderContent(content);

        location.hash = cleanedPath; // Update the URL hash
      }
    } catch (error) {
      console.error(error.message);
      console.log(error.stack);
      
    }
  }, 0)
 
  }

  init() {
    window.addEventListener("load", () => {
      const path = location.hash.slice(1) || "/";
      this.navigate({ path });
    });

    window.addEventListener("hashchange", () => {
      const path = location.hash.slice(1) || "/";
      this.navigate({ path });
    });
  }

  renderContent(content) {
    const app = document.getElementById("app");

    if (!app) {
      throw new Error("App element not found");
    }

    app.classList.add('app-container'); // Add a class for styling
    app.innerHTML = ""; // Clear the current content

    // console.log( this.routes[this.currentRoute].component.init());
    
    app.innerHTML = content; // Limpiar el contenido actual
    if (typeof this.routes[this.currentRoute]?.component.init === "function") {
      
      setTimeout(() => this.routes[this.currentRoute].component?.init(), 0) // Llamar al componente si existe
    }
  }

  attachiLinkHandlers() {
    const links = document.querySelectorAll("a[href^='#']") || [];
    if (links.length === 0) {
      console.warn("No links found with href starting with '#'");
      return;
    }
    links.forEach((link) => {

      link.addEventListener("click", (event) => {
        event.preventDefault();
        const path = link.getAttribute("href").slice(1); // Remove the leading '#'

        location.hash = path; // Update the hash in the URL
      });
    });
  }
}
export default Routing;
