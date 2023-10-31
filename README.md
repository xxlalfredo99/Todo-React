# Todo React App

Below we will give a brief introduction to React by rewriting the todo app
example in React. Note for simplicity we are using a simple backend to store
todo items as seen in lecture 4. 

Firstly, React is frontend framework for JavaScript. React allows us to easily split 
code into units of abstraction called components. The real power behind
components is that they can be composed of smaller components to create
larger and more complex systems. React also brings to the table a powerful
feature called reactivity (hence the name React). Reactivity allows for UI
elements to reactively update to data state changes without the developer
manually having to do the update. This by far is one of the most powerful
features that most if not all modern JavaScript frameworks bring to the table
and allows for us the developer to greatly reduce the potentially
complicated and bug-prone boilerplate code needed for updating UI elements
with new data.

React components are simply defined as a function that returns some code that
will be rendered.

```jsx
function MyReactComponent() {
  return (
    <div>Hello World!</div>
  );
}
```

Now you might have just noticed here that we wrote some HTML in JavaScript
without setting `innerHTML` to an HTML string. This a feature included in
React called JSX which is a syntax extension to JavaScript. This essentially
is some syntactic sugar that allows us to write HTML and React elements
in JavaScript in a more natural way. Just note that we actually are not writing
HTML here but rather just JavaScript and that React will take this code that we
have written and use it to render elements in the DOM. For those who are
interested, JSX code will be translated into JavaScript underneath the hood
where calls to `React.createElement` are used to create all the elements
(you can read more about it
[here](https://reactjs.org/docs/react-without-jsx.html), but it's not required
for this lab). 

Also, another thing to note is that hooks are a relatively new addition to
React (they came out in 2019 in React 16.8). Before hooks, components were
defined with JavaScript classes instead. Functional components like what we
just showed you still existed before then, however, a major caveat was that
they were only able to be stateless. Since the release of hooks, they have
become the preferred method to write components in the React community,
which is why this tutorial will only be using them. However, it is still
important to know that class based components exist because plenty of examples
and documentation (including parts of the official React documentation) still
use them. Everything a class component can do can also be done with functional
components and hooks.

Each React component has a lifecycle that it follows. When the component
is initially added in, it will be mounted. After mounting is completed
the initial render occurs. Updates occur whenever something that the component
depends on reactively changes (for example, a component's props or state
changes). An update will trigger the component to be rerender. This update
process will also be propagated down to any sub components that the current
component renders. Finally, when the component is ready to be removed (either
by the app being closed or a component being conditionally rendered out),
the component will be unmounted along will all its children components.

![React Component Lifecycle](./media/component-lifecycle.png)

## Using the React framework Next.js

There are several React framework that you use. One of the most popular so far was called _Create React App_. However, this framework has been deprecated by the React developers. 

In this tutorial, we are going to use the [Next.js React framework](https://nextjs.org/). However, Next.js allows more than just writing react frontend. It has also some backend features that we are not going to use here. Because Next.js mixes backend and frontend features, it has a specific way to render React content. For the sake of simplicity, we are not going to touch any of the Next.js backend features and we will always render React content on the client side (see [Client Side Rendering](https://nextjs.org/docs/pages/building-your-application/rendering/client-side-rendering))

So before writing any code, you should get familiar with the basic principles of Next.js. We recommend you to look at: 

- [Proiject Structure](https://nextjs.org/docs/getting-started/project-structure)
- [Routing](https://nextjs.org/docs/app/building-your-application/routing)
- [Client Rendering](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

## The Landing Page

So let's start by defining our landing page `app/pages.js`:

```jsx
'use client'

import styles from './page.module.css'

export default function Home() {

    return (
        <div className="{styles.hello}">
          Hello World!
        </div>
    );
}
```

and `app/pages.js`:

```css
.hello {
    color: red;
}
```

Note: recall that anything we write here is in JavaScript which means that
`class` is a reserved keyword. As such, to define a class on an element we
use `className` instead when using React.

Currently, our landing page simply displays the text "Hello There". However, we want it to
allow us to add new items and display the current items. 

Our first instinct would be to define a variable that keeps track of items
within the landing page component like so:

```jsx
'use client'

import styles from './page.module.css'

export default function Home() {
    const items = [];
    
    return (
        <div className="{styles.hello}">
          Hello World!
        </div>
    );
}
```

However, this will not work because every time `App` rerenders, `items` will be
reset to the empty array. To achieve what we want to do here we need to
introduce the concept of hooks. Hooks are a way to "attach" additional behavior
to a component. There are a multitude of default hooks provided in React but
the ones you will use most often likely will be `useState`, `useEffect`,
and `useRef`. The real power behind hooks is that you can build your
own hooks out of the basic hooks which provides a powerful level of abstraction.
When naming hooks, it is convention to prefix them with "use". Now, back to
our issue here. We want to retain the value of `items` every time `App`
rerenders. This can be achieved with the `useState` hook, as follows:


```jsx
'use client'

import  React, { useState, useEffect } from 'react';
import styles from './page.module.css'

export default function Home() {
    const [items, setItems] = useState([]);
    
    return (
        <div className="{styles.hello}">
          Hello World!
        </div>
    );
}
```

The `useState` hook takes in an initial value as a parameter and returns a
2-element array (i.e. a tuple) where the first element is the value of the
state and the second element is a function that we can call to update the
state. Note, you MUST set the value using the function. The reason we can't set
the value manually (e.x. `items = [...items, {_id: "foo", content: "bar"}])`
or `items.push({_id: "foo", content: "bar"})` is because React will not see
that `items` is changed and update any components that rely on it reactively.

Now we can use `useEffect` to fetch our items and rerender the UI:

```jsx
'use client'

import  React, { useState, useEffect } from 'react';
import styles from './page.module.css'

export default function Home() {
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        getItems().then(setItems);
    }, [])
    
    return (
        <div className="{styles.hello}">
          Hello World!
        </div>
    );
}
```

### AddItemForm

Now that we have our landing page roughed in, we want to start to design
the sub-components. Firstly, lets implement the `AddItemForm` component.
This component handles the form that allows us to create new todo items.
Let's start by rouging in the basic boilerplate for the component:

```jsx
// components/AddItemForm/AddItemForm.js
import "./AddItemForm.css";

export function AddItemForm() {
  return (<div>TODO: make the form</div>);
}
```

We then can use this newly created component within our landing page itself:

```jsx
function Home() {
  const [items, setItems] = useState([]);

  // ...

  return (
    <>
      <AddItemForm />
    </>
  );
}
```

In our landing page, we have the `addItem` that allows us to easily create new items
in our `items` state. It would be useful if our `AddItemForm` component had
access to this function somehow. This is where props come in. Props allow us to
pass in references to values from our parent component to children components.
Props are accessed in the first parameter of the component function.

```jsx
// components/AddItemForm/AddItemForm.js
import "./AddItemForm.css";

export function AddItemForm(props) {
  const { addItem } = props; // Tip: this syntax is called "object destructuring"

  return (<div>TODO: make the form</div>);
}
```

We then can update our landing page to pass a reference to `addItem` to `AddItemForm`

```jsx
  return (
    <>
      <AddItemForm addItem={addItem} />
    </>
  );
}
```

Now we will port in a modified version of the HTML code in the original app.

```jsx
// components/AddItemForm/AddItemForm.js
import "./AddItemForm.css";

export function AddItemForm(props) {
  const { createItem } = props;

  const handleSubmit = (e) => {
    e.preventDefault();

    // How do we get the current value of our input element?
  };

  return (
    <form className="AddItemForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="AddItemForm__item-content AddItemForm__element"
        placeholder="Enter your ToDo item"
        name="item"
        required
      />
    </form>
  );
}
```

So we have our handler setup to call whenever we submit the form (i.e.
when we press enter). However, the issue now is how do we get the value that
our `input` element is currently at? Our first thought would be to simply
use `document.querySelector` to find the input element and then read it's
value. However, this is not the recommend approach in React. The biggest
issue being that nothing is stopping us from making two instances of
`AddItemForm`, which in that case how to we know which one is the one
for the current call to `handleSubmit`? To counteract this issue, React has
"references", or "refs" for short. As the name implies this allows us to 
keep a reference to something. The most common use-case for this is to keep
a reference to a DOM object.

With hooks, you can use the `useRef` to create a reference and then assign
it to an HTML element by using the `ref` attribute. Implementing this into
`AddItemForm` gives us the following:

```jsx
// components/AddItemForm/AddItemForm.js
import "./AddItemForm.css";

export function AddItemForm(props) {
  const { createItem } = props;

  // By default our reference value will be `null` but will be set to
  // the input element once it is mounted
  const itemContentRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // We can access the reference value by using itemContentRef.current
    const content = itemContentRef.current.value;
    createItem(content);

    // We also might as well clear the form after we submit
    e.target.reset();
  };

  return (
    <form className="AddItemForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="AddItemForm__item-content AddItemForm__element"
        placeholder="Enter your ToDo item"
        name="item"
        required
        // This tells React that we want `itemContentRef` to reference
        // the input element
        ref={itemContentRef}
      />
    </form>
  );
}
```

You should now be able to create new items. Now let's move onto actually 
displaying our items.

### Items

Our `Items` component will be responsible for displaying all our todo items.
Our props will be `items` which is the list of all items and `deleteItem` which
is a reference to the `deleteItem` function. For each todo item in `items` we
will render an instance of the `Item` component which is responsible for
displaying its given item as well as telling us when the delete button for that
item is clicked.

```jsx
// components/Items.js
import "./Items.css";

export function Items(props) {
  const { items, deleteItem } = props;

  return (
    <div className="Items"></div>
  );
}
```

In our landing page, we use `Items` as such:

```jsx
// src/App.js

// ...
import { Items } from "./components/Items/Item";

function Home() {
  const [items, setItems] = useState([]);

  // ...

  return (
    <div className="App">
      <AddItemForm createItem={createItem} />
      <Items items={items} deleteItem={deleteItem} />
    </div>
  );
}
```

Ignoring, `deleteItems` and the `Item` component for now, let's just quickly
render our items as simple `div` elements. To do this in React, we must use
the `map` function. We want to essentially map our items to a list of 
HTML/React components. React will see this list and automatically render all
of them in the DOM. One important thing to note is that when rendering lists
we must provide a unique `key` attribute for each item. This helps React keep
track of which item is which.

```jsx
// components/Items/Items.js
import "./Items.css";

export function Items(props) {
  const { items, deleteItem } = props;

  return (
    <div className="Items">
      {items.map((item) => (
        <div key={item._id}>{item.content}</div>
      ))}
    </div>
  );
}
```

We also would like to add some text that tells us when no todo items exist.
This is called conditionally rendering and is done using the ternary operator.

```jsx
// components/Items.js
import "./Items.css";

export function Items(props) {
  const { items, deleteItem } = props;

  return (
    <div className="Items">
      {items.length === 0 ? (
        <h2>No items added yet, try adding some.</h2>
      ) : (
        items.map((item) => (
          <div key={item._id}>{item.content}</div>
        ))
      )}
    </div>
  );
}
```

Now, let's design the `Item` component. For props, we want to receive the
todo item that it needs to display as well as a function that it can call
to delete this todo item. The component for this will look like the following:

```jsx
// components/Item/Item.js
import "./Item.css";

export function Item(props) {
  const { item, deleteItem } = props;

  return (
    <div className="Item">
      <div className="Item__content">{item.content}</div>
      <div className="Item__delete-icon" onClick={deleteItem}></div>
    </div>
  );
}
```

Now let's replace our simple div element that display our todo items with
the `Item` component:

```jsx
// components/Items.js
import "./Items.css";
import { Item } from "./Item";

export function Items(props) {
  const { items, deleteItem } = props;

  return (
    <div className="Items">
      {items.length === 0 ? (
        <h2>No items added yet, try adding some.</h2>
      ) : (
        items.map((item, idx) => (
          <Item
            key={item._id}
            item={item}
            deleteItem={deleteItem}
          />
        ))
      )}
    </div>
  );
}
```