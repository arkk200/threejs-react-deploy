import logo from './logo.svg';
import './App.css';
import { Canvas, useFrame, useThree, extend } from 'react-three-fiber';
import { useRef } from 'react';
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls';

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
      receiveShadow
    >
      <boxBufferGeometry />
      <meshPhysicalMaterial color='blue' />
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
        camera={{ position: [3, 3, 3] }}
      >
        <ambientLight intensity={0.2} />
        <Bulb position={[0, 3, 0]} />
        <Orbit />
        <axesHelper args={[5]} />
        <Box position={[-1, 1, 2]} />
        <Floor position={[0, -0.5, 0]} />
      </Canvas>
    </div>
  );
}

export default App;
