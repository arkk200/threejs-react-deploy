import './App.css';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { Suspense } from 'react';

import Orbit from './components/Orbit';
import Background from './components/Background';
import Floor from './components/Floor';
import Bulb from './components/Bulb';
import ColorPicker from './components/ColorPicker';
import Cars from './components/Cars';
import CameraControls from './components/CameraControls';
import CameraButtons from './components/CameraButtons';
import Lights from './components/Lights';
// @react-three/postprocessing로 Bloom, Glitch같은 효과를 줄 수 있다.
import { EffectComposer, DepthOfField, Bloom } from '@react-three/postprocessing';

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ColorPicker />
      <CameraButtons />
      {/* R3F 적용 컴포넌트 */}
      <Canvas
        shadows
        style={{ background: 'black' }}
        camera={{ position: [7, 7, 7] }}
      >
        {/* 사진이 준비 된 후 동작하는 컴포넌트 */}
        <Suspense fallback={null}>
          <Background />
        </Suspense>
        <CameraControls />
        <Lights />
        <Orbit />
        <axesHelper args={[5]} />
        {/* Physics를 사용하려면 mesh에 physics 속성을 추가해야한다. */}
        {/* 물리 엔진 적용 컴포넌트 */}
        <Physics>
          <Cars />
          <Floor position={[0, -0.5, 0]} />
        </Physics>
        <EffectComposer>
          <DepthOfField 
            focusDistance={0} 
            focalLength={0.02} 
            bokehScale={2} 
            height={480} 
          />
          <Bloom 
            luminanceThreshold={1} 
            luminanceSmoothing={0.9} 
            height={300} 
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

export default App;
