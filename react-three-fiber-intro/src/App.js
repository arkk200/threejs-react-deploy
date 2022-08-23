import './App.css';
import { Canvas } from 'react-three-fiber';
import { Physics } from '@react-three/cannon';
import { Suspense } from 'react';

import Orbit from './components/Orbit';
import Background from './components/Background';
import Floor from './components/Floor';
import Bulb from './components/Bulb';
import ColorPicker from './components/ColorPicker';
import Cars from './components/Cars';
import CameraControls from './components/CameraControls';

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ColorPicker />
      <Canvas
        shadows
        style={{ background: 'black' }}
        camera={{ position: [7, 7, 7] }}
      >
        <CameraControls />
        <ambientLight intensity={0.2} />
        <Orbit />
        <axesHelper args={[5]} />
        {/* Physics를 사용하려면 mesh에 physics 속성을 추가해야한다. */}
        <Bulb position={[0, 3, 0]} />
        <Physics>
          <Cars />
          <Suspense fallback={null}>
            <Background />
          </Suspense>
          <Floor position={[0, -0.5, 0]} />
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
