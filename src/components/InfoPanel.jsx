import { languages } from "../assets/languages";

export default function InfoPanel({ currentGameInfo, isVisible, onClose }) {
  const {
    guessedLetters,
    correctLetters,
    wrongLetters,
    wordLength,
    attemptsLeft,
  } = currentGameInfo;

  return (
    <aside className={`side-panel right-panel ${isVisible ? "visible" : ""}`}>
      <button className="panel-close mobile-only" onClick={onClose}>
        ✕
      </button>

      <div className="panel-header">
        <div className="panel-icon">🎮</div>
        <h2>Game Info</h2>
      </div>

      {/* Current Game Status */}
      <div className="current-game-section">
        <h3>Current Game</h3>
        <div className="game-info-grid">
          <div className="game-info-card">
            <div className="info-icon">📏</div>
            <div className="info-content">
              <div className="info-value">{wordLength}</div>
              <div className="info-label">Letters</div>
            </div>
          </div>
          <div className="game-info-card">
            <div className="info-icon">❤️</div>
            <div className="info-content">
              <div className="info-value">{attemptsLeft}</div>
              <div className="info-label">Lives Left</div>
            </div>
          </div>
          <div className="game-info-card">
            <div className="info-icon">✅</div>
            <div className="info-content">
              <div className="info-value">{correctLetters.length}</div>
              <div className="info-label">Correct</div>
            </div>
          </div>
          <div className="game-info-card">
            <div className="info-icon">❌</div>
            <div className="info-content">
              <div className="info-value">{wrongLetters.length}</div>
              <div className="info-label">Wrong</div>
            </div>
          </div>
        </div>
      </div>

      {/* Guessed Letters */}
      <div className="guessed-letters-section">
        <h3>Guessed Letters</h3>
        <div className="letters-container">
          {guessedLetters.length > 0 ? (
            <div className="letters-list">
              {guessedLetters.map((letter, index) => (
                <span
                  key={index}
                  className={`letter-badge ${
                    correctLetters.includes(letter) ? "correct" : "wrong"
                  }`}
                >
                  {letter}
                </span>
              ))}
            </div>
          ) : (
            <p className="no-letters">No letters guessed yet</p>
          )}
        </div>
      </div>

      {/* How to Play */}
      <div className="how-to-play-section">
        <h3>How to Play</h3>
        <ol className="instructions-list">
          <li>
            <span className="step-number">1</span>
            <span>Guess the hidden word by selecting letters</span>
          </li>
          <li>
            <span className="step-number">2</span>
            <span>Use your keyboard or click the letter buttons</span>
          </li>
          <li>
            <span className="step-number">3</span>
            <span>Each wrong guess eliminates a programming language</span>
          </li>
          <li>
            <span className="step-number">4</span>
            <span>Win before Assembly is the last language standing!</span>
          </li>
        </ol>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="shortcuts-section">
        <h3>⌨️ Keyboard Shortcuts</h3>
        <div className="shortcuts-list">
          <div className="shortcut-item">
            <kbd>A-Z</kbd>
            <span>Guess a letter</span>
          </div>
          <div className="shortcut-item">
            <kbd>Enter</kbd>
            <span>New game (when game over)</span>
          </div>
        </div>
      </div>

      {/* Languages at Stake */}
      <div className="languages-stake-section">
        <h3>🌐 Languages at Stake</h3>
        <div className="languages-mini-list">
          {languages.map((lang, index) => (
            <div
              key={lang.name}
              className="lang-mini-item"
              style={{
                backgroundColor: lang.backgroundColor,
                color: lang.color,
              }}
            >
              <span className="lang-order">{index + 1}</span>
              <span className="lang-name">{lang.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Fun Fact */}
      <div className="fun-fact-section">
        <div className="fun-fact-card">
          <div className="fact-icon">💡</div>
          <div className="fact-content">
            <h4>Did you know?</h4>
            <p>
              Assembly language is one of the oldest programming languages,
              first appearing in the 1940s!
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
