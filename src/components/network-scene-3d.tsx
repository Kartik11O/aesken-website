"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

export type NetworkPointer = {
  x: number;
  y: number;
  active: boolean;
};

/** Symmetric diamond “face” — top / right / bottom / left */
const INITIAL_NODES: THREE.Vector3[] = [
  new THREE.Vector3(0, 0.88, 0.08),
  new THREE.Vector3(0.92, 0.02, -0.12),
  new THREE.Vector3(0, -0.82, 0.04),
  new THREE.Vector3(-0.92, 0.02, 0.12),
];

const HUB = new THREE.Vector3(0, 0, 0);

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [0, 2],
  [1, 3],
];

const TRAVEL_PATHS: { nodes: number[]; duration: number; phase: number }[] = [
  { nodes: [0, 1, 2, 3, 0], duration: 18, phase: 0 },
  { nodes: [1, 3, 2, 1], duration: 14, phase: 5 },
];

function cloneNodes() {
  return INITIAL_NODES.map((n) => n.clone());
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function clampNode(pos: THREE.Vector3) {
  pos.x = THREE.MathUtils.clamp(pos.x, -1.35, 1.35);
  pos.y = THREE.MathUtils.clamp(pos.y, -1.05, 1.05);
  pos.z = THREE.MathUtils.clamp(pos.z, -0.55, 0.55);
  return pos;
}

function computeCenter(nodes: THREE.Vector3[], target: THREE.Vector3) {
  target.set(0, 0, 0);
  for (const node of nodes) target.add(node);
  return target.divideScalar(nodes.length);
}

function averageRadius(nodes: THREE.Vector3[], center: THREE.Vector3) {
  let total = 0;
  for (const node of nodes) total += node.distanceTo(center);
  return total / nodes.length;
}

function DynamicLine({
  getPoints,
  getOpacity,
  color = "#ffffff",
  lineWidth = 1,
}: {
  getPoints: () => THREE.Vector3[];
  getOpacity?: () => number;
  color?: string;
  lineWidth?: number;
}) {
  const lineObj = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.2 });
    return new THREE.Line(geometry, material);
  }, [color]);

  useFrame(() => {
    const points = getPoints();
    const positions = lineObj.geometry.getAttribute("position") as THREE.BufferAttribute | undefined;

    if (!positions || positions.count !== points.length) {
      lineObj.geometry.setFromPoints(points);
    } else {
      for (let i = 0; i < points.length; i++) {
        positions.setXYZ(i, points[i].x, points[i].y, points[i].z);
      }
      positions.needsUpdate = true;
    }

    const material = lineObj.material as THREE.LineBasicMaterial;
    if (getOpacity) material.opacity = getOpacity();
    material.linewidth = lineWidth;
  });

  return <primitive object={lineObj} />;
}

function TravelingDot({
  nodesRef,
  path,
  duration,
  phase,
  reduced,
  paused,
}: {
  nodesRef: React.MutableRefObject<THREE.Vector3[]>;
  path: number[];
  duration: number;
  phase: number;
  reduced: boolean;
  paused: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const position = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (reduced || paused || !mesh.current || path.length < 2) return;

    const nodes = nodesRef.current;
    const segments = path.length - 1;
    const elapsed = (state.clock.elapsedTime + phase) % duration;
    const segDuration = duration / segments;
    const segIndex = Math.min(Math.floor(elapsed / segDuration), segments - 1);
    const segProgress = easeInOut((elapsed - segIndex * segDuration) / segDuration);

    position.copy(nodes[path[segIndex]]).lerp(nodes[path[segIndex + 1]], segProgress);
    mesh.current.position.copy(position);
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.018, 10, 10]} />
      <meshBasicMaterial color="#e8e2d6" transparent opacity={0.85} depthWrite={false} />
    </mesh>
  );
}

function CenterHub({ reduced }: { reduced: boolean }) {
  const core = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reduced || !halo.current) return;
    const pulse = 0.12 + Math.sin(state.clock.elapsedTime * 1.2) * 0.04;
    (halo.current.material as THREE.MeshBasicMaterial).opacity = pulse;
  });

  return (
    <group position={HUB}>
      <mesh ref={core}>
        <sphereGeometry args={[0.028, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.55} />
      </mesh>
      <mesh ref={halo} scale={2.4}>
        <sphereGeometry args={[0.028, 12, 12]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} depthWrite={false} />
      </mesh>
    </group>
  );
}

