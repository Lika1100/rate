export function HoursSquare({ events, isFutureEvent, className, title }) {
  const opacity = isFutureEvent ? 0.4 : 1;
  const hours = events.reduce((acc, { duration }) => acc + duration, 0) / 60;
  const color = hours / 7.5 * 65;

  return (
    <span
      className={className}
      style={{
        opacity,
        background: hours > 0
          ? `linear-gradient(to top, hsla(120, 100%, ${color}%, 1), hsla(180, 100%, ${color}%, 1))`
          : undefined,
        fontSize: 8,
        lineHeight: 2,
      }}
      title={title}
    >
      {hours > 0 && Number(hours.toFixed(1))}
    </span>
  );
}