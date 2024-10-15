import * as THREE from 'three';

export function addLighting(scene, camera) {
    // Directional Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.copy(camera.position);
    scene.add(directionalLight);

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    return directionalLight;
}
