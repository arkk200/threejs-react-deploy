// Floor 메쉬가 직육면체이므로 useBox를 불러온다.
import { useBox } from "@react-three/cannon";

const Floor = props => {
    // ref엔 physics를 넣을 메쉬를 넣어준다.
    // useBox에서 콜백함수의 리턴값으로 physics를 넣을 메쉬의 속성값을 넣어준다.
    // args값으로 박스의 크기를 줄 수 있다.
    const [ref, api] = useBox(() => ({args: [20, 1, 10], ...props}));
    return (
        <mesh ref={ref} {...props} receiveShadow >
            <boxBufferGeometry args={[20, 1, 10]} />
            <meshPhysicalMaterial />
        </mesh>
    );
};

export default Floor;