/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 public/models/Alien_Tall.gltf -o src/components/AlienTall.jsx -r public
*/

import React, {useEffect} from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function AlienTall(props) {
  const group = React.useRef()
  const { scene, animations } = useGLTF('/models/Alien_Tall.gltf')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, group)
  console.log(actions)

  useEffect(() => {
    actions['Dance'].reset().fadeIn(0.5).play();

    return () => actions['Idle'].fadeOut(0.5)
  }, []);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="MonsterArmature">
          <primitive object={nodes.Body} />
          <primitive object={nodes.Head} />
          <skinnedMesh name="Alien_Tall" geometry={nodes.Alien_Tall.geometry} material={materials.Texture} skeleton={nodes.Alien_Tall.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Alien_Tall.gltf')
