import {Environment, MeshPortalMaterial, RoundedBox} from "@react-three/drei";
import {AlienTall} from "./AlienTall.jsx";
import * as THREE from "three";
import {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import {easing} from "maath";

export const CharacterBox = ({
        active,
        setActive,
        name,
        texture,
        component,
        position = [0, 0, 0],
        rotation,
    }) => {
    const portalRef = useRef();
    const dblClick = () => {
        setActive(active === name ? null : name)
    }

    useFrame((state, delta) => {
        const opened = active === name;
        easing.damp(portalRef.current, 'blend', opened ? 1 : 0, 0.2, delta);
    })

    return <RoundedBox
        args={[2, 3, 0.5]}
        onDoubleClick={dblClick}
        name={name}
        position={position}
        rotation={rotation}
    >
        <MeshPortalMaterial ref={portalRef} side={THREE.DoubleSide}>
            <ambientLight intensity={0.5}/>
            <Environment preset={'sunset'}/>
            {component}
            <mesh>
                <sphereGeometry args={[6, 64, 64]}/>
                <meshStandardMaterial map={texture} side={THREE.BackSide}/>
            </mesh>
        </MeshPortalMaterial>
    </RoundedBox>
}
