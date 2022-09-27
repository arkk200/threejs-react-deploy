// gltf 모델을 가져오기 위해선 useLoader와 GLTFLoader가 필요하다.
import { useFrame, useLoader } from '@react-three/fiber';
import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const Model = props => {
    const model = useLoader(
        GLTFLoader,
        props.path
    );
    let mixer;
    if(model.animations.length > 0) {
        // AnimationMixer를 만듦
        mixer = new THREE.AnimationMixer(model.scene);

        // 전체 애니메이션을 재생함
        model.animations.forEach(clip => {
            const action = mixer.clipAction(clip);
            action.play();
        });
    }

    // mixer의 각각의 클립을 차례대로 업데이트 시켜줌
    useFrame((scene, delta) => {
        mixer?.update(delta);
    })

    model.scene.traverse(child => {
        if(child.isMesh) {
            child.castShadow = true
            child.receiveShadow = false
            child.material.side = THREE.FrontSide
        }
    })

    return (
        <primitive
            object={model.scene}
            scale={props.scale}
        />
    );
};

export default Model;