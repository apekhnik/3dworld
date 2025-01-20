import {
    CameraControls,
    Environment,
    MeshPortalMaterial,
    OrbitControls,
    RoundedBox,
    useTexture
} from "@react-three/drei";
import {CharacterBox} from "./CharacterBox.jsx";
import {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import {useThree} from "@react-three/fiber";
import {AlienTall} from "./AlienTall.jsx";
import {Cactus} from "./Cactus.jsx";

export const Experience = () => {
    const map = useTexture('texture/clouds.jpg')
    const cameraRef = useRef();
    const [active, setActive] = useState(null);
    const scene = useThree(state => state.scene);

    useEffect(() => {
        if (active) {
            const targetPosition = new THREE.Vector3();
            scene.getObjectByName(active).getWorldPosition(targetPosition);
            cameraRef.current.setLookAt(
                0,
                0,
                5,
                targetPosition.x,
                targetPosition.y,
                targetPosition.z,
                true
            )
        } else {
            cameraRef.current.setLookAt(
                0,
                0,
                10,
                0,
                0,
                0,
                true
            )
        }
    }, [active]);

  return (
    <>
        <CameraControls ref={cameraRef}/>
        <CharacterBox
            active={active}
            setActive={setActive}
            name={'Alien'}
            texture={map}
            component={<AlienTall scale={0.6} position-y={-1}/>}
        />
        <CharacterBox
            active={active}
            setActive={setActive}
            name={'Cactus'}
            texture={map}
            component={<Cactus scale={0.6} position-y={-1}/>}
            position={[-2, 0, 0]}
            rotation={[0, Math.PI / 8, 0]}
        />
    </>
  );
};
