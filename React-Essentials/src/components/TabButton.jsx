export default function TabButton({ label }) {
    function handleClick() {
        console.log(`You clicked the ${label} tab!`);
    }
    return (
        <li>
        <button onClick={handleClick}>{label}</button>
        </li>
    );
}
