import * as THREE from 'three';

const ColorPicker = props => {
    const handleClick = e => {
        // 만약 선택된 오브젝트가 없다면 색을 입힐 수 없으므로 return;
        if (!window.activeMesh) return;
        // object.material.color로 메테리얼의 color속성에 접근할 수 있음
        // e.target으로 이벤트가 일어난 태그에 접근할 수 있음
        window.activeMesh.material.color = new THREE.Color(e.target.style.background);
    }
    return (
        <div style={{ position: 'absolute', zIndex: 1 }}>
            <div
                onClick={handleClick}
                style={{
                    background: 'blue',
                    height: 50,
                    width: 50
                }}
            >
            </div>
            <div
                onClick={handleClick}
                style={{
                    background: 'yellow',
                    height: 50,
                    width: 50
                }}
            >
            </div>
            <div
                onClick={handleClick}
                style={{
                    background: 'white',
                    height: 50,
                    width: 50
                }}
            >
            </div>
        </div>
    );
};

export default ColorPicker;