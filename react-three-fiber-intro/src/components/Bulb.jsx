import { useEffect, useRef } from "react";
import { useThree } from '@react-three/fiber';

const Bulb = props => {
    const ref = useRef();
    const { scene } = useThree();
    useEffect(() => {
        if(scene.lights) scene.lights.push(ref)
        else scene.lights = [ref]
        // console.log(scene)
    }, []);
    return (
        <mesh {...props} ref={ref}>
            <pointLight 
                castShadow 
                // 그림자를 매끄럽게 만듦
                shadow-mapSize-height={2**10}
                shadow-mapSize-width={2**10}
                // 그림자를 여러개 겹치게 만들어서 부드럽게 만듦
                shadow-radius={10}
            />
            <sphereBufferGeometry args={[0.2, 20, 20]} />
            <meshPhongMaterial emissive='white' />
        </mesh>
    );
};

export default Bulb;