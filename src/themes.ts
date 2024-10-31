export type Theme = {
  name: string;
  backgroundColor: string;
  color: string;
  borderColor: string;
};

export const themes: Record<string, Theme> = {
  light: {
    name: "Sewing Tin Light",
    backgroundColor: "#fff",
    color: "#385eca",
    borderColor: "#2d2076",
  },
  dark: {
    name: "Shadow",
    backgroundColor: "#181818",
    color: "#eee",
    borderColor: "#444",
  },
  contrast: {
    name: "High Contrast",
    backgroundColor: "#000",
    color: "#d1ffcd",
    borderColor: "#15ff00",
  },
};
