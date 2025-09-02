import * as React from "react";
import Svg, {
    Circle,
    Defs,
    G,
    RadialGradient,
    Rect,
    Stop,
} from "react-native-svg";
const BarmudaCircel = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" {...props}>
    <Rect fill="#ff0000" width={1000} height={1000} />
    <Defs>
      <RadialGradient
        id="a"
        cx={500}
        cy={500}
        r="60%"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0} stopColor="#ff0000" />
        <Stop offset={1} stopColor="#900" />
      </RadialGradient>
      <RadialGradient
        id="b"
        cx={500}
        cy={500}
        r="70%"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0} stopColor="#FF0" stopOpacity={1} />
        <Stop offset={1} stopColor="#FF0" stopOpacity={0} />
      </RadialGradient>
    </Defs>
    <Rect fill="url(#a)" width={1000} height={1000} />
    <G
      fill="none"
      stroke="#F40"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeOpacity={0.5}
    >
      <Circle cx={500} cy={500} r={725} />
      <Circle cx={500} cy={500} r={700} />
      <Circle cx={500} cy={500} r={675} />
      <Circle cx={500} cy={500} r={650} />
      <Circle cx={500} cy={500} r={625} />
      <Circle cx={500} cy={500} r={600} />
      <Circle cx={500} cy={500} r={575} />
      <Circle cx={500} cy={500} r={550} />
      <Circle cx={500} cy={500} r={525} />
      <Circle cx={500} cy={500} r={500} />
      <Circle cx={500} cy={500} r={475} />
      <Circle cx={500} cy={500} r={450} />
      <Circle cx={500} cy={500} r={425} />
      <Circle cx={500} cy={500} r={400} />
      <Circle cx={500} cy={500} r={375} />
      <Circle cx={500} cy={500} r={350} />
      <Circle cx={500} cy={500} r={325} />
      <Circle cx={500} cy={500} r={300} />
      <Circle cx={500} cy={500} r={275} />
      <Circle cx={500} cy={500} r={250} />
      <Circle cx={500} cy={500} r={225} />
      <Circle cx={500} cy={500} r={200} />
      <Circle cx={500} cy={500} r={175} />
      <Circle cx={500} cy={500} r={150} />
      <Circle cx={500} cy={500} r={125} />
      <Circle cx={500} cy={500} r={100} />
      <Circle cx={500} cy={500} r={75} />
      <Circle cx={500} cy={500} r={50} />
      <Circle cx={500} cy={500} r={25} />
    </G>
    <Rect fillOpacity={0.5} fill="url(#b)" width={1000} height={1000} />
  </Svg>
);
export default BarmudaCircel;
