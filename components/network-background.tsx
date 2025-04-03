// "use client"

// import { useRef, useMemo } from "react"
// import { Canvas, useFrame } from "@react-three/fiber"
// import { EffectComposer, Bloom } from "@react-three/postprocessing"
// import { Points, PointMaterial } from "@react-three/drei"
// import * as THREE from "three"
// import { random } from "maath"

// interface ParticleFieldProps {
//   count?: number
// }

// function ParticleField({ count = 2000 }: ParticleFieldProps) {
//   const points = useRef<THREE.Points>(null)
//   const sphere = useMemo(() => new Float32Array(random.inSphere(new Float32Array(count * 3), { radius: 20 })), [count])

//   useFrame((_, delta) => {
//     if (points.current) {
//       points.current.rotation.x += delta * 0.01
//       points.current.rotation.y += delta * 0.02
//     }
//   })

//   return (
//     <Points ref={points} positions={sphere} stride={3} frustumCulled={false}>
//       <PointMaterial
//         transparent
//         color="#D4B98C"
//         size={0.05}
//         sizeAttenuation={true}
//         depthWrite={false}
//         blending={THREE.AdditiveBlending}
//       />
//     </Points>
//   )
// }

// interface ConnectionLinesProps {
//   count?: number
// }

// function ConnectionLines({ count = 10 }: ConnectionLinesProps) {
//   const lines = useRef<THREE.LineSegments>(null)
//   const { positions, colors }: { positions: number[], colors: number[] } = useMemo(() => {
//     const positions: number[] = []
//     const colors: number[] = []
//     const color = new THREE.Color()

//     for (let i = 0; i < count; i++) {
//       const x1 = (Math.random() - 0.5) * 20
//       const y1 = (Math.random() - 0.5) * 20
//       const z1 = (Math.random() - 0.5) * 20

//       const x2 = x1 + (Math.random() - 0.5) * 5
//       const y2 = y1 + (Math.random() - 0.5) * 5
//       const z2 = z1 + (Math.random() - 0.5) * 5

//       positions.push(x1, y1, z1, x2, y2, z2)

//       color.setHSL(0.1, 0.5, 0.5 + Math.random() * 0.2)
//       colors.push(color.r, color.g, color.b, color.r, color.g, color.b)
//     }

//     return { positions, colors }
//   }, [count])

//   useFrame((_, delta) => {
//     if (lines.current) {
//       lines.current.rotation.x += delta * 0.01
//       lines.current.rotation.y += delta * 0.02
//     }
//   })

//   return (
//     <mesh ref={lines}>
//       <lineSegments>
//         <lineBasicMaterial attach="material" vertexColors transparent opacity={0.6} />
//         <bufferGeometry>
//           <bufferAttribute
//             attach="attributes-position"
//             args={[new Float32Array(positions), 3]}
//           />
//           <bufferAttribute
//             attach="attributes-color"
//             args={[new Float32Array(colors), 3]}
//           />
//         </bufferGeometry>
//       </lineSegments>
//     </mesh>
//   )
// }

// function Scene() {
//   const scene = useRef<THREE.Group>(null)

//   useFrame(({ mouse }: { mouse: { x: number; y: number } }) => {
//     if (scene.current) {
//       scene.current.rotation.y = THREE.MathUtils.lerp(scene.current.rotation.y, mouse.x * 0.1, 0.05)
//       scene.current.rotation.x = THREE.MathUtils.lerp(scene.current.rotation.x, mouse.y * 0.05, 0.05)
//     }
//   })

//   return (
//     <group ref={scene}>
//       <ParticleField />
//       <ConnectionLines />
//     </group>
//   )
// }

// export default function NetworkBackground() {
//   return (
//     <div className="fixed inset-0 bg-[#111111]">
//       <Canvas camera={{ position: [0, 0, 15], fov: 60 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
//         <ambientLight intensity={0.1} />
//         <Scene />
//         <EffectComposer>
//           <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
//         </EffectComposer>
//       </Canvas>
//     </div>
//   )
// }



"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"
import { random } from "maath"

// Custom hook for mobile detection
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Check on mount
    checkMobile()

    // Add event listener
    window.addEventListener("resize", checkMobile)

    // Clean up
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}

