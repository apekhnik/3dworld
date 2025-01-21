import {Environment, MeshPortalMaterial, RoundedBox, Text} from "@react-three/drei";
import * as THREE from "three";
import {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import {easing} from "maath";

export const CharacterBox = ({
        active,
        setActive,
        hovered,
        setHovered,
        name,
        texture,
        Component,
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

    return <group>
        <Text
            position={[position[0], -1.3, 0.055]}
            fontSize={0.3}
            font='fonts/Caprasimo/Caprasimo-Regular.ttf'
            anchorY={'bottom'}
            rotation={rotation}
        >
            {name}
            <meshBasicMaterial color={'red'}/>
        </Text>
        <RoundedBox
            args={[2, 3, 0.1]}
            onDoubleClick={dblClick}
            name={name}
            position={position}
            rotation={rotation}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 6}
            onPointerEnter={() => setHovered(name)}
            onPointerLeave={() => setHovered(null)}
        >
            <MeshPortalMaterial ref={portalRef} side={THREE.DoubleSide}>
                <ambientLight intensity={0.5}/>
                <Environment preset={'sunset'}/>
                <Component
                    scale={0.6}
                    position-y={-1}
                    hovered={hovered === name}
                />
                <mesh>
                    <sphereGeometry args={[6, 64, 64]}/>
                    <meshStandardMaterial map={texture} side={THREE.BackSide}/>
                </mesh>
            </MeshPortalMaterial>
        </RoundedBox>
    </group>
}
