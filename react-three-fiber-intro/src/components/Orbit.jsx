import { useThree, extend } from 'react-three-fiber';
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

const Orbit = () => {
    const { camera, gl } = useThree();
    return (
        <orbitControls
            // dragControls에서 접근할 수 있게 Scene에 추가해줌
            attach="orbitControls"
            args={[camera, gl.domElement]}
        />
    );
};

export default Orbit;