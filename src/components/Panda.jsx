/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 public/models/Panda.gltf -o src/components/Panda.jsx -r public
*/

import React, {useEffect} from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function Panda(props) {
  const group = React.useRef()
  const { scene, animations } = useGLTF('/models/Panda.gltf')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    const anim = props.hovered ? 'Run' : 'Idle';
    actions[anim].reset().fadeIn(0.5).play();

    return () => actions[anim].fadeOut(0.5)
  }, [props.hovered]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <skinnedMesh name="Headband" geometry={nodes.Headband.geometry} material={materials.Atlas} skeleton={nodes.Headband.skeleton} />
          <skinnedMesh name="Knife" geometry={nodes.Knife.geometry} material={materials.Atlas} skeleton={nodes.Knife.skeleton} />
          <skinnedMesh name="Pan" geometry={nodes.Pan.geometry} material={materials.Atlas} skeleton={nodes.Pan.skeleton} />
          <skinnedMesh name="Panda" geometry={nodes.Panda.geometry} material={materials.Atlas} skeleton={nodes.Panda.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Panda.gltf')
