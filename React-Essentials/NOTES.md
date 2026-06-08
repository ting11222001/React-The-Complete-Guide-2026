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
    <li>
      <button>{props.children}</button>
    </li>
  );
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
    <li>
      <button>{children}</button>
    </li>
  );
}
```

And this approach is called Component Composition where we wrap components inside another components.

But it's better to just pass the text down as props:

```js
export default function TabButton({ label }) {
  return (
    <li>
      <button>{label}</button>
    </li>
  );
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
    <li>
      <button>{children}</button>
    </li>
  );
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
    <li>
      <button>{label}</button>
    </li>
  );
}
```

Use case: when the custom component is getting multiple smaller pieces of information.

### Reacting to Events

In React, I can write declarative code like this to let a Button listen to an event.

There are several built-in support props in React e.g. on-something props.

For example:

```js
export default function TabButton({ label }) {
  return (
    <li>
      <button onClick={...}>{label}</button>
    </li>
  );
}
```

So, the onClick prop of the button component can accept a function as value like this:

```js
export default function TabButton({ label }) {
  function handleClick() {
    console.log(`You clicked the ${label} tab!`);
  }
  return (
    <li>
      <button onClick={handleClick}>{label}</button>
    </li>
  );
}
```

Given the `App` is just refering to the TabButtons:

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
            <TabButton label="Components" />
            <TabButton label="JSX" />
            <TabButton label="Props" />
            <TabButton label="State" />
          </menu>
        </section>
      </main>
    </div>
  );
}
```

Now whenever the `TabButton` is clicked, it will console log `You clicked the Components tab!`, and so on.

#### Using `onClick={handleClick()}` vs `onClick={handleClick}`

`onClick={handleClick()}` calls the function immediately when the component renders. This is wrong because the button has not been clicked yet.

`onClick={handleClick}` passes the function as a value. React calls it only when the button is clicked.

Key points:

- Adding () calls the function right away, during render.
- Without (), you pass the function itself as a value.
- React then calls it later, only when the click event happens.
- This pattern applies to all event handlers, not just onClick.

### Passing Functions as Values to Props

Now, we want to be able to see different content based on the selected tab later.

Start from this code in `App`:

```js
<section id="examples">
  <h2>Examples</h2>
  <menu>
    <TabButton label="Components" />
    <TabButton label="JSX" />
    <TabButton label="Props" />
    <TabButton label="State" />
  </menu>
  Dynamic Content Goes Here!
</section>
```

In order to set and update this Dynamic Content in `App` level, we need to listen to clicks on our custom button, TabButton.

Therefore, in order to make our own tab buttons clickable, what we ultimately wanna do is to set the value for the `onClick` prop on the built-in `button` from outside our custom Component. So, create an `onSelect` prop on our custom tab button in `TabButton` in `App`.

And in `TabButton.jsx`, destruct the prop and wire it to `onClick` this event listener:

```js
export default function TabButton({ label, onSelect }) {
  return (
    <li>
      <button onClick={onSelect}>{label}</button>
    </li>
  );
}
```

Then, accept a function called `handleSelect` in `TabButton` and its `onSelect` prop in `App` as a value, and the function should be triggered when that button is clicked.

In `App.jsx`:

```js
function App() {
  function handleSelect() {
    console.log(`You clicked the tab!`);
  }
  ...
  <TabButton onSelect={handleSelect} label="Components" />
  ...
}
```

Now, whenever the `TabButton` is clicked, it will console log `You clicked the tab!`.

### Passing Custom Arguments to Event Functions

If we want to pass parameters like identifiers of the tab into the `handleSelect` function and eventually use a `if` check to replace the Dynamic Content properly, what we'll have to do is to control how handleSelect will be executed by React.

And we can do this by, instead of pointing at this handle select function here, we can pass an arrow function to onSelect.

This anonymous arrow function will not run immediately when this line of code gets parsed. Instead, when that line of code gets parsed it's just this arrow function that will be defined.

And this arrow function is then passed as a value to the tap button on this onSelect prop.

And therefore, when this function is executed i.e. when the button was clicked, pass this components string identifier to it. We can now use this code here for all these tab buttons and pass different identifiers to handleSelect based on which button was pressed.

And this is therefore a very common pattern that's used in React if you wanna define a function that should be executed upon an event, but you also want to control how it's going to be called and which arguments are going to be passed to it.

Therefore, with that, we can now go up to handleSelect and maybe output the selected button here so that we can see whether we get different values for different buttons.

