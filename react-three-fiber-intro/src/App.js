import logo from './logo.svg';
import './App.css';
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  useLoader
} from 'react-three-fiber';
import { useRef, Suspense } from 'react';
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
};

const Box = props => {
  const ref = useRef();
  // texture를 쓰기위해선 useLoader라는 훅을 써야한다.
  // useLoader에는 차례대로 THREE의 TextureLoader, 사진 위치가 인자로 들어간다.
  const texture = useLoader(
    THREE.TextureLoader,
    '/wood.jpg'
  );
  useFrame(state => {
    // *useFrame안에는 state 함수를 넣으면 안된다.
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  })
  return (
    <mesh
      ref={ref}
      {...props}
      castShadow
      // receiveShadow
    >
      <sphereBufferGeometry />
      <meshPhysicalMaterial
        map={texture}
      />
    </mesh>
  );
};

const Background = props => {
  const texture = useLoader(
    THREE.TextureLoader,
    '/autoshop.jpg'
  );

  // fromEquirectangularTexture()에 필요한 WebGLRenderer를 가지고 옴
  const { gl } = useThree();

  // WebGLCubeRenderTarget을 이용해서 스카이맵을 만들 수 있다.
  const formatted = new THREE.WebGLCubeRenderTarget(
    texture.image.height
  // fromEquirectangularTexture는 정방형 파노라마를 큐브맵 형식으로 변환할 때 사용한다. 
  ).fromEquirectangularTexture(gl, texture);

  return (
    // primitive는 R3F에서 가장 기본적인 Object와도 같은 놈이다.
    // object라는 속성을 가지고 있는데 안에 텍스쳐를 넣을 수 있다.
    // 이것을 Scene의 background 속성으로 넣기 위해선 attach를 이용해야 한다.
    <primitive
      attach="background"
      object={formatted.texture}
    />
  );
};

const Floor = props => {
  return(
    <mesh {...props} receiveShadow >
      <boxBufferGeometry args={[20, 1, 10]} />
      <meshPhysicalMaterial />
    </mesh>
  );
};

const Bulb = props => {
  return(
    <mesh {...props}>
      <pointLight castShadow />
      <sphereBufferGeometry args={[0.2, 20, 20]} />
      <meshPhongMaterial emissive='yellow' />
    </mesh>
  );
};

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
        <Suspense fallback={null}
        // Suspense는 기본적으로 구성요소를 렌더링하기 전에
        // 모든 비동기 동작이 발생할 때까지 기다린다.
        // 텍스쳐가 로드될 때까지 기다리고 박스를 렌더링함
        // 현재 버전에선 없어도 무방함
        >
          <Box position={[0, 1, 0]} />
        </Suspense>
        <Suspense fallback={null}>
          <Background />
        </Suspense>
        <Floor position={[0, -0.5, 0]} />
      </Canvas>
    </div>
  );
}

export default App;
