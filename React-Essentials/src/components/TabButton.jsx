export default function TabButton({ label, onSelect }) {
  console.log(`Rendering TabButton component with label: ${label}`);
  return (
    <li>
      <button onClick={onSelect}>{label}</button>
    </li>
  );
}