```js
function App() {
  function handleSelect(selectedTab) {
    // selectedTab => 'components', 'jsx', 'props', 'state'
    console.log(`You clicked the ${selectedTab} tab!`);
  }

  return (
    <div>
      <Header />
      <main>
        ...
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton
              onSelect={() => handleSelect("components")}
              label="Components"
            />
            <TabButton
              onSelect={() => handleSelect("jsx")}
              label="JSX"
            />
            <TabButton
              onSelect={() => handleSelect("props")}
              label="Props"
            />
            <TabButton
              onSelect={() => handleSelect("state")}
              label="State"
            />
          </menu>
          Dynamic Content Goes Here!
        </section>
      </main>
    </div>
  );
}
```

Given the `TabButton` is still this:

```js
export default function TabButton({ label, onSelect }) {
  return (
    <li>
      <button onClick={onSelect}>{label}</button>
    </li>
  );
}
```

Note that if I just write this, then handleSelect will only render once when the component is up:

```js
<TabButton
  onSelect={handleSelect("components")}
  label="Components"
/>
```

Only by writing this, then handleSelect will be triggered when the tab is clicked.

```js
<TabButton
  onSelect={() => handleSelect("components")}
  label="Components"
/>
```

#### Why `handleSelect` should live in `App` level instead of `TabButton`

The next step is usually to add a useState to track which tab is selected, and render different content based on that. That state must live in App for the same reason: it needs to be shared across both <menu> and the content section.

The general rule to remember: lift state and handlers up to the lowest common ancestor of all the components that need to read or change that data. Here that ancestor is App.

### How NOT to Update the UI - A Look Behind The Scenes of React

By defauly, React component gets executed only once.

So `App` component got rendered once in `index.jsx`:

```js
ReactDOM.createRoot(entryPoint).render(<App />);
```

Also, `TabButton` got rendered once (there are four of them) in the `App`:

```js
function App() {
  ...
  console.log('Rendering App component...');

  return (
    <div>
      ...
```

And:

```js
export default function TabButton({ label, onSelect }) {
  console.log(`Rendering TabButton component with label: ${label}`);
  return (
   ...
```

I can add console log directly in the component function to prove it's rendered once.

The console will show:

```
Rendering App component...
Rendering TabButton component with label: Components
Rendering TabButton component with label: JSX
Rendering TabButton component with label: Props
Rendering TabButton component with label: State
```

And when clicking on the tab it will trigger `handleSelect` to console log each tab's strings:

```
components
jsx
props
state
```

But the `{tabContent}` in the `App`component will stay the same with the default value `Please click a tab to see the content!` because `App` component doesn't re-render, so the default value will not change to `components`, `jsx`, etc.

So we need a way to let `App` component know it should be executed again.

That's what `State` is about.

### Managing State & Using Hooks

We need to tell React that data changed and that will therefore cause React to update the UI.

And these special variables are created with help of a special function that must be imported from the React library.

The special function is `useState`. All these functions that start with `use` in React projects are React Hooks.

They're technically regular functions, but they must only be called inside of React component functions or inside of other React Hooks like custom hooks.

Also, I must call it on the top level of the component function.

`useState()` yields an array with two elements - we usually use array destructuring to store these two elements in two separate constants.

I can use any names but there are some naming conventions.

`useState` has the initial state value. `selectedTopic` is the current state value. `setSelectedTopic` is the state updating function and it will updates the stored value AND tells React to re-execute the component function in which `useState()` was called:
```js
const [selectedTopic, setSelectedTopic] = useState('Please click a tab to see the content!');
```

One interesting thing to note is that the updated state value will only be ready after the component is re-rendered.

For example, in `handleSelect`, doing console log on the `selectedTopic` will give me the old value, even though it's called after ` setSelectedTopic(selectedTab);`:
```js
function App() {
  const [selectedTopic, setSelectedTopic] = useState('Please click a tab to see the content!');

  function handleSelect(selectedTab) {
    setSelectedTopic(selectedTab);
    console.log(selectedTopic);
  }
```

### Deriving & Outputting Data Based on State

In `data.js`, add `EXAMPLES` array. Each property is the same as the selected key as the `handleSelect` in `App`.

The default `selectedTopic` should be `components`.

Each tab content will be in the `<div>`.

