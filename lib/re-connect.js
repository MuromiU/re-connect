let React = require('react');

let f = ({...x}) => f => {
    return Object.keys(x).reduce((acc, cur) => {
        acc[cur] = f(cur, x[cur]);
        return acc;
    }, {});
};

let checkNull = x => {
  if (!(x === undefined)) {
    throw `can't connect multiple store object as parameter` ;
  }
};

let checkStore = x => {
  if (x instanceof Function || !(x instanceof Object)) {
    throw "store can't be a Function or a no-Object";
  }
};

let connect = (x) => (component) => {
  let store;
  let sname;
  let listens = new Map();
  f(x)((k, x) => {
    checkNull(store);
    store = x;
    sname = k;
    checkStore(store);
  });
  let state = {};
  let config = {
    set: (x, k, v) => {
      if (!(x[k] === v)) {
        x[k] = v;
        listens.forEach(c => c.setState(state));
      }
      return true;
    },
    get: (x, k) => {
      let v = x[k];
      if (!(v instanceof Function) && v instanceof Object) {
        return new Proxy(v, config);
      } else {
        return v;
      }
    }
  };
  let proxy = new Proxy(store, config);
  let Component = (class extends React.Component {
    constructor(props) {
      super(props);
      listens.set(this, this);
      this.state = state;
    }
    
    render() {
      return component({...this.props, [sname]: proxy});
    }
    
    componentWillUnmount() {
      listens.delete(this);
    }
  });
  
  return (props) => React.createElement(Component, props);
};

module.exports = connect;
