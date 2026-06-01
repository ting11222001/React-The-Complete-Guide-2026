const headerDescription = ['Fundamental', 'Crucial', 'Core'];

function getRandomIndex(inputArrayLength) {
  return Math.floor(Math.random() * inputArrayLength); // random number between 0 and the length of the input array (exclusive)
}

function Header() {
  const randomDescription = headerDescription[getRandomIndex(headerDescription.length)];
  return (
    <header>
      <img src="src/assets/react-core-concepts.png" alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {randomDescription} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}

function App() {
  return (
    <div>
      <Header />
      <main>
        <h2>Time to get started!</h2>
      </main>
    </div>
  );
}

export default App;
