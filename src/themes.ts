export type Theme = {
  name: string;
  backgroundColor: string;
  color: string;
  borderColor: string;
};

export const themes: Record<string, Theme> = {
  light: {
    name: "Sewing Tin Light",
    backgroundColor: "#fafafa",
    color: "#333",
    borderColor: "#ddd",
  },
  dark: {
    name: "Shadow",
    backgroundColor: "#1e1e1e",
    color: "#f1f1f1",
    borderColor: "#444",
  },
  contrast: {
    name: "High Contrast",
    backgroundColor: "#000",
    color: "#00ff00",
    borderColor: "#00ff00",
  },
};
