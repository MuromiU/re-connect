# re-connect

## introduce
this package supports to help transform functional stateless component to stateful component

## install
```
npm install --save-dev github:MuromiU/re-connect
```

## usage
``` jsx
let React = require('react');
let ReactDom = require('react-dom');
let Connect = require('re-connect');

let store = {i: 0};
let IncButton = ({text, store}) => (
	<button onClick={click}>{text} +{store.i}</button>
);

IncButton = Connect({store})(IncButton);

let click = () => store.i += 1;

ReactDom.render(<IncButton text="click me"/>, document.querySelector('body'));

```

## usage with let decorator
[proposal about let decorator](https://github.com/ukari/javascript-let-decorators)

``` jsx
let store = {i: 0};

@Connect(store)
let IncButton = ({text, store}) => (
	<button onClick={() => click(store)}>{text} +{store.i}</button>
);

let click = store => store.i += 1;

ReactDom.render(<IncButton text="click me"/>, document.querySelector('body'));
```

## license
MIT
