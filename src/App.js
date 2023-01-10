import { Suspense, useState, useRef } from "react";
import { TextureLoader } from "three";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import {
  MapControls,
  OrbitControls,
  Sky,
  Stars,
  RoundedBox,
  Html,
  PointerLockControls,
  Loader,
  Text,
} from "@react-three/drei";

import "./App.css";
import BaseCharacter from "./baseCharacter";
import { Physics, usePlane } from "@react-three/cannon";
import GifLoader from "three-gif-loader";

const loader = new GifLoader();

const Plane = () => {
  return (
    <mesh position={[0, 0, -4]} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[40, 40]} />
      <meshStandardMaterial
        attach="material"
        color={"#87868E"}
        metalness={0.5}
      />
    </mesh>
  );
};

const LeftWall = () => {
  return (
    <mesh position={[5, -19, 1]}>
      <pointLight position={[0, 40, 20]} intensity={0.8} />
      <boxBufferGeometry attach="geometry" args={[30, 2, 10]} />
      <meshStandardMaterial attach="material" color="#87868E" />
    </mesh>
  );
};

const LeftWallBlock = () => {
  return (
    <mesh position={[-15, -15, 4]}>
      <boxBufferGeometry attach="geometry" args={[10, 10, 16]} />
      <meshStandardMaterial attach="material" color="#87868E" />
    </mesh>
  );
};

const BackWall = () => {
  return (
    <mesh position={[-15, 5, 4]}>
      <boxBufferGeometry attach="geometry" args={[2, 30, 16]} />
      <meshStandardMaterial attach="material" color="#87868E" />
    </mesh>
  );
};

const BackWallImage = () => {
  const backWallImage = useLoader(TextureLoader, "/images/hello-webxr.jpg");
  return (
    <mesh position={[-13.9, 7, 4]}>
      <boxBufferGeometry attach="geometry" args={[0, 14, 8]} />
      <meshStandardMaterial map={backWallImage} />
    </mesh>
  );
};

const RightWall = () => {
  return (
    <mesh position={[-1, 20, 3]}>
      <boxBufferGeometry attach="geometry" args={[26, 2, 14]} />
      <meshStandardMaterial attach="material" color="#87868E" />
    </mesh>
  );
};

const RightWallFirstImage = () => {
  const backWallImage = useLoader(TextureLoader, "/images/frame-one.webp");
  return (
    <mesh position={[-1.7, 18.9, 3]}>
      <boxBufferGeometry attach="geometry" args={[10, 0, 5]} />
      <meshStandardMaterial map={backWallImage} />
    </mesh>
  );
};

const RightWallRightImage = () => {
  const backWallImage = useLoader(
    TextureLoader,
    "/images/right-wall-right.jpg"
  );
  return (
    <mesh position={[6.5, 18.9, 3]}>
      <boxBufferGeometry attach="geometry" args={[5, 0, 10]} />
      <meshStandardMaterial map={backWallImage} />
    </mesh>
  );
};

const RightWallLeftImage = () => {
  const backWallImage = useLoader(
    TextureLoader,
    "/images/right-wall-left.webp"
  );
  return (
    <mesh position={[-10, 18.9, 6]}>
      <boxBufferGeometry attach="geometry" args={[5, 0, 3]} />
      <meshStandardMaterial map={backWallImage} />
    </mesh>
  );
};

const RightWallLeftBottomImage = () => {
  const backWallImage = useLoader(
    TextureLoader,
    "/images/right-wall-left-bottom.jpg"
  );
  return (
    <mesh position={[-10, 18.9, 0]}>
      <boxBufferGeometry attach="geometry" args={[5, 0, 3]} />
      <meshStandardMaterial map={backWallImage} />
    </mesh>
  );
};

const RightWallBlock = () => {
  return (
    <mesh position={[15, 17, 4]}>
      <boxBufferGeometry attach="geometry" args={[10, 7, 16]} />
      <meshStandardMaterial attach="material" color="#87868E" />
    </mesh>
  );
};

