import reactImg from "./assets/react-core-concepts.png";
import componentsImg from "./assets/components.png";

const headerDescription = ["Fundamental", "Crucial", "Core"];

function getRandomIndex(inputArrayLength) {
  return Math.floor(Math.random() * inputArrayLength); // random number between 0 and the length of the input array (exclusive)
}

function Header() {
  const randomDescription =
    headerDescription[getRandomIndex(headerDescription.length)];
  return (
    <header>
      <img
        src={reactImg}
        alt="Stylized atom"
      />
      <h1>React Essentials</h1>
      <p>
        {randomDescription} React concepts you will need for almost any app you
        are going to build!
      </p>
    </header>
  );
}

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
            <CoreConcept
              title="Props"
              description="Passing data to components"
              image={componentsImg}
            />
            <CoreConcept
              title="State"
              description="Managing and responding to changes"
              image={componentsImg}
            />
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
