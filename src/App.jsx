import { useState, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import StatsPanel from "./components/StatsPanel";
import InfoPanel from "./components/InfoPanel";

export default function App() {
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem("assemblyEndgameStats");
    return saved
      ? JSON.parse(saved)
      : {
          gamesPlayed: 0,
          gamesWon: 0,
          gamesLost: 0,
          currentStreak: 0,
          bestStreak: 0,
          totalGuesses: 0,
          bestGame: null,
          lastPlayed: null,
          letterAccuracy: {},
        };
  });

  const [currentGameInfo, setCurrentGameInfo] = useState({
    guessedLetters: [],
    correctLetters: [],
    wrongLetters: [],
    wordLength: 0,
    attemptsLeft: 8,
  });

  const [showLeftPanel, setShowLeftPanel] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(false);

  // Save stats to localStorage
  useEffect(() => {
    localStorage.setItem("assemblyEndgameStats", JSON.stringify(stats));
  }, [stats]);

  const updateStats = (won, guessCount) => {
    setStats((prev) => {
      const newStats = {
        ...prev,
        gamesPlayed: prev.gamesPlayed + 1,
        gamesWon: won ? prev.gamesWon + 1 : prev.gamesWon,
        gamesLost: !won ? prev.gamesLost + 1 : prev.gamesLost,
        currentStreak: won ? prev.currentStreak + 1 : 0,
        bestStreak: won
          ? Math.max(prev.bestStreak, prev.currentStreak + 1)
          : prev.bestStreak,
        totalGuesses: prev.totalGuesses + guessCount,
        bestGame:
          won && (!prev.bestGame || guessCount < prev.bestGame)
            ? guessCount
            : prev.bestGame,
        lastPlayed: new Date().toISOString(),
      };
      return newStats;
    });
  };

  const resetStats = () => {
    if (window.confirm("Are you sure you want to reset all statistics?")) {
      const freshStats = {
        gamesPlayed: 0,
        gamesWon: 0,
        gamesLost: 0,
        currentStreak: 0,
        bestStreak: 0,
        totalGuesses: 0,
        bestGame: null,
        lastPlayed: null,
        letterAccuracy: {},
      };
      setStats(freshStats);
    }
  };

  return (
    <div className="app-container">
      <div className="background-effects">
        <div className="grid-overlay"></div>
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
        <div className="glow-orb orb-4"></div>
      </div>

      {/* Mobile Panel Toggles */}
      <div className="mobile-panel-toggles">
        <button
          className={`panel-toggle left ${showLeftPanel ? "active" : ""}`}
          onClick={() => setShowLeftPanel(!showLeftPanel)}
          aria-label="Toggle statistics panel"
        >
          📊
        </button>
        <button
          className={`panel-toggle right ${showRightPanel ? "active" : ""}`}
          onClick={() => setShowRightPanel(!showRightPanel)}
          aria-label="Toggle info panel"
        >
          ❓
        </button>
      </div>

      <div className="game-layout">
        {/* Left Panel - Statistics */}
        <StatsPanel
          stats={stats}
          resetStats={resetStats}
          isVisible={showLeftPanel}
          onClose={() => setShowLeftPanel(false)}
        />

        {/* Main Game */}
        <div className="component-wrapper">
          <Header />
          <Main
            updateStats={updateStats}
            setCurrentGameInfo={setCurrentGameInfo}
          />
        </div>

        {/* Right Panel - Info */}
        <InfoPanel
          currentGameInfo={currentGameInfo}
          isVisible={showRightPanel}
          onClose={() => setShowRightPanel(false)}
        />
      </div>
    </div>
  );
}
