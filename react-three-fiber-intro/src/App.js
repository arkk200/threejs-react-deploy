import logo from './logo.svg';
import './App.css';
import { Canvas, useFrame, useThree, extend } from 'react-three-fiber';
import { useRef } from 'react';
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

extend({ OrbitControls });

const Orbit = () => {
  const { camera, gl } = useThree();
  return (
    <orbitControls args={[camera, gl.domElement]} />
  );
}

const Box = props => {
  const ref = useRef();
  useFrame(state => {
    // *useFrame안에는 state 함수를 넣으면 안된다.
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  })
  return (
    <mesh
      ref={ref}
      {...props}
      // castShadow로 그림자를 생성하고
      castShadow
      // receiveShadow로 그림자를 받음
      // receiveShadow
    >
      <boxBufferGeometry />
      <meshPhysicalMaterial
        color='white'
        // material에 fog 속성을 false로 바꾸면 fog의 영향을 안 받는다.
        // fog={false}

        // transparent로 투명도를 줄 것인지 결정할 수 있고 opacity로 조절할 수 있다.
        opacity={0.5}
        transparent

        // visible로 보일지 말지 정해줄 수 있다.
        // visible={false}

        // wireframe은 geometry의 wireframe을 보여준다.
        // wireframe

        // metalness는 메탈처럼 보이는 정도를 나타낸다. 기본값: 0.0
        // metalness={1}

        // roughness는 표면 거칠기 정도를 나타낸다. 기본값: 1
        roughness={0}

        // clearcoat는 표면위에 얇고 반투명한 층이 있는 것처럼 보이게 만든다. 기본값: 0
        clearcoat={1}

        // transmission은 투과도를 나타낸다. 기본값: 0
        // transmission이 반영되기 위해선 transparent가 true여야 한다.
        // transmission을 활용하여 유리재질을 만들 수 있다.
        transmission={0.5}

        // reflectivity는 반사 정도를 나타낸다. 기본값: 0.5
        reflectivity={1}

        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

const Floor = props => {
  return(
    <mesh {...props} receiveShadow >
      <boxBufferGeometry args={[20, 1, 10]} />
      <meshPhysicalMaterial />
    </mesh>
  );
}

const Bulb = props => {
  return(
    <mesh {...props}>
      <pointLight castShadow />
      <sphereBufferGeometry args={[0.2, 20, 20]} />
      <meshPhongMaterial emissive='yellow' />
    </mesh>
  );
}

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas
        // shadows설정을 해줘야 그림자가 생김
        shadows
        style={{ background: 'black' }}
        camera={{ position: [1, 5, 1] }}
      >
        {/* 각각의 인자는 [color, near, far] 이다. */}
        <fog attach='fog' args={['white', 1, 10]} />
        <ambientLight intensity={0.2} />
        <Bulb position={[0, 3, 0]} />
        <Orbit />
        <axesHelper args={[5]} />
        <Box position={[0, 1, 0]} />
        <Floor position={[0, -0.5, 0]} />
      </Canvas>
    </div>
  );
}

export default App;
