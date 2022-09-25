import * as THREE from 'three';
import state from '../state';

const ColorPicker = props => {
    const handleClick = e => {
        // 만약 선택된 오브젝트가 없다면 색을 입힐 수 없으므로 return;
        if (!state.activeMesh) return;
        // object.material.color로 메테리얼의 color속성에 접근할 수 있음
        // e.target으로 이벤트가 일어난 태그에 접근할 수 있음
        state.activeMesh.material.color = new THREE.Color(e.target.style.background);
    }
    return (
        <div style={{ 
            position: 'absolute', 
            zIndex: 1, 
            left: 0, 
            right: 0, 
            margin: 'auto', 
            width: 'fit-content', 
            display: 'flex', 
            top: '20px'
        }}>
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