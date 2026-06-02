# Notes

## React Essentials - Components, JSX, Props, State & More

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
