export default function Header() {
  return (
    <header>
      <div className="logo-container">
        <span className="logo-icon">⚙️</span>
        <h1>
          Assembly: <span className="highlight">EndGame</span>
        </h1>
      </div>
      <p className="tagline">
        Guess the word within <strong>8 attempts</strong> to keep the
        programming world safe from Assembly!
      </p>
      {/* <div className="keyboard-hint">
        <span className="hint-icon">⌨️</span>
        <span>Use your keyboard or click the letters below</span>
      </div> */}
    </header>
  );
}