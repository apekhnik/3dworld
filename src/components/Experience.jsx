import {
    CameraControls,
    Text,
    useCursor,
    useTexture
} from "@react-three/drei";
import {CharacterBox} from "./CharacterBox.jsx";
import {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import {useThree} from "@react-three/fiber";
import {AlienTall} from "./AlienTall.jsx";
import {Cactus} from "./Cactus.jsx";
import {Panda} from "./Panda.jsx";

export const Experience = () => {
    const map = useTexture('texture/clouds.jpg')
    const cameraRef = useRef();
    const [active, setActive] = useState(null);
    const [hovered, setHovered] = useState(null);
    useCursor(hovered)
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
        <CameraControls ref={cameraRef} maxPolarAngle={Math.PI/2}   minPolarAngle={Math.PI / 8} />
        <CharacterBox
            active={active}
            setActive={setActive}
            hovered={hovered}
            setHovered={setHovered}
            name={'Alien'}
            texture={map}
            Component={AlienTall}
        />
        <CharacterBox
            active={active}
            setActive={setActive}
            hovered={hovered}
            setHovered={setHovered}
            name={'Cactus'}
            texture={map}
            Component={Cactus}
            position={[-2.5, 0, 0]}
            rotation={[0, Math.PI / 8, 0]}
        />
        <CharacterBox
            active={active}
            setActive={setActive}
            hovered={hovered}
            setHovered={setHovered}
            name={'Panda'}
            texture={map}
            Component={Panda}
            position={[2.5, 0, 0]}
            rotation={[0, -Math.PI / 8, 0]}
        />
    </>
  );
};
