export default function TabButton({ children, onSelect, isSelected }) {
  console.log('Rendering TabButton component...');
  return (
    <li>
      <button className={isSelected ? "active" : undefined} onClick={onSelect}>
        {children}
      </button>
    </li>
  );
}
