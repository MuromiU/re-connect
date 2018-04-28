let React = require('react');

let checkStore = x => {
  if (x instanceof Function || !(x instanceof Object)) {
    throw "store can't be a Function or a no-Object";
  }
};

const registered = new WeakMap();
const listened = new WeakMap();
const FAKE_STATE = {};

let Store = (store) => {
  checkStore(store);
  if (registered.has(store)) {
    throw "you can't init the same store twice or more times";
  }
  let proxy;
  let config = {
    set: (x, k, v) => {
      if (!(x[k] === v)) {
        x[k] = v;
        listened.get(proxy).forEach(c => c.setState(FAKE_STATE));
      }
      return true;
    },
    get: (x, k) => {
      let v = x[k];
      var conf = Object.getOwnPropertyDescriptor(x, k);
      if (conf && conf.configurable === false && conf.writable === false) {
        return x[k];
      } else if (!(v instanceof Function) && v instanceof Object) {
        return new Proxy(v, config);
      } else {
        return v;
      }
    }
  };
  proxy = new Proxy(store, config);
  let listens = new Map();
  registered.set(store, proxy);
  listened.set(proxy, listens);
  return proxy;
}

let Connect = (store) => (component) => {
  if (!listened.has(store)) {
    throw "the store hasn't been registered";
  }
  
  let listens = listened.get(store);
  
  let Component = (class extends React.Component {
    constructor(props) {
      super(props);
      listens.set(this, this);
      this.state = FAKE_STATE;
    }
    
    render() {
      return component({...this.props});
    }
    
    componentWillUnmount() {
      listens.delete(this);
    }
  });
  
  return (props) => React.createElement(Component, props);
};

let Component = f => (props, ...rest) => f()(props, ...rest);

module.exports = {Store, Connect, Component};
