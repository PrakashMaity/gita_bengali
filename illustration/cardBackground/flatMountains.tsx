import * as React from "react";
import Svg, { Polygon, Rect } from "react-native-svg";
const FlatMountains = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" {...props}>
    <Rect fill="#ff7700" width={1600} height={900} />
    <Polygon fill="#cc0000" points="957 450 539 900 1396 900" />
    <Polygon fill="#aa0000" points="957 450 872.9 900 1396 900" />
    <Polygon fill="#d6002b" points="-60 900 398 662 816 900" />
    <Polygon fill="#b10022" points="337 900 398 662 816 900" />
    <Polygon fill="#d9004b" points="1203 546 1552 900 876 900" />
    <Polygon fill="#b2003d" points="1203 546 1552 900 1162 900" />
    <Polygon fill="#d3006c" points="641 695 886 900 367 900" />
    <Polygon fill="#ac0057" points="587 900 641 695 886 900" />
    <Polygon fill="#c4008c" points="1710 900 1401 632 1096 900" />
    <Polygon fill="#9e0071" points="1710 900 1401 632 1365 900" />
    <Polygon fill="#aa00aa" points="1210 900 971 687 725 900" />
    <Polygon fill="#880088" points="943 900 1210 900 971 687" />
  </Svg>
);
export default FlatMountains;