const BackRoof = () => {
  return (
    <mesh position={[-8, 8, 13]} castShadow>
      <boxBufferGeometry attach="geometry" args={[16, 25, 3]} />
      <meshStandardMaterial attach="material" color="#CFD5E1" />
    </mesh>
  );
};

const BackRoofLight = () => {
  return (
    <mesh position={[-5, 8, 12.5]} castShadow>
      <boxBufferGeometry attach="geometry" args={[4, 6, 3]} />
      <meshStandardMaterial attach="material" color="#FFFFFF" />
    </mesh>
  );
};

const BackLeftRoof = () => {
  return (
    <mesh position={[-4, -12, 13]}>
      <boxBufferGeometry attach="geometry" args={[24, 16, 3]} />
      <meshStandardMaterial attach="material" color="#CFD5E1" />
    </mesh>
  );
};

const BackLeftRoofLight = () => {
  return (
    <mesh position={[-5, -6, 12.5]}>
      <boxBufferGeometry attach="geometry" args={[3, 4, 3]} />
      <meshStandardMaterial attach="material" color="#FFFFFF" />
    </mesh>
  );
};

const FrontWall = () => {
  return (
    <mesh position={[19.5, -2.3, 4]}>
      <boxBufferGeometry attach="geometry" args={[1, 31.5, 16]} />
      <meshStandardMaterial attach="material" color="#87868E" />
    </mesh>
  );
};

const FrontWallRoof = () => {
  return (
    <mesh position={[14, 0, 13]}>
      <boxBufferGeometry attach="geometry" args={[12, 40, 3]} />
      <meshStandardMaterial attach="material" color="#FFFFFF" />
    </mesh>
  );
};

const FloorColumnOneBase = () => {
  return (
    <mesh position={[4, -5, -3.9]}>
      <boxBufferGeometry attach="geometry" args={[0.9, 0.9, 0.5]} />
      <meshStandardMaterial attach="material" color="#9694A1" />
    </mesh>
  );
};

const FloorColumnOne = () => {
  return (
    <mesh position={[4, -5, -2.6]} castShadow>
      <boxBufferGeometry attach="geometry" args={[0.8, 0.8, 2.2]} />
      <meshStandardMaterial attach="material" color="#9492A0" />
    </mesh>
  );
};

const FloorColumnOneTopOne = () => {
  return (
    <mesh position={[4, -5, -1.4]} castShadow>
      <boxBufferGeometry attach="geometry" args={[0.7, 0.7, 0.2]} />
      <meshStandardMaterial attach="material" color="#FFFFFF" />
    </mesh>
  );
};

const FloorColumnOneTopTwo = () => {
  return (
    <mesh position={[4, -5, -1.15]} castShadow>
      <boxBufferGeometry attach="geometry" args={[0.8, 0.8, 0.3]} />
      <meshStandardMaterial attach="material" color="#9492A0" />
    </mesh>
  );
};

const FloorColumnOneTopThree = () => {
  return (
    <mesh position={[4, -5, -0.95]} castShadow>
      <boxBufferGeometry attach="geometry" args={[0.7, 0.7, 0.1]} />
      <meshStandardMaterial attach="material" color="#FFFFFF" />
    </mesh>
  );
};

const FloorColumnOneTopFour = () => {
  return (
    <mesh position={[4, -5, -0.81]} castShadow>
      <boxBufferGeometry attach="geometry" args={[0.8, 0.8, 0.17]} />
      <meshStandardMaterial attach="material" color="#9492A0" />
    </mesh>
  );
};

const ColumnTwoSphereOne = () => {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y = ref.current.rotation.x += 0.01));

  const sphereImage = useLoader(TextureLoader, "/images/sphere-three.png");

  return (
    <mesh position={[-1, 3, 1]} ref={ref}>
      <sphereBufferGeometry attach="geometry" args={[0.7, 20, 20]} />
      <meshStandardMaterial map={sphereImage} />
    </mesh>
  );
};

const FloorColumnTwoBase = () => {
  return (
    <mesh position={[-1, 3, -3.9]} castShadow>
      <boxBufferGeometry attach="geometry" args={[0.9, 0.9, 0.5]} />
      <meshStandardMaterial attach="material" color="#9694A1" />
    </mesh>
  );
};

