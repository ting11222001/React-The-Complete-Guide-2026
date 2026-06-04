import reactImg from "../../assets/react-core-concepts.png";
import "./Header.css";

const headerDescription = ["Fundamental", "Crucial", "Core"];

function getRandomIndex(inputArrayLength) {
  return Math.floor(Math.random() * inputArrayLength); // random number between 0 and the length of the input array (exclusive)
}

export default function Header() {
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