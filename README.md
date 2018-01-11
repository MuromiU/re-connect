# re-connect

## introduce
believing that functional programming is easy to learn and easy to use, so I build this package

this package supports to help transform functional stateless component to stateful component

## install
```
npm install --save-dev github:MuromiU/re-connect
```

## usage
``` jsx
let React = require('react');
let ReactDom = require('react-dom');
let {Store, Connect} = require('re-connect');

let store = Store({i: 0});

let IncButton = ({text}) => (
  <button onClick={click}>
	{text} +{store.i}
  </button>
);

IncButton = Connect(store)(IncButton);

let click = () => store.i += 1;

ReactDom.render(<IncButton text="click me"/>, document.querySelector('body'));

```

## usage with let decorator
[proposal about let decorator](https://github.com/ukari/javascript-let-decorators)


### a singleton component
``` jsx
@Store
let store = {i: 0};

@Connect(store)
let IncButton = ({text}) => (
  <button onClick={click}>
	{text} +{store.i}
  </button>
);

let click = () => store.i += 1;

ReactDom.render(<IncButton text="click me"/>, document.querySelector('body'));
```

### a multiple instances component
``` jsx
let Component = f => props => f()(props);

@Component
let IncButton = function() {

  @Store
  let store = {i: 0};

  @Connect(store)
  let Inc = ({text, ...props}) => (
    <button onClick={inc}>
      {text} +{store.i}
    </button>
  );

  let inc = () => store.i += 1;

  return Inc;
}

ReactDom.render([
  <IncButton text="button A"/>,
  <IncButton text="button B"/>,
], document.querySelector('body'));
```

make a simple function `Component` to wrap the singleton component so you can have multiple instances

the `Component` is also provide by re-connect

use following code to import it
``` jsx
let {Store, Connect, Component} = require('re-connect');
```


## license
MIT
