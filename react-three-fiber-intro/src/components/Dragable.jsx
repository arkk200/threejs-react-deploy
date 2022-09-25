import {
    DragControls
} from 'three/examples/jsm/controls/DragControls';
import { useRef } from 'react';
import { extend, useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { useState } from 'react';

// DragControls도 마찬가지로 extend로 R3F에서 쓸 수 있게 해야함
extend({ DragControls });

const Dragable = props => {
    const groupRef = useRef();
    const controlsRef = useRef();
    const [children, setChildren] = useState([]);
    const { camera, gl, scene } = useThree();
    useEffect(() => {
        setChildren(groupRef.current.children);
        // dragControls에서 hoveron이벤트를 감지하여 Orbit을 멈출지 말지 정한다.
    }, []);

    useEffect(() => {
        // children에 세팅됐을 때 이벤트를 한 번 더 줌
        controlsRef.current.addEventListener('hoveron', e => {
            scene.orbitControls.enabled = false;
        });
        controlsRef.current.addEventListener('hoveroff', e => {
            scene.orbitControls.enabled = true;
        });
        controlsRef.current.addEventListener('dragstart', e => {
            // 드래그를 시작했을 때 질량을 0으로 만듦
            // 옵셔널 체이닝(?.)으로 프로퍼티가 없을 경우 undefined를 반환함
            e.object.api?.mass.set(0);
        });
        controlsRef.current.addEventListener('dragend', e => {
            // 드래그를 끝냈을 때 질량을 1로 만듦
            e.object.api?.mass.set(1);
        });
        controlsRef.current.addEventListener('drag', e => {
            // physics의 위치를 오브젝트의 위치에서 복사해옴
            e.object.api?.position.copy(e.object.position);
            // 드래그하고 있을 땐 속도를 0으로 줄임 (가속하는 버그를 없앰)
            e.object.api?.velocity.set(0, 0, 0);
        });
    }, [children]);
    return (
        <group ref={groupRef}>
            <dragControls
                // trnasformGroup을 true로 하면 모델이 따로 따로 분리되어 움직이지 않는다.
                transformGroup={props.transformGroup}
                ref={controlsRef}
                // dragControls는 드래그할 오브젝트, 카메라, domElement를 인자로 받음
                args={[children, camera, gl.domElement]}
            />
            {/* props.children으로 Dragable로 감싼 컴포넌트를 불러올 수 있다. */}
            {props.children}
        </group>
    );
};

export default Dragable;