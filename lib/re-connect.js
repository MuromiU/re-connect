let React = require('react');

let f = ({...x}) => f => {
    return Object.keys(x).reduce((acc, cur) => {
        acc[cur] = f(cur, x[cur]);
        return acc;
    }, {});
};

let checkNull = x => {
  if (!(x === undefined)) {
    let type = x instanceof Function ? "Function" : "Object";
    throw `can't connect multiple ${type}s as parameter` ;
  }
}

let connect = (x) => {
  let component;
  let cname;
  let store;
  let sname;
  let listens = new Map();
  f(x)((k, x) => {
    if (x instanceof Function) {
      checkNull(component);
      component = x;
      cname = k;
    } else if (x instanceof Object) {
      checkNull(store);
      store = x;
      sname = k;
    }
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
      return component(this.props);
    }

    componentWillUnmount() {
      listens.delete(this);
    }
  });

  return {[cname]: (props) => React.createElement(Component, props), [sname]: proxy};
};

module.exports = connect;
