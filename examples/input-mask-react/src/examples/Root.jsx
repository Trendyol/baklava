import { Link } from 'react-router-dom';

export default function Root() {
  return (
    <main>
      <h1>Input Masking Libraries & Baklava Integration Examples</h1>

      <nav>
        <ul>
          <li>
            <Link to="maskito">Maskito</Link>
          </li>
          <li>
            <Link to="imask">IMask</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
