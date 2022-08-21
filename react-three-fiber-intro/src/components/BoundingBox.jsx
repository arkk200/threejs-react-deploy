import { useBox } from "@react-three/cannon";

const BoundingBox = ({
    position = [0, 0, 0],
    offset = [0, 0, 0],
    dims = [1, 1, 1],
    visible = false,
    children
}) => {
    // useBox스케일도 보이는 Mesh 크기만큼 맞춰줌
    const [ref, api] = useBox(() => ({ mass: 1, args: dims, position: position }))
    return (
        <group ref={ref} api={api}>
            {/* 바운딩 박스 형체를 보여줌 */}
            {/* dims로 바운딩 박스 크기를 맞춰줌 */}
            <mesh scale={dims} visible={visible}>
                <boxBufferGeometry />
                <meshPhysicalMaterial wireframe />
            </mesh>
            <group position={offset}>
                {children}
            </group>
        </group>
    )
}

export default BoundingBox;