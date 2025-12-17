export default function StatsPanel({ stats, resetStats, isVisible, onClose }) {
  const winRate =
    stats.gamesPlayed > 0
      ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
      : 0;

  const avgGuesses =
    stats.gamesWon > 0 ? Math.round(stats.totalGuesses / stats.gamesWon) : 0;

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <aside className={`side-panel left-panel ${isVisible ? "visible" : ""}`}>
      <button className="panel-close mobile-only" onClick={onClose}>
        ✕
      </button>

      <div className="panel-header">
        <div className="panel-icon">📊</div>
        <h2>Statistics</h2>
      </div>

      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-value">{stats.gamesPlayed}</div>
          <div className="stat-label">Games Played</div>
        </div>

        <div className="stat-card success">
          <div className="stat-value">{stats.gamesWon}</div>
          <div className="stat-label">Wins</div>
        </div>

        <div className="stat-card danger">
          <div className="stat-value">{stats.gamesLost}</div>
          <div className="stat-label">Losses</div>
        </div>

        <div className="stat-card info">
          <div className="stat-value">{winRate}%</div>
          <div className="stat-label">Win Rate</div>
        </div>
      </div>

      {/* Win Rate Visual */}
      <div className="win-rate-section">
        <h3>Win Rate</h3>
        <div className="win-rate-bar">
          <div className="win-rate-fill" style={{ width: `${winRate}%` }}></div>
        </div>
        <div className="win-rate-labels">
          <span>0%</span>
          <span>{winRate}%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Streak Section */}
      <div className="streak-section">
        <h3>🔥 Streaks</h3>
        <div className="streak-cards">
          <div className="streak-card">
            <div className="streak-icon">⚡</div>
            <div className="streak-info">
              <div className="streak-value">{stats.currentStreak}</div>
              <div className="streak-label">Current</div>
            </div>
          </div>
          <div className="streak-card best">
            <div className="streak-icon">🏆</div>
            <div className="streak-info">
              <div className="streak-value">{stats.bestStreak}</div>
              <div className="streak-label">Best</div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Section */}
      <div className="performance-section">
        <h3>📈 Performance</h3>
        <div className="performance-list">
          <div className="performance-item">
            <span className="perf-label">Average Guesses</span>
            <span className="perf-value">{avgGuesses || "-"}</span>
          </div>
          <div className="performance-item">
            <span className="perf-label">Best Game</span>
            <span className="perf-value highlight">
              {stats.bestGame ? `${stats.bestGame} guesses` : "-"}
            </span>
          </div>
          <div className="performance-item">
            <span className="perf-label">Last Played</span>
            <span className="perf-value">{formatDate(stats.lastPlayed)}</span>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="achievements-section">
        <h3>🎖️ Achievements</h3>
        <div className="achievements-grid">
          <div
            className={`achievement ${
              stats.gamesPlayed >= 1 ? "unlocked" : ""
            }`}
            title="Play your first game"
          >
            🎮
          </div>
          <div
            className={`achievement ${stats.gamesWon >= 1 ? "unlocked" : ""}`}
            title="Win your first game"
          >
            🏅
          </div>
          <div
            className={`achievement ${stats.gamesWon >= 10 ? "unlocked" : ""}`}
            title="Win 10 games"
          >
            ⭐
          </div>
          <div
            className={`achievement ${stats.bestStreak >= 3 ? "unlocked" : ""}`}
            title="Get a 3 win streak"
          >
            🔥
          </div>
          <div
            className={`achievement ${stats.bestStreak >= 5 ? "unlocked" : ""}`}
            title="Get a 5 win streak"
          >
            💎
          </div>
          <div
            className={`achievement ${
              stats.bestGame && stats.bestGame <= 10 ? "unlocked" : ""
            }`}
            title="Win with 10 or fewer guesses"
          >
            🚀
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <button className="reset-stats-btn" onClick={resetStats}>
        <span className="btn-icon">🔄</span>
        Reset Statistics
      </button>
    </aside>
  );
}
