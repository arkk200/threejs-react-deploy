import { useLoader, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import { useMemo } from "react";

const Background = props => {
    const texture = useLoader(
      THREE.TextureLoader,
      process.env.PUBLIC_URL + '/autoshop.jpg' // public폴더 내 이미지를 사용하려면 process.env.PUBLIC_URL를 앞에 붙여야한다.
    );
  
    const { gl } = useThree();
  
    // 사진이 여러번 불러와지는 것을 막음
    const formatted = useMemo(() => 
      new THREE.WebGLCubeRenderTarget(
        texture.image.height
      ).fromEquirectangularTexture(gl, texture)
    , []);
  
    return (
      <primitive
        attach="background"
        object={formatted.texture}
      />
    );
  };

  export default Background;