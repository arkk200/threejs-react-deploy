import { useRef } from 'react';
import { useLoader, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { useBox } from "@react-three/cannon";

const Box = props => {
    // mass, 질량을 추가하면 밑으로 떨어짐
    const [ref, api] = useBox(() => ({mass: 1, ...props}));
    // texture를 쓰기위해선 useLoader라는 훅을 써야한다.
    // useLoader에는 차례대로 THREE의 TextureLoader, 사진 위치가 인자로 들어간다.
    const texture = useLoader(
        THREE.TextureLoader,
        '/wood.jpg'
    );

    const handlePointerDown = e => {
        e.object.active = true;
        // 만약 기억하고 있던 오브젝트가 또 눌렸다면 또 크기를 늘릴 필요 없으니 return;
        if (e.object == window.activeMesh) return;
        // 만약 클릭 이벤트가 발생됐고 window.activeMesh에 오브젝트가 있다면
        if (window.activeMesh) {
            // 기억하고 있던 오브젝트의 크기를 줄임
            scaleDown(window.activeMesh);
            // 기억하고 있던 오브젝트의 active를 false로 만듦
            window.activeMesh.active = false;
        }
        // window.activeMesh한테 이벤트가 일어난 오브젝트를 기억하게 함
        window.activeMesh = e.object;
    }
    const handlePointerEnter = e => {
        // e.object로 오브젝트에 접근할 수 있다.
        e.object.scale.x = 1.5;
        e.object.scale.y = 1.5;
        e.object.scale.z = 1.5;
    }
    const handlePointerLeave = e => {
        if (!e.object.active) { // 누르면 e.object.active가 true가 되서 안작아짐
            scaleDown(e.object);
        }
    }

    const scaleDown = object => {
        object.scale.x = 1;
        object.scale.y = 1;
        object.scale.z = 1;
    }

    return (
        <mesh
            ref={ref}
            api={api}
            {...props}
            castShadow
            onPointerDown={handlePointerDown}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
        >
            <boxBufferGeometry />
            <meshPhysicalMaterial
                map={texture}
            />
        </mesh>
    );
};

export default Box;