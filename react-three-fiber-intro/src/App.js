import logo from './logo.svg';
import './App.css';
import { Canvas, useFrame, useThree, extend } from 'react-three-fiber';
import { useRef } from 'react';
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls';

// OrbitControls를 R3F로 확장시켜서 JSX에서 쓸 수 있게 해줘야 된다.
extend({ OrbitControls });

const Orbit = () => {
  // 컴포넌트에 three.js의 특정한 것을 알려줘야할 때 useThree 등등을 훅을 쓸 수 있다.
  const { camera, gl } = useThree();
  return (
    // *소문자로 시작해야함
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
      // Box컴포넌트의 props를 통해 mesh의 props를 전달할 수 있음
      // 객체형태로 받기에 스프레드 연산자를 사용하여 요소만 받음
      {...props}
    >
      <boxBufferGeometry />
      <meshBasicMaterial color='blue' />
    </mesh>
  );
}

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas
        style={{ background: 'black' }}
        camera={{ position: [3, 3, 3] }}
      >
        <Box position={[-1, 1, 2]} />
        <Orbit />

        <axesHelper args={[5]}
        // red: X Axis, green: Y Axis, blue: Z Axis
        />
      </Canvas>
    </div>
  );
}

export default App;
