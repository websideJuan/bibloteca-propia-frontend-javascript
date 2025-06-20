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

    if (this.routes[path]?.callback) {
      const isAuthenticated = this.routes[path].callback();
     
      if (isAuthenticated === false) {
        setInterval(() => {
          this.navigate({ path: '/login' });
          window.location.href = '/login';
        }, 2000);
        return;
      }
    }

    if (this.routes[path]?.redirectTo) {
      this.navigate({ path: this.routes[path]?.redirectTo });
      return;
    }
      
    if (this.routes[path]) {
      this.currentRoute = path;
      document.getElementById('app').innerHTML = this.routes[path].component();
    } else {
      document.getElementById('app').innerHTML = `<h1>404 Not Found</h1> <a href="./home">Go to Home</a>`;
      console.error(`Route not found: ${path}`);
    }
  }
  getCurrentRoute() {
    return this.currentRoute;
  }
  init() {
    window.addEventListener('hashchange', () => this.handleHashChange());
    window.addEventListener('load', () => this.handleHashChange());
   
    document.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const path = link.getAttribute('href');
        history.pushState({}, '', path);
        this.navigate({ path });
      });
    });
  }

  handleHashChange() {
    const path = window.location.hash.slice(1) || '/';
    this.navigate({ path });
  }
}
export default Routing;
