export default function TabButton({ label, onSelect }) {
  return (
    <li>
      <button onClick={onSelect}>{label}</button>
    </li>
  );
}
