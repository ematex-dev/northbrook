import Svg, { Path } from "react-native-svg";
import { colors } from "../constants/theme";

// SVG path for each icon (same icons as the Northbrook design, 24x24 grid)
const PATHS = {
  home: "M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z",
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  pin: "M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  chat: "M4 5h16v11H9l-5 4z",
  phone:
    "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z",
  check: "M5 12.5l4.5 4.5L19 7.5",
  back: "M15 5l-7 7 7 7",
  arr: "M5 12h14M13 6l6 6-6 6",
  menu: "M4 7h16M4 12h16M4 17h16",
};

export default function Icon({
  name,
  color = colors.text,
  size = 22,
  width = 2,
}) {
  const d = PATHS[name];

  if (!d) {
    if (__DEV__) console.warn(`Icon: unknown name "${name}"`);
    return null;
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d={d}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
