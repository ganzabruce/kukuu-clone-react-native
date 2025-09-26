interface Dark {
  text: string;
  title: string;
  background: string;
  navBackground: string;
  iconColor: string;
  iconColorFocused:string;
  uiBackground: string;
}
interface Light {
  text: string;
  title: string;
  background: string;
  navBackground: string;
  iconColor: string;
  iconColorFocused:string;
  uiBackground: string;
}
interface colorsPalette{
  primary:string;
  secondary : string;
  warning :string;
  dark: Dark;
  light: Light
}

export const Colors: colorsPalette = {
  primary: "#ddd",
  secondary:"#222222",
  warning: "#cc475a",
  
  dark: {
    text: "#d4d4d4",
    title: "#fff",
    background: "#252231",
    navBackground: "#ff9c2cff",
    iconColor: "#9591a5",
    iconColorFocused: "#fff",
    uiBackground: "#212121ff",
  },
  light: {
    text: "#625f72",
    title: "#000000ff",
    background: "#e0dfe8",
    navBackground: "#ff9c2cff",
    iconColor: "#686477",
    iconColorFocused: "#201e2b",
    uiBackground: "#d6d5e1",
  },
}