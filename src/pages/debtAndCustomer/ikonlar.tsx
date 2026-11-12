export const ICON_PATHS = {
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35",
  wallet: "M3 6h18v12H3zM3 10h18M16 14h2",
  money: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  alarm: "M12 8v5l3 2M5 3 2 6M22 6l-3-3M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16z",
  send: "M22 2 11 13M22 2l-7 20-4-9-9-4z",
  filter: "M22 3H2l8 9.46V19l4 2v-8.54z",
  card: "M3 6h18v12H3zM3 10h18",
  message: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  phone:
    "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z",
  history: "M12 8v4l3 2M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5",
  plus: "M12 5v14M5 12h14",
  left: "M15 18l-6-6 6-6",
  right: "M9 18l6-6-6-6",
  edit: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z",
  trash: "M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14",
  x: "M18 6 6 18M6 6l12 12",
};

export type IconName = keyof typeof ICON_PATHS;

export const Icon = ({ name, className = "h-4 w-4" }: { name: IconName; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d={ICON_PATHS[name]} />
  </svg>
);
