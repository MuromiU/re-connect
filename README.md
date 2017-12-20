# re-connect

## introduce
this package supports to help transform functional stateless component to stateful component

## install
```
npm install --save-dev git+ssh://git@github.com/MuromiU/re-connect.git
```

## usage
``` react
let React = require('react');
let ReactDom = require('react-dom');
let connect = require('re-connect');

let store = {i: 0};
let click = () => store.i += 1;
let IncButton = () => (
	<button onClick={click}>+{store.i}</button>
);

({store, IncButton} = connect({store, IncButton})); // connect it!!

ReactDom.render(<IncButton/>, document.querySelector('body'));

```

## license
MIT
