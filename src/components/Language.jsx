import clsx from "clsx";

export default function Language({
  name,
  backgroundColor,
  color,
  lostLanguage,
  isNextToLose,
}) {
  const styles = {
    backgroundColor: backgroundColor,
    color: color,
  };

  const chipClass = clsx("chip", {
    lost: lostLanguage,
    "next-to-lose": isNextToLose,
  });

  return (
    <span
      style={styles}
      className={chipClass}
      aria-label={`${name}${lostLanguage ? " - lost" : ""}`}
    >
      {name}
      {lostLanguage && <span className="skull-overlay">💀</span>}
    </span>
  );
}
