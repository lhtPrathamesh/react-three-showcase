import React from "react";

const Box = (props) => {
  return (
    <mesh position={props.meshPosition}>
      {props.pointLight && (
        <pointLight
          position={props.pointLightPosition}
          intensity={props.pointLightIntensity}
        />
      )}
      <boxBufferGeometry attach="geometry" args={props.args} />
      <meshStandardMaterial attach="material" color={props.color} />
    </mesh>
  );
};

export default Box;
