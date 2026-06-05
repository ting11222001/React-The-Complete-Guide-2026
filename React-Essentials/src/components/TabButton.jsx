export default function TabButton({ label, onSelect }) {
  console.log('Rendering TabButton component...');
  return (
    <li>
      <button onClick={onSelect}>{label}</button>
    </li>
  );
}
