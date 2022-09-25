const Bulb = props => {
    return (
        <mesh {...props}>
            <pointLight 
                castShadow 
                // 그림자를 매끄럽게 만듦
                shadow-mapSize-height={2**10}
                shadow-mapSize-width={2**10}
                // 그림자를 여러개 겹치게 만들어서 부드럽게 만듦
                shadow-radius={10}
            />
            <sphereBufferGeometry args={[0.2, 20, 20]} />
            <meshPhongMaterial emissive='yellow' />
        </mesh>
    );
};

export default Bulb;