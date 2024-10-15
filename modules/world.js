import { Controls } from './controls.js';
import { SceneManager } from './sceneManager.js';

const testToggle = document.getElementById('testing-toggle');

testToggle.addEventListener('change', (event) => {
    if (event.target.checked)
        console.log("Testing mode is ON");
    else
        console.log("Testing mode is OFF");
});

document.addEventListener('DOMContentLoaded', () => {
    const modes = { isPolygonMode: true, isWireframeMode: true, isPointsMode: true };

    const sceneManager = new SceneManager(modes);
    sceneManager.loadModel('assets/models/cube.obj');

    // Toggle elements from the DOM
    const polygonToggle = document.getElementById('polygon-toggle');
    const wireframeToggle = document.getElementById('wireframe-toggle');
    const pointsToggle = document.getElementById('points-toggle');
    const toggles = { polygonToggle, wireframeToggle, pointsToggle };

    const controls = new Controls(sceneManager, toggles, (updatedModes) => {
        sceneManager.setModes(updatedModes);
    });

    sceneManager.animate();
    controls.update();
})
