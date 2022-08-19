import {
    DragControls
} from 'three/examples/jsm/controls/DragControls';
import { useRef } from 'react';
import { extend, useThree } from 'react-three-fiber';
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
    }, [children]);
    return (
        <group ref={groupRef}>
            {/* 컴포넌트로 쓸 수 있게 확장된 것들은 소문자로 시작한다. */}
            {/* dragControls는 그냥 이벤트를 발생시켜주는 놈이므로
            group의 자식으로 들어가지 않는다.
             */}
            <dragControls
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