const FloorColumnTwo = () => {
  return (
    <mesh position={[-1, 3, -2.6]} castShadow>
      <boxBufferGeometry attach="geometry" args={[0.8, 0.8, 2.2]} />
      <meshStandardMaterial attach="material" color="#9492A0" />
    </mesh>
  );
};

const FloorColumnTwoTopOne = () => {
  return (
    <mesh position={[-1, 3, -1.4]} castShadow>
      <boxBufferGeometry attach="geometry" args={[0.7, 0.7, 0.2]} />
      <meshStandardMaterial attach="material" color="#FFFFFF" />
    </mesh>
  );
};

const FloorColumnTwoTopTwo = () => {
  return (
    <mesh position={[-1, 3, -1.15]} castShadow>
      <boxBufferGeometry attach="geometry" args={[0.8, 0.8, 0.3]} />
      <meshStandardMaterial attach="material" color="#9492A0" />
    </mesh>
  );
};

const FloorColumnTwoTopThree = () => {
  return (
    <mesh position={[-1, 3, -0.95]}>
      <boxBufferGeometry attach="geometry" args={[0.7, 0.7, 0.1]} />
      <meshStandardMaterial attach="material" color="#FFFFFF" />
    </mesh>
  );
};

const FloorColumnTwoTopFour = () => {
  return (
    <mesh position={[-1, 3, -0.81]}>
      <boxBufferGeometry attach="geometry" args={[0.8, 0.8, 0.17]} />
      <meshStandardMaterial attach="material" color="#9492A0" />
    </mesh>
  );
};

const FloorColumnThreeBase = () => {
  return (
    <mesh position={[9, 2.5, -3.9]} castShadow>
      <boxBufferGeometry attach="geometry" args={[0.9, 0.9, 0.5]} />
      <meshStandardMaterial attach="material" color="#9694A1" />
    </mesh>
  );
};

const FloorColumnThree = () => {
  return (
    <mesh position={[9, 2.5, -2.6]} castShadow>
      <boxBufferGeometry attach="geometry" args={[0.8, 0.8, 2.2]} />
      <meshStandardMaterial attach="material" color="#9492A0" />
    </mesh>
  );
};

const FloorColumnThreeTopOne = () => {
  return (
    <mesh position={[9, 2.5, -1.4]} castShadow>
      <boxBufferGeometry attach="geometry" args={[0.7, 0.7, 0.2]} />
      <meshStandardMaterial attach="material" color="#FFFFFF" />
    </mesh>
  );
};

const FloorColumnThreeTopTwo = () => {
  return (
    <mesh position={[9, 2.5, -1.15]} castShadow>
      <boxBufferGeometry attach="geometry" args={[0.8, 0.8, 0.3]} />
      <meshStandardMaterial attach="material" color="#9492A0" />
    </mesh>
  );
};

const FloorColumnThreeTopThree = () => {
  return (
    <mesh position={[9, 2.5, -0.95]} castShadow>
      <boxBufferGeometry attach="geometry" args={[0.7, 0.7, 0.1]} />
      <meshStandardMaterial attach="material" color="#FFFFFF" />
    </mesh>
  );
};

const FloorColumnThreeTopFour = () => {
  return (
    <mesh position={[9, 2.5, -0.81]}>
      <boxBufferGeometry attach="geometry" args={[0.8, 0.8, 0.17]} />
      <meshStandardMaterial attach="material" color="#9492A0" />
    </mesh>
  );
};

const LeftTextBox = () => {
  const leftTextBoxRef = useRef();
  useFrame(
    () => (
      (leftTextBoxRef.current.rotation.z = 2.5),
      (leftTextBoxRef.current.rotation.y = 3),
      (leftTextBoxRef.current.rotation.x = 0.1)
    )
  );

  return (
    <mesh position={[4, -8, -2.9]} ref={leftTextBoxRef}>
      <boxBufferGeometry attach="geometry" args={[0.2, 3.5, 2.5]} />
      <meshStandardMaterial attach="material" color="#222222" />

      {/* <Html>
        <div className="leftTextBoxContent">360 Panoramas</div>
      </Html> */}
    </mesh>
  );
};

