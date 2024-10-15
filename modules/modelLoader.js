import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

export function loadOBJModel(path, scene, onLoadCallback) {
    const loader = new OBJLoader();
    loader.load(
        path,
        (object) => {
            scene.add(object);
            if (onLoadCallback) onLoadCallback(object);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.error('An error occurred while loading the model:', error);
        }
    );
}
