import componentsImg from "./assets/components.png";
import Header from "./components/Header/Header";
import CoreConcept from "./components/CoreConcept";
import { CORE_CONCEPTS, EXAMPLES } from "./data";
import TabButton from "./components/TabButton";
import { useState } from "react";

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

  console.log("Rendering App component...");

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
            <CoreConcept {...CORE_CONCEPTS[3]} />
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton
              isSelected={selectedTopic === "components"}
              onSelect={() => handleSelect("components")}
              label="Components"
            />
            <TabButton
              isSelected={selectedTopic === "jsx"}
              onSelect={() => handleSelect("jsx")}
              label="JSX"
            />
            <TabButton
              isSelected={selectedTopic === "props"}
              onSelect={() => handleSelect("props")}
              label="Props"
            />
            <TabButton
              isSelected={selectedTopic === "state"}
              onSelect={() => handleSelect("state")}
              label="State"
            />
          </menu>
          {tabContent}
        </section>
      </main>
    </div>
  );
}

export default App;