const LeftWallBox = () => {
  return (
    <mesh position={[1.2, -18, 6]}>
      <boxBufferGeometry attach="geometry" args={[8, 2, 4]} />
      <meshStandardMaterial attach="material" color="#222222" />
    </mesh>
  );
};

const LeftWallBoxImage = (props) => {
  const tvImage = useLoader(TextureLoader, props.leftTvImage);
  return (
    <mesh position={[1.2, -16.9, 6]}>
      <boxBufferGeometry attach="geometry" args={[7.7, 0, 3.6]} />
      <meshStandardMaterial map={tvImage} />
    </mesh>
  );
};

const TwitterLogo = (props) => {
  const tvImage = useLoader(TextureLoader, "/images/twitter-logo.png");
  return (
    <mesh position={[1.2, -17.9, 2.5]}>
      <boxBufferGeometry attach="geometry" args={[2, 0, 2]} />
      <meshStandardMaterial map={tvImage} />
    </mesh>
  );
};

function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [isInfoText, setIsInfoText] = useState(false);
  const [isInfo, setIsInfo] = useState(false);
  const [leftTvImage, setLeftTvImage] = useState("/images/webex-banner.png");

  setTimeout(() => {
    if (leftTvImage === "/images/webex-banner.png")
      setLeftTvImage("/images/tweet-one.png");
    else if (leftTvImage === "/images/tweet-one.png")
      setLeftTvImage("/images/tweet-two.jpg");
    else setLeftTvImage("/images/webex-banner.png");
  }, 4000);

  const BackWallLeftSection = () => {
    return (
      <mesh position={[-13.9, -5, 1]} onClick={() => handleTheme()}>
        <boxBufferGeometry attach="geometry" args={[0, 5, 8]} radius={0.1} />
        <meshStandardMaterial attach="material" color="#222222" />
      </mesh>
    );
  };
  const BackWallLeftImage = () => {
    const texture = loader.load(
      // resource URL
      "/images/gif.gif"
    );
    return (
      <mesh position={[-13.9, -5, 1]} onClick={() => handleTheme()}>
        <boxBufferGeometry
          attach="geometry"
          args={[0, 4.3, 7.3]}
          radius={0.1}
        />
        <meshStandardMaterial map={texture} />
      </mesh>
    );
  };

  const LeftWallGIFSection = () => {
    return (
      <mesh position={[10, -17.8, 1]} onClick={() => handleTheme()}>
        <boxBufferGeometry attach="geometry" args={[5, 0, 8]} radius={0.1} />
        <meshStandardMaterial attach="material" color="#222222" />
      </mesh>
    );
  };
  const LeftWallGIF = () => {
    const texture = loader.load(
      // resource URL
      "/images/gif.gif"
    );
    return (
      <mesh position={[10, -17.8, 1]} onClick={() => handleTheme()}>
        <boxBufferGeometry
          attach="geometry"
          args={[4.3, 0, 7.3]}
          radius={0.1}
        />
        <meshStandardMaterial map={texture} />
      </mesh>
    );
  };

  const MiddleTextSection = () => {
    const textBoxRef = useRef();
    useFrame(
      () => (
        (textBoxRef.current.rotation.z = -2.8),
        (textBoxRef.current.rotation.y = 3.1)
      )
    );

    const image = useLoader(TextureLoader, "/images/webx-info.jpg");

    return (
      <mesh position={[4, -0.5, -1]} ref={textBoxRef}>
        <boxBufferGeometry attach="geometry" args={[0, 4, 6]} />
        <meshStandardMaterial map={image} />
      </mesh>
    );
  };

  const MiddleInfoSection = () => {
    const textBoxRef = useRef();
    useFrame(
      () => (
        (textBoxRef.current.rotation.z = -2.8),
        (textBoxRef.current.rotation.y = 3.1)
      )
    );

    const image = useLoader(TextureLoader, "/images/webx-info-two.png");

    return (
      <mesh position={[4, -0.5, -1]} ref={textBoxRef}>
        <boxBufferGeometry attach="geometry" args={[0, 4, 6]} />
        <meshStandardMaterial map={image} />
      </mesh>
    );
  };

  const ColumnOneSphereOne = () => {
    const ref = useRef();
    useFrame(() => (ref.current.rotation.y = ref.current.rotation.x += 0.01));

    const sphereImage = useLoader(TextureLoader, "/images/sphere-two.jpg");

    return (
      <mesh
        position={[4, -5, 0.8]}
        ref={ref}
        onClick={() => {
          setIsInfoText(!isInfoText);
          setIsInfo(false);
        }}
      >
        <sphereBufferGeometry attach="geometry" args={[0.7, 20, 20]} />
        <meshStandardMaterial map={sphereImage} />
      </mesh>
    );
  };

  const ColumnThreeSphere = () => {
    const ref = useRef();
    useFrame(() => (ref.current.rotation.y = ref.current.rotation.x += 0.01));

    const sphereImage = useLoader(TextureLoader, "/images/sphere-one.jpg");

    return (
      <mesh
        position={[9, 2.5, 0.8]}
        ref={ref}
        onClick={() => {
          setIsInfo(!isInfo);
          setIsInfoText(false);
        }}
      >
        <sphereBufferGeometry attach="geometry" args={[0.7, 20, 20]} />
        <meshStandardMaterial map={sphereImage} />
      </mesh>
    );
  };

  const handleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <Canvas camera={{ position: [19, 1, 5], up: [0, 0, 1], far: 100 }} shadows>
      <ambientLight intensity={0.9} />
      <spotLight penumbra={0.5} position={[10, -10, 5]} castShadow />

      <Suspense fallback={null}>
        <Sky
          distance={450000}
          sunPosition={darkTheme ? [0, 0, 0] : [0, 1, 0]}
          inclination={0}
          azimuth={0.25}
        />

        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
        />

        <LeftWall />
        <LeftWallBlock />
        <LeftWallGIF />
        <LeftWallGIFSection />

        <BackWall />
        <BackWallImage />
        <BackWallLeftSection />
        <BackWallLeftImage handleTheme={handleTheme} />

        <RightWall />
        <RightWallFirstImage />
        <RightWallLeftImage />
        <RightWallLeftBottomImage />
        <RightWallRightImage />
        <RightWallBlock />

        <BackRoof />
        <BackRoofLight />
        <BackLeftRoof />
        <BackLeftRoofLight />

        <FrontWall />
        <FrontWallRoof />

        <FloorColumnOneBase />
        <FloorColumnOne />
        <FloorColumnOneTopOne />
        <FloorColumnOneTopTwo />
        <FloorColumnOneTopThree />
        <FloorColumnOneTopFour />

        <FloorColumnTwoBase />
        <FloorColumnTwo />
        <FloorColumnTwoTopOne />
        <FloorColumnTwoTopTwo />
        <FloorColumnTwoTopThree />
        <FloorColumnTwoTopFour />

        <FloorColumnThreeBase />
        <FloorColumnThree />
        <FloorColumnThreeTopOne />
        <FloorColumnThreeTopTwo />
        <FloorColumnThreeTopThree />
        <FloorColumnThreeTopFour />

        <ColumnThreeSphere />
        <ColumnTwoSphereOne />
        <ColumnOneSphereOne />

        <LeftTextBox />

        <LeftWallBox />
        <LeftWallBoxImage leftTvImage={leftTvImage} />
        <TwitterLogo />

        {isInfoText && <MiddleTextSection />}
        {isInfo && <MiddleInfoSection />}
      </Suspense>

      {/* <MapControls /> */}
      <OrbitControls />
      <Plane />

      <directionalLight
        intensity={0.5}
        castShadow // highlight-line
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
      />

      {/* <PointerLockControls /> */}
      {/* <Loader /> */}

      {/* <Physics gravity={[0, -9.8, 0]}>
        <BaseCharacter
          controls
          position={[0, 2, 0]}
          args={[0.5]}
          color="yellow"
        />
        <Plane />
      </Physics> */}
    </Canvas>
  );
}

export default App;
