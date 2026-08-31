/** Email palette, pulled from the site tokens in globals.css (dark editorial). */
export const colors = {
  bg: "#0e0d0b",
  card: "#151410",
  panel: "#1b1a15",
  text: "#edeae1",
  muted: "#928c80",
  faint: "#3a372f",
  border: "#26241d",
  brand: "#ea3a28",
} as const;

/** Geist can't be embedded reliably in mail, so fall back to a clean grotesk. */
export const fontFamily =
  "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export const site = {
  name: "Lance Candelaria",
  role: "Solutions Designer / Product Engineer",
  url: "https://portfolio.lanceamiel.site",
  replyWithin: "I reply within 24 hours.",
} as const;
