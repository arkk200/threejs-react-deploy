import { useLoader, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import { useMemo } from "react";

const Background = props => {
    const texture = useLoader(
      THREE.TextureLoader,
      '/autoshop.jpg'
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