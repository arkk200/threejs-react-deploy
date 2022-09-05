import { useFrame } from '@react-three/fiber';
import state from '../state';
import * as THREE from 'three';

const CameraControls = ({ }) => {
    useFrame(({ camera, scene }) => {
        if (state.shouldUpdate) {
            // position.lerp로 자연스럽게 바뀌게 만들 수 있음
            // camera 포지션을 매 프레임마다 cameraPos까지의 거리의 10%씩 자연스럽게 움직여서 맞춤
            // lerp의 인자로 (벡터, 알파값)이 들어간다.
            camera.position.lerp(state.cameraPos, 0.1);
            // orbitControls의 타겟을 state.target으로 변경
            scene.orbitControls.target.lerp(state.target, 0.1);
            // 카메라를 수동으로 변경한 후엔 orbitControls에서 update를 호출해야 함
            scene.orbitControls.update();
            const diff = 
                camera.position.clone()
                .sub(state.cameraPos).length()

            if (diff < 0.1) state.shouldUpdate = false;
        }
    })
    return (
        null
    );
};

export default CameraControls;