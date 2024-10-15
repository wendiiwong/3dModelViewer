import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function initControls(camera, domElement) {
    const controls = new OrbitControls(camera, domElement);
    controls.enableDamping = true;  // Adds smooth rotation
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;  // Limits vertical rotation
    return controls;
}