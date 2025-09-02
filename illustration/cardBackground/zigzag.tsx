import * as React from "react";
import Svg, { Polygon, Rect } from "react-native-svg";
const Zigzag = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={"100%"}
    height={"100%"}
    viewBox="0 0 120 120"
    {...props}
  >
    <Rect fill="#BB5707" width={120} height={120} />
    <Polygon
      fill="#FFFFFF"
      fillOpacity={0.1}
      points="120 0 120 60 90 30 60 0 0 0 0 0 60 60 0 120 60 120 90 90 120 60 120 0"
    />
  </Svg>
);
export default Zigzag;