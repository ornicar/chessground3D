import type * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function setLockedAzimuth(controls: OrbitControls, azimuth: number) {
  controls.minAzimuthAngle = azimuth;
  controls.maxAzimuthAngle = azimuth;
}

export function createControls(camera: THREE.Camera, domElement: HTMLElement) {
  const controls = new OrbitControls(camera, domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  setLockedAzimuth(controls, controls.getAzimuthalAngle());
  return controls;
}
