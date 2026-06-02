# Notes

## React Essentials - Components, JSX, Props, State & More

### Setting Up The Starting Project

The app entry point starts from `index.html`:

```html
<script
  type="module"
  src="/src/index.jsx"
></script>
```

Then, `index.jsx`:

```js
const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(<App />);
```

Finally, `App.jsx` is the root of the components.

### JSX & React Components

Describe the target UI with JSX

```jsx
<div>
  <h1>Time to get started!</h1>
</div>
```

JSX is used to describe and create HTML elements in JavaScript in a declarative way, but browsers do not support JSX!

React project come with a build process that runs behind the scenes, and transforms JSX code to code that does work in browsers.

### Creating & Using a First Custom Component

React components are just JavaScript functions.

- Must have a name starting with an Uppercase letter.
- Must return a renderable value i.e. the JSX code.

### Setting HTML Attributes Dynamically & Loading Image Files

React library's build process will make sure all the `import` files will be included in the final deployment package, so I can just write this in the `index.js`:

```js
import "./index.css";
```

or this variable to create a path to point to the .png image as `reactImg` in `App.jsx`:

```js
import reactImg from "./assets/react-core-concepts.png";
function Header() {
  return (
    <header>
      <img src={reactImg} alt="Stylized atom" />
...
```

### Making Components Reusable with Props

Key concepts:

- Use props to pass data into components
- Props accept all value types

The component that's receiving props can just write as receiving one argument called `props`:

```js
function CoreConcept(props) {
    ...
}
```

React merges all props into one object with key value pairs:

- key is the custom attribute name
- value is the attribute's value

So the key names will need to be the same (when passing in and when accessing the key's value):

```js
function CoreConcept(props) {
  return (
    <li>
      <img
        src={props.image}
        alt={props.title}
      />
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </li>
  );
}

function App() {
  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core concepts</h2>
          <ul>
            <CoreConcept
              title="Components"
              description="The core UI building block"
              image={componentsImg}
            />
...
```

#### Prettier

To automatically split the multi-line props of a component, I set up this Prettier formatting config here like this:

```bash
echo '{ "singleAttributePerLine": true }' > .prettierrc
```

This `.prettierrc` file will be created.
