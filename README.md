# re-connect

## introduce
this package supports to help transform functional stateless component to stateful component

## install
```
npm install --save-dev github:MuromiU/re-connect
```

## usage
``` react
let React = require('react');
let ReactDom = require('react-dom');
let connect = require('re-connect');

let store = {i: 0};
let IncButton = ({text}) => (
	<button onClick={click}>{text} +{store.i}</button>
);

({store, IncButton} = connect({store, IncButton})); // connect it!!

let click = () => store.i += 1;

ReactDom.render(<IncButton text="click me"/>, document.querySelector('body'));

```

## license
MIT
