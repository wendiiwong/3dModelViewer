import * as THREE from 'three';

export function initScene() {
    const scene = new THREE.Scene();
    return scene;
}

export function initCamera() {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(1.2, 0.8, 1.5);
    return camera;
}

export function initRenderer() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    return renderer;
}