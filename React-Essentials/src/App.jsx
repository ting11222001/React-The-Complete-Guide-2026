import componentsImg from "./assets/components.png";
import Header from "./components/Header/Header";
import CoreConcept from "./components/CoreConcept";
import { CORE_CONCEPTS } from "./data";
import TabButton from "./components/TabButton";

function App() {
  let tabContent = 'Please click a tab to see the content!';

  function handleSelect(selectedTab) {
    // selectedTab => 'components', 'jsx', 'props', 'state'
    // console.log(`You clicked the ${selectedTab} tab!`);
    tabContent = selectedTab;
    console.log(tabContent);
  }

  console.log('Rendering App component...');

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

export default App;