```js
function App() {
  const [selectedTopic, setSelectedTopic] = useState('components');

  function handleSelect(selectedTab) {
    // selectedTopic => 'components', 'jsx', 'props', 'state'
    setSelectedTopic(selectedTab);
  }

  return (
    <div>
      <Header />
      <main>
        ...
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton onSelect={() => handleSelect('components')} label="Components" />
            <TabButton onSelect={() => handleSelect('jsx')} label="JSX" />
            <TabButton onSelect={() => handleSelect('props')} label="Props" />
            <TabButton onSelect={() => handleSelect('state')} label="State" />
          </menu>
          <div id="tab-content">
            <h3>{EXAMPLES[selectedTopic]?.title}</h3>
            <p>{EXAMPLES[selectedTopic]?.description}</p>
            <pre>
              <code>{EXAMPLES[selectedTopic]?.code}</code>
            </pre>
          </div>
        </section>
      </main>
    </div>
  );
}
```

### Quiz: State & Computed Values

#### Two Rules of Hooks in React

1. Only call Hooks at the top level

Do not call Hooks inside loops, conditions, or nested functions. Always call them at the top of your React function, before any early returns. This ensures Hooks are called in the same order every time a component renders.

2. Only call Hooks from React functions

Call Hooks from React function components or from custom Hooks. Do not call them from regular JavaScript functions.

For example, in `App` I have this line:
```js
const [selectedTopic, setSelectedTopic] = useState('components');
```

#### The idea behind Derived State aka Computed Values

Computed values are values that shouldn't be managed as separate state since they can be derived from other states.

So they never go out of sync.

Key points:
- If you can calculate it from existing state, don't store it as its own state
- Separate storage creates sync bugs when one piece updates but the other doesn't
- Frameworks like Vue use computed(), React uses plain variables or useMemo(), Angular uses getters
- Only use memoisation (useMemo, computed) when the calculation is actually slow

Claude's example snippet (if one was used to explain):
```js
const items = [
  { name: "Apple", price: 1.50, qty: 3 },
  { name: "Bread", price: 3.00, qty: 1 }
];

// Derived. Always correct. No separate storage needed.
const totalPrice = items.reduce((sum, item) => sum + item.price * item.qty, 0);
```

### Rendering Content Conditionally

Use ternary expressions or ampersand symbols.

For example use ternary expressions is shorter:
```js
<section id="examples">
  <h2>Examples</h2>
  <menu>
    ...
  </menu>
  {selectedTopic ? (
    <div id="tab-content">
        <h3>{EXAMPLES[selectedTopic]?.title}</h3>
        <p>{EXAMPLES[selectedTopic]?.description}</p>
        <pre>
          <code>{EXAMPLES[selectedTopic]?.code}</code>
        </pre>
    </div>
  ) : (
    <p>Please select a topic to see the example.</p>
  )}
</section>
```

or use two ampersand symbols for the AND operation, though longer but can be more understandable sometimes:
```js
<section id="examples">
  <h2>Examples</h2>
  <menu>
    ...
  </menu>
  {!selectedTopic && <p>Please select a topic to see the example.</p>}
  {selectedTopic && (
    <div id="tab-content">
        <h3>{EXAMPLES[selectedTopic]?.title}</h3>
        <p>{EXAMPLES[selectedTopic]?.description}</p>
        <pre>
          <code>{EXAMPLES[selectedTopic]?.code}</code>
        </pre>
    </div>
  )}
</section>
```

Or use `tabContent` a variable to store the JSX code, so we can set the variable before we start to return the entire JSX code of the `App`. This leads to a leander JSX code:
```js
function App() {
  const [selectedTopic, setSelectedTopic] = useState();

  function handleSelect(selectedTab) {
    // selectedTopic => 'components', 'jsx', 'props', 'state'
    setSelectedTopic(selectedTab);
  }

  let tabContent = <p>Please select a topic to see the example.</p>;

  if (selectedTopic) {
    tabContent = (
      <div id="tab-content">
          <h3>{EXAMPLES[selectedTopic]?.title}</h3>
          <p>{EXAMPLES[selectedTopic]?.description}</p>
          <pre>
            <code>{EXAMPLES[selectedTopic]?.code}</code>
          </pre>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main>
        ...
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton onSelect={() => handleSelect('components')} label="Components" />
            <TabButton onSelect={() => handleSelect('jsx')} label="JSX" />
            <TabButton onSelect={() => handleSelect('props')} label="Props" />
            <TabButton onSelect={() => handleSelect('state')} label="State" />
          </menu>
          {tabContent}
        </section>
      </main>
    </div>
  );
}
```

### CSS Styling & Dynamic Styling