function DraggableNode({
  index,
  nodesRef,
  reduced,
  isDragging,
  isHovered,
  onDragStart,
  onDrag,
  onDragEnd,
  onHover,
  onReset,
}: {
  index: number;
  nodesRef: React.MutableRefObject<THREE.Vector3[]>;
  reduced: boolean;
  isDragging: boolean;
  isHovered: boolean;
  onDragStart: (index: number) => void;
  onDrag: (index: number, local: THREE.Vector3) => void;
  onDragEnd: () => void;
  onHover: (index: number | null) => void;
  onReset: (index: number) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);
  const hit = useRef<THREE.Mesh>(null);
  const dragging = useRef(false);
  const scale = useRef(1);
  const haloOpacity = useRef(0.08);
  const dragOffset = useMemo(() => new THREE.Vector3(), []);
  const dragPlane = useMemo(() => new THREE.Plane(), []);
  const intersection = useMemo(() => new THREE.Vector3(), []);
  const ndc = useMemo(() => new THREE.Vector2(), []);
  const worldAnchor = useMemo(() => new THREE.Vector3(), []);
  const cameraNormal = useMemo(() => new THREE.Vector3(), []);
  const { gl, camera, raycaster } = useThree();

  useFrame((state, delta) => {
    if (!group.current) return;

    group.current.position.copy(nodesRef.current[index]);

    if (reduced) return;

    const targetScale = isDragging ? 1.28 : isHovered ? 1.12 : 1;
    scale.current = lerp(scale.current, targetScale, 1 - Math.exp(-14 * delta));
    core.current?.scale.setScalar(scale.current);
    halo.current?.scale.setScalar(2.2 * scale.current);

    if (halo.current) {
      const base = isDragging ? 0.22 : isHovered ? 0.14 : 0.08;
      const pulse = isDragging ? 0 : Math.sin(state.clock.elapsedTime * 1.6 + index * 1.2) * 0.025;
      const targetOpacity = base + pulse;
      haloOpacity.current = lerp(haloOpacity.current, targetOpacity, 1 - Math.exp(-10 * delta));
      (halo.current.material as THREE.MeshBasicMaterial).opacity = haloOpacity.current;
    }
  });

  const projectPointer = useCallback(
    (clientX: number, clientY: number) => {
      const parent = group.current?.parent;
      if (!parent) return null;

      const rect = gl.domElement.getBoundingClientRect();
      ndc.set(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1,
      );

      raycaster.setFromCamera(ndc, camera);
      group.current!.getWorldPosition(worldAnchor);
      camera.getWorldDirection(cameraNormal).negate();
      dragPlane.setFromNormalAndCoplanarPoint(cameraNormal, worldAnchor);

      if (!raycaster.ray.intersectPlane(dragPlane, intersection)) return null;
      return parent.worldToLocal(intersection.clone()).sub(dragOffset);
    },
    [camera, cameraNormal, dragOffset, dragPlane, gl.domElement, intersection, ndc, raycaster, worldAnchor],
  );

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (reduced) return;
    e.stopPropagation();
    dragging.current = true;
    onDragStart(index);
    gl.domElement.style.cursor = "grabbing";

    const parent = group.current?.parent;
    if (parent) {
      const local = parent.worldToLocal(e.point.clone());
      dragOffset.copy(local).sub(nodesRef.current[index]);
    }

    const pointerId = e.pointerId;

    const finishDrag = (ev: PointerEvent) => {
      if (ev.pointerId !== pointerId || !dragging.current) return;
      dragging.current = false;
      onDragEnd();
      gl.domElement.style.cursor = isHovered ? "grab" : "auto";
      gl.domElement.removeEventListener("pointerup", finishDrag);
      gl.domElement.removeEventListener("pointermove", followDrag);
      gl.domElement.releasePointerCapture(pointerId);
    };

    const followDrag = (ev: PointerEvent) => {
      if (ev.pointerId !== pointerId || !dragging.current) return;
      const local = projectPointer(ev.clientX, ev.clientY);
      if (local) onDrag(index, clampNode(local));
    };

    gl.domElement.setPointerCapture(pointerId);
    gl.domElement.addEventListener("pointermove", followDrag);
    gl.domElement.addEventListener("pointerup", finishDrag);
  };

  const handleDoubleClick = (e: ThreeEvent<MouseEvent>) => {
    if (reduced) return;
    e.stopPropagation();
    onReset(index);
  };

  return (
    <group ref={group}>
      <mesh ref={core}>
        <sphereGeometry args={[0.055, 24, 24]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh ref={halo}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color="#e8e2d6" transparent opacity={0.1} depthWrite={false} />
      </mesh>
      {!reduced && (
        <mesh
          ref={hit}
          scale={3.2}
          onPointerDown={handlePointerDown}
          onDoubleClick={handleDoubleClick}
          onPointerOver={(e) => {
            e.stopPropagation();
            onHover(index);
            if (!dragging.current) gl.domElement.style.cursor = "grab";
          }}
          onPointerOut={() => {
            onHover(null);
            if (!dragging.current) gl.domElement.style.cursor = "auto";
          }}
        >
          <sphereGeometry args={[0.06, 10, 10]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      )}
    </group>
  );
}

function NetworkGraph({
  pointer,
  reduced,
  onDraggingChange,
}: {
  pointer: NetworkPointer;
  reduced: boolean;
  onDraggingChange?: (dragging: boolean) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const ringScale = useRef(1);
  const breathe = useRef(1);
  const mouse = useRef({ x: 0, y: 0 });
  const nodesRef = useRef(cloneNodes());
  const centerRef = useRef(new THREE.Vector3());
  const resetTargets = useRef<(THREE.Vector3 | null)[]>([null, null, null, null]);

  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleDragStart = useCallback(
    (index: number) => {
      setDraggingIndex(index);
      onDraggingChange?.(true);
    },
    [onDraggingChange],
  );

  const handleDrag = useCallback((index: number, local: THREE.Vector3) => {
    resetTargets.current[index] = null;
    nodesRef.current[index].copy(local);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggingIndex(null);
    onDraggingChange?.(false);
  }, [onDraggingChange]);

  const handleReset = useCallback((index: number) => {
    resetTargets.current[index] = INITIAL_NODES[index].clone();
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;

    for (let i = 0; i < nodesRef.current.length; i++) {
      const target = resetTargets.current[i];
      if (!target) continue;
      nodesRef.current[i].lerp(target, 1 - Math.exp(-8 * delta));
      if (nodesRef.current[i].distanceTo(target) < 0.004) {
        nodesRef.current[i].copy(target);
        resetTargets.current[i] = null;
      }
    }

    const center = computeCenter(nodesRef.current, centerRef.current);
    const radius = averageRadius(nodesRef.current, center);

    if (ring.current) {
      const targetRingScale = THREE.MathUtils.clamp(radius / 0.85, 0.82, 1.2);
      ringScale.current = lerp(ringScale.current, targetRingScale, 1 - Math.exp(-6 * delta));
      ring.current.scale.set(ringScale.current * 1.15, ringScale.current * 0.38, 1);
      if (draggingIndex === null) ring.current.rotation.z += delta * 0.025;
    }

    if (reduced) {
      group.current.rotation.set(0, 0, 0);
      group.current.scale.setScalar(1);
      return;
    }

    const t = state.clock.elapsedTime;
    const isDragging = draggingIndex !== null;
    const loopStrength = isDragging ? 0.12 : 1;

    const targetBreathe = 1 + Math.sin(t * 0.45) * 0.018;
    breathe.current = lerp(breathe.current, targetBreathe, 1 - Math.exp(-4 * delta));
    group.current.scale.setScalar(isDragging ? 1 : breathe.current);

    const loopX = Math.sin(t * 0.22) * 0.07;
    const loopY = Math.sin(t * 0.17) * 0.09;

    const targetMouseX = pointer.active && !isDragging ? pointer.y * 0.07 : 0;
    const targetMouseY = pointer.active && !isDragging ? pointer.x * 0.085 : 0;
    mouse.current.x = lerp(mouse.current.x, targetMouseX, 0.06);
    mouse.current.y = lerp(mouse.current.y, targetMouseY, 0.06);

    group.current.rotation.x = loopX * loopStrength + mouse.current.x;
    group.current.rotation.y = loopY * loopStrength + mouse.current.y;
  });

  const edgeOpacity = useCallback(
    (a: number, b: number) => {
      if (draggingIndex === null && hoverIndex === null) return 0.22;
      if (draggingIndex === a || draggingIndex === b) return 0.6;
      if (hoverIndex === a || hoverIndex === b) return 0.38;
      return 0.14;
    },
    [draggingIndex, hoverIndex],
  );

  const spokeOpacity = useCallback(
    (i: number) => {
      if (draggingIndex === i) return 0.22;
      if (hoverIndex === i) return 0.14;
      return 0.06;
    },
    [draggingIndex, hoverIndex],
  );

  return (
    <group ref={group}>
      {EDGES.map(([a, b]) => (
        <DynamicLine
          key={`${a}-${b}`}
          getPoints={() => [nodesRef.current[a], nodesRef.current[b]]}
          getOpacity={() => edgeOpacity(a, b)}
          lineWidth={draggingIndex === a || draggingIndex === b ? 1.4 : 1}
        />
      ))}

      {nodesRef.current.map((_, i) => (
        <DynamicLine
          key={`spoke-${i}`}
          getPoints={() => {
            const end = HUB.clone().lerp(nodesRef.current[i], 0.62);
            return [nodesRef.current[i], end];
          }}
          getOpacity={() => spokeOpacity(i)}
          lineWidth={0.5}
        />
      ))}

      <DynamicLine
        getPoints={() => [...nodesRef.current.map((n) => n.clone()), nodesRef.current[0].clone()]}
        getOpacity={() => (draggingIndex !== null ? 0.16 : 0.09)}
        lineWidth={0.5}
      />

      <mesh ref={ring} rotation={[Math.PI * 0.42, 0, 0]}>
        <torusGeometry args={[0.85, 0.002, 8, 96]} />
        <meshBasicMaterial color="#e8e2d6" transparent opacity={0.08} />
      </mesh>

      <CenterHub reduced={reduced} />

      {nodesRef.current.map((_, i) => (
        <DraggableNode
          key={i}
          index={i}
          nodesRef={nodesRef}
          reduced={reduced}
          isDragging={draggingIndex === i}
          isHovered={hoverIndex === i}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onHover={setHoverIndex}
          onReset={handleReset}
        />
      ))}

      {!reduced &&
        TRAVEL_PATHS.map((route, i) => (
          <TravelingDot
            key={`travel-${i}`}
            nodesRef={nodesRef}
            path={route.nodes}
            duration={route.duration}
            phase={route.phase}
            reduced={reduced}
            paused={draggingIndex !== null}
          />
        ))}
    </group>
  );
}

function CanvasPointerTracker({
  enabled,
  dragging,
  onCanvasPointer,
}: {
  enabled: boolean;
  dragging: boolean;
  onCanvasPointer?: (coords: { x: number; y: number; active: boolean } | null) => void;
}) {
  const { gl } = useThree();

  useEffect(() => {
    if (!enabled || !onCanvasPointer) return;

    const el = gl.domElement;

    const onMove = (e: PointerEvent) => {
      if (dragging) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
      onCanvasPointer({ x, y, active: true });
    };

    const onLeave = () => {
      if (!dragging) onCanvasPointer(null);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [dragging, enabled, gl, onCanvasPointer]);

  return null;
}

function SceneContent({
  pointer,
  reduced,
  onDraggingChange,
  onCanvasPointer,
}: {
  pointer: NetworkPointer;
  reduced: boolean;
  onDraggingChange?: (dragging: boolean) => void;
  onCanvasPointer?: (coords: { x: number; y: number; active: boolean } | null) => void;
}) {
  const [dragging, setDragging] = useState(false);

  const handleDraggingChange = useCallback(
    (value: boolean) => {
      setDragging(value);
      onDraggingChange?.(value);
    },
    [onDraggingChange],
  );

  return (
    <>
      <ambientLight intensity={0.2} />
      <NetworkGraph pointer={pointer} reduced={reduced} onDraggingChange={handleDraggingChange} />
      <CanvasPointerTracker
        enabled={!reduced}
        dragging={dragging}
        onCanvasPointer={onCanvasPointer}
      />
    </>
  );
}

export function NetworkScene3D({
  pointer,
  reduced = false,
  onDraggingChange,
  onCanvasPointer,
}: {
  pointer: NetworkPointer;
  reduced?: boolean;
  onDraggingChange?: (dragging: boolean) => void;
  onCanvasPointer?: (coords: { x: number; y: number; active: boolean } | null) => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 3.8], fov: 44 }}
      style={{ background: "transparent", touchAction: "none" }}
    >
      <SceneContent
        pointer={pointer}
        reduced={reduced}
        onDraggingChange={onDraggingChange}
        onCanvasPointer={onCanvasPointer}
      />
    </Canvas>
  );
}
