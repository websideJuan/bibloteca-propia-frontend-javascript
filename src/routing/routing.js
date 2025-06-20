class Routing {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.init();
  }
  addRoute({ path, component, callback, redirectTo }) {
    if (typeof path !== 'string' || !path.startsWith('/')) {
      throw new Error('Path must be a string starting with "/"');
    }
    if (component && typeof component !== 'function' ) {
      throw new Error('Component must be a string');
    }
    if (callback && typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    if (redirectTo && typeof redirectTo !== 'string') {
      throw new Error('RedirectTo must be a string');
    }

    this.routes[path] = { component, callback, redirectTo };
  }

  navigate({ path }) {
    if (!this.routes[path]) {
      this.renderContent(`<h1>404 Not Found</h1> <a href="#/home">Go to Home</a>`);
      console.error(`Route not found: ${path}`);
      return;
    }

    if (this.routes[path]?.callback) {
      const isAuthenticated = this.routes[path].callback();
     
      if (isAuthenticated === false) {
        
          this.navigate({ path: '/login' });
          
        
        return;
      }
    }

    if (this.routes[path]?.redirectTo) {
      this.navigate({ path: this.routes[path]?.redirectTo });
      return;
    }

    if (this.routes[path]) {
      const content = this.routes[path]?.component ? this.routes[path].component() : '' 
      this.renderContent(content);
      
      if (typeof this.routes[path].component.init === 'function') {
        this.routes[path].component.init();
      }
    }
  }
  getCurrentRoute() {
    return this.currentRoute;
  }
  init() {
    window.addEventListener('hashchange', () => this.handleHashChange());
    window.addEventListener('load', () => this.handleHashChange());
  }

  handleHashChange() {
    const path = window.location.hash.slice(1) || '/';
    console.log(path);
    
    this.navigate({ path });
  }

  renderContent(content) {
    const app = document.getElementById('app');
    if (!app) {
      throw new Error('App element not found');
    }

    app.innerHTML = content; // Clear previous content

    this.attachiLinkHandlers();
  }

  attachiLinkHandlers() {
    document.querySelectorAll('a[href^="#/"]').forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const path = link.getAttribute('href').slice(1); // Remove the leading '#/'
        
        location.hash = path; // Update the hash in the URL
      });
    });
  }
}
export default Routing;
