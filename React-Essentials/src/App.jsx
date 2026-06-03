import reactImg from "./assets/react-core-concepts.png";
import componentsImg from "./assets/components.png";
import { CORE_CONCEPTS } from "./data";

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

export default App;
