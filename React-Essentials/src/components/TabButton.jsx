export default function TabButton({ label, onSelect, isSelected }) {
  console.log('Rendering TabButton component...');
  return (
    <li>
      <button className={isSelected ? "active" : undefined} onClick={onSelect}>
        {label}
      </button>
    </li>
  );
}