// Reduced particle count for mobile
function ParticleField({ count = 2000, isMobile = false }) {
  const points = useRef<THREE.Points>(null)
  // Reduce particle count on mobile
  const actualCount = isMobile ? Math.floor(count / 3) : count
  const sphere = useMemo(() => new Float32Array(random.inSphere(new Float32Array(actualCount * 3), { radius: 20 })), [actualCount])

  useFrame((_, delta) => {
    if (points.current) {
      points.current.rotation.x += delta * 0.01
      points.current.rotation.y += delta * 0.02
    }
  })

  return (
    <Points ref={points} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#D4B98C"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Reduced line count for mobile
function ConnectionLines({ count = 10, isMobile = false }) {
  const lines = useRef<THREE.LineSegments>(null)
  // Reduce line count on mobile
  const actualCount = isMobile ? Math.floor(count / 2) : count

  const { positions, colors } = useMemo(() => {
    const positions = []
    const colors = []
    const color = new THREE.Color()

    for (let i = 0; i < actualCount; i++) {
      const x1 = (Math.random() - 0.5) * 20
      const y1 = (Math.random() - 0.5) * 20
      const z1 = (Math.random() - 0.5) * 20

      const x2 = x1 + (Math.random() - 0.5) * 5
      const y2 = y1 + (Math.random() - 0.5) * 5
      const z2 = z1 + (Math.random() - 0.5) * 5

      positions.push(x1, y1, z1, x2, y2, z2)

      color.setHSL(0.1, 0.5, 0.5 + Math.random() * 0.2)
      colors.push(color.r, color.g, color.b, color.r, color.g, color.b)
    }

    return { positions, colors }
  }, [actualCount])

  useFrame((_, delta) => {
    if (lines.current) {
      lines.current.rotation.x += delta * 0.01
      lines.current.rotation.y += delta * 0.02
    }
  })

  return (
    <lineSegments ref={lines}>
      <lineBasicMaterial attach="material" vertexColors transparent opacity={0.6} />
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={new Float32Array(positions)}
          count={positions.length / 3}
          itemSize={3}
          args={[new Float32Array(positions), 3]}
        />
      </bufferGeometry>
    </lineSegments>
  )
}

function Scene({ isMobile }: { isMobile: boolean }) {
  const scene = useRef<THREE.Group>(null)

  // Reduce mouse movement sensitivity on mobile
  const sensitivity = isMobile ? 0.05 : 0.1

  useFrame(({ mouse }) => {
    if (scene.current) {
      scene.current.rotation.y = THREE.MathUtils.lerp(scene.current.rotation.y, mouse.x * sensitivity, 0.05)
      scene.current.rotation.x = THREE.MathUtils.lerp(scene.current.rotation.x, mouse.y * (sensitivity / 2), 0.05)
    }
  })

  return (
    <group ref={scene}>
      <ParticleField isMobile={isMobile} />
      <ConnectionLines isMobile={isMobile} />
    </group>
  )
}

export default function NetworkBackground() {
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)

  // Only render after component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="fixed inset-0 bg-[#111111]"></div>
  }

  return (
    <div className="fixed inset-0 bg-[#111111]">
      <Canvas
  camera={{ position: [0, 0, 15], fov: 60 }}
  dpr={[1, isMobile ? 1.5 : 2]}
  performance={{ min: 0.5 }}
  gl={{
    powerPreference: "high-performance",
    antialias: false,
    stencil: false,
    depth: false,
  }}
>
  <ambientLight intensity={0.1} />
  <Scene isMobile={isMobile} />

  {/* Ensure EffectComposer always has valid children */}
  <EffectComposer>
    {!isMobile ? (
      <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
    ) : (
      <></> // Empty fragment to prevent "undefined" issue
    )}
  </EffectComposer>
</Canvas>

      {/* <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        performance={{ min: 0.5 }}
        gl={{
          powerPreference: "high-performance",
          antialias: false,
          stencil: false,
          depth: false,
        }}
      >
        <ambientLight intensity={0.1} />
        <Scene isMobile={isMobile} />
        <EffectComposer>
          {isMobile ? <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} /> :<></>}
        </EffectComposer>
      </Canvas> */}
    </div>
  )
}


