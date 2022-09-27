import { useThree } from '@react-three/fiber';
import { EffectComposer, DepthOfField, Bloom, GodRays } from '@react-three/postprocessing';
import { useState, useEffect } from 'react';

const Effects = () => {
  const [lights, setLights] = useState(null);
  const { scene } = useThree();
  useEffect(() => {
    if(scene.lights && scene.lights.length === 3) { // Bulb가 3개 다 scene.lights배열에 들어왔다면 
      setLights(scene.lights)
    }
  }, [scene.lights]);

  return (
    lights ? // lights state에 Bulb배열이 다 들어왔다면 값을 리턴함
    <EffectComposer>
      <DepthOfField
        focusDistance={0}
        focalLength={0.02}
        bokehScale={2}
        height={480}
      />
      {lights.map(light => (
        // 해와 비슷한 효과를 메쉬에 내게 해 주는 이펙트이다.
        // meshPhongMaterial같은 경우 emissive 색상에 따라 
        // 방출하는 빛이 달라진다.
        <GodRays 
          // map함수로 여러개의 컴포넌트를 만들어낼 때 각각에 
          // 각각 키 속성에 값이 있어야 한다.
          // uuid는 각각의 엔티티가 갖는 고유한 아이디이다.
          key={light.current.uuid} 
          sun={light.current} 
        />
      ))}
    </EffectComposer>
    : null
  )
}

export default Effects;