import { useState, useEffect, useCallback, useRef } from "react";
import { languages } from "../assets/languages";
import Language from "./Language";
import { getFarewellText, getRandomWord } from "../assets/utils";
import clsx from "clsx";
import Confetti from "react-confetti";

export default function Main({ updateStats, setCurrentGameInfo }) {
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guess, setGuess] = useState([]);
  const [lastKeyPressed, setLastKeyPressed] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const newGameRef = useRef(null);
  const [gameEnded, setGameEnded] = useState(false);

  const numGuessedLeft = languages.length - 1;
  const wrongGuessCount = guess.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const chanceLeft = numGuessedLeft - wrongGuessCount;
  const progressPercentage =
    ((numGuessedLeft - wrongGuessCount) / numGuessedLeft) * 100;

  const isGameWon = currentWord
    .split("")
    .every((letter) => guess.includes(letter));

  const isGameLost = wrongGuessCount >= numGuessedLeft;
  const isGameOver = isGameLost || isGameWon;

  const lastGuessed = guess[guess.length - 1];
  const isLastGuessIncorrect =
    lastGuessed && !currentWord.includes(lastGuessed);

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  // Update current game info for the side panel
  useEffect(() => {
    const correctLetters = guess.filter((letter) =>
      currentWord.includes(letter)
    );
    const wrongLetters = guess.filter(
      (letter) => !currentWord.includes(letter)
    );

    setCurrentGameInfo({
      guessedLetters: guess,
      correctLetters,
      wrongLetters,
      wordLength: currentWord.length,
      attemptsLeft: chanceLeft,
    });
  }, [guess, currentWord, chanceLeft, setCurrentGameInfo]);

  // Update stats when game ends
  useEffect(() => {
    if (isGameOver && !gameEnded) {
      updateStats(isGameWon, guess.length);
      setGameEnded(true);
    }
  }, [isGameOver, isGameWon, guess.length, updateStats, gameEnded]);

  // Keyboard event handler
  const handleKeyDown = useCallback(
    (event) => {
      if (isGameOver) {
        if (event.key === "Enter") {
          newWord();
        }
        return;
      }

      const key = event.key.toLowerCase();

      if (alphabet.includes(key)) {
        event.preventDefault();
        setLastKeyPressed(key);
        storeGuesses(key);
        setTimeout(() => setLastKeyPressed(null), 150);
      }
    },
    [isGameOver, guess]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isGameOver && newGameRef.current) {
      newGameRef.current.focus();
    }
  }, [isGameOver]);

  function storeGuesses(letter) {
    setGuess((prevLetter) =>
      prevLetter.includes(letter) ? prevLetter : [...prevLetter, letter]
    );
  }

  function newWord() {
    setCurrentWord(getRandomWord());
    setGuess([]);
    setShowHint(false);
    setGameEnded(false);
  }

  function getHint() {
    const unguessedLetters = currentWord
      .split("")
      .filter((letter) => !guess.includes(letter));
    if (unguessedLetters.length > 0) {
      const randomLetter =
        unguessedLetters[Math.floor(Math.random() * unguessedLetters.length)];
      storeGuesses(randomLetter);
      setShowHint(true);
    }
  }

  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <p className="farewell-text">
          <span className="farewell-emoji">😢</span>
          {getFarewellText(languages[wrongGuessCount - 1].name)}
        </p>
      );
    }
    if (isGameWon) {
      return (
        <>
          <h2>🎉 You Won! 🎉</h2>
          <p>Well done! You saved all programming languages!</p>
          <p className="stats-text">
            Guessed in {guess.length} attempts with {chanceLeft} lives remaining
          </p>
        </>
      );
    } else if (isGameLost) {
      return (
        <>
          <h2>💀 Game Over! 💀</h2>
          <p>Assembly has taken over...</p>
          <p className="hint-text">Better start learning Assembly! 😅</p>
        </>
      );
    }
    return null;
  }

  const gameStatusClass = clsx("status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect,
  });

  const languageChips = languages.map((language, index) => {
    const lostLanguage = index < wrongGuessCount;
    const isNextToLose = index === wrongGuessCount;
    return (
      <Language
        lostLanguage={lostLanguage}
        isNextToLose={isNextToLose && !isGameOver}
        name={language.name}
        key={language.name}
        backgroundColor={language.backgroundColor}
        color={language.color}
      />
    );
  });

  const displayWord = currentWord.split("").map((letter, index) => {
    const isRevealed = guess.includes(letter);
    const shouldReveal = isGameLost && !isRevealed;

    return (
      <span
        className={clsx("word", {
          revealed: isRevealed,
          "missed-letter": shouldReveal,
        })}
        key={index}
      >
        {isRevealed || shouldReveal ? letter : ""}
      </span>
    );
  });

  const keyBoard = alphabet.split("").map((letter, index) => {
    const isGuessed = guess.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const isPressed = lastKeyPressed === letter;

    const keyClass = clsx("letter", {
      correct: isCorrect,
      wrong: isWrong,
      pressed: isPressed,
      "not-guessed": !isGuessed && !isGameOver,
    });

    return (
      <button
        disabled={isGameOver || isGuessed}
        className={keyClass}
        key={index}
        onClick={() => storeGuesses(letter)}
        aria-disabled={isGuessed}
        aria-label={`Letter ${letter}${
          isGuessed ? (isCorrect ? ", correct" : ", incorrect") : ""
        }`}
      >
        {letter}
      </button>
    );
  });

  return (
    <>
      {isGameWon && (
        <Confetti recycle={true} numberOfPieces={200} gravity={0.1} />
      )}
      <main className="main">
        <section className={gameStatusClass} aria-live="polite" role="status">
          {renderGameStatus()}
        </section>

        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${progressPercentage}%`,
                backgroundColor:
                  progressPercentage > 50
                    ? "#10a95b"
                    : progressPercentage > 25
                    ? "#fcba29"
                    : "#ec5049",
              }}
            ></div>
          </div>
          <div className="attempts-text">
            <span className="heart-icon">❤️</span>
            <span>{chanceLeft} attempts remaining</span>
          </div>
        </div>

        <section
          className="language-wrapper"
          aria-label="Programming languages at risk"
        >
          {languageChips}
        </section>

        <section className="displayWord-section" aria-label="Word to guess">
          {displayWord}
        </section>

        <div className="correct-word">
          {isGameLost && (
            <p className="reveal-text">
              The word was: <strong>{currentWord.toUpperCase()}</strong>
            </p>
          )}
        </div>

        <section className="sr-only" aria-live="polite" role="status">
          <p>
            {currentWord.includes(lastGuessed)
              ? `Correct! The letter ${lastGuessed} is in the word.`
              : `Sorry, The letter ${lastGuessed} is not in the word.`}
            You have {numGuessedLeft - wrongGuessCount} attempts left.
          </p>
          <p>
            Current word:{" "}
            {currentWord
              .split("")
              .map((letter) =>
                guess.includes(letter) ? letter + "." : "blank."
              )
              .join(" ")}
          </p>
        </section>

        <section className="keyboard-section">
          <div className="key-board" aria-label="Letter keyboard">
            {keyBoard}
          </div>
        </section>

        <div className="action-buttons">
          {!isGameOver && !showHint && chanceLeft > 2 && (
            <button className="hint-btn" onClick={getHint}>
              <span className="btn-icon">💡</span>
              Get Hint
            </button>
          )}

          {isGameOver && (
            <button className="new-game" onClick={newWord} ref={newGameRef}>
              <span className="btn-icon">🔄</span>
              {isGameWon ? "Play Again" : "Try Again"}
              <span className="enter-hint">(Press Enter)</span>
            </button>
          )}
        </div>

        {!isGameOver && (
          <div className="keyboard-legend">
            <div className="legend-item">
              <span className="legend-color correct"></span>
              <span>Correct</span>
            </div>
            <div className="legend-item">
              <span className="legend-color wrong"></span>
              <span>Wrong</span>
            </div>
            <div className="legend-item">
              <span className="legend-color available"></span>
              <span>Available</span>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
