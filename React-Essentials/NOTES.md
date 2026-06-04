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

### Alternative Props Syntaxes

Created `data.js` which is a named export array with data objects.

In `App.jsx` I can do either way as my `CoreConcept` component is using `props` to represent each object passed in:

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
              title={CORE_CONCEPTS[0].title}
              description={CORE_CONCEPTS[0].description}
              image={CORE_CONCEPTS[0].image}
            />
            <CoreConcept {...CORE_CONCEPTS[1]} />
            <CoreConcept {...CORE_CONCEPTS[2]} />
          </ul>
        </section>
      </main>
    </div>
  );
}
```

Next, the `CoreConcept` component can use object destructuring syntax to replace `props`:

```js
function CoreConcept({ title, description, image }) {
  return (
    <li>
      <img
        src={image}
        alt={title}
      />
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  );
}
```

### Storing Components in Files & Using a Good Project Structure

Moving all the components into separate files in `App.jsx`.

E.g. `Header.jsx`: use the same name as the component and can use `export default`.

### Storing Component Style Files Next To Components

Create `Project/src/components/Header` folder and put the component and its style file together.

### Component Composition: The special "children" Prop

In `App.jsx`, `Components` text between the opening and closing tags `TabButton` will not be rendered:
```js
function App() {
  return (
    <div>
      <Header />
      <main>
        ...
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton>Components</TabButton>
          </menu>
        </section>
      </main>
    </div>
  );
}
```

React won't know where to output it.

Every custom component receives props even if I'm not setting any attributes, React will still give me such a props object.

It's an object and will always have a built-in children prop.

I will need to use `props.children` in `TabButton` component:
```js
export default function TabButton(props) {
  return (
      <li><button>{props.children}</button></li>
  )
}
```

And here remains as is in `App`:
```js
<menu>
  <TabButton>Components</TabButton>
</menu>
```

So, the children prop contains whichever content I have between my component, like some text or some complex JSX structure.

Also, I can use object destructuring here:
```js
export default function TabButton({ children }) {
  return (
      <li><button>{children}</button></li>
  )
}
```

And this approach is called Component Composition where we wrap components inside another components.

But it's better to just pass the text down as props:
```js
export default function TabButton({ label }) {
  return (
      <li><button>{label}</button></li>
  )
}
```

#### Summary: Children Prop vs Attribute Props

Using children props:
```js
<TabButton>Components</TabButton>
```

and:
```js
export default function TabButton({ children }) {
  return (
      <li><button>{children}</button></li>
  )
}
```

Use case: when the custome component is getting a single piece of renderable content.

Using attribute props:
```js
<TabButton label="Components" />
```

and:
```js
export default function TabButton({ label }) {
  return (
      <li><button>{label}</button></li>
  )
}
```

Use case: when the custom component is getting multiple smaller pieces of information.