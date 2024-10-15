import { initScene, initCamera, initRenderer } from './scene.js';
import { loadOBJModel } from './modelLoader.js';
import { addLighting } from './lighting.js';
import { initControls } from './controls.js';

const scene = initScene();
const camera = initCamera();
const renderer = initRenderer();

// Load OBJ Model
let objModel;
loadOBJModel('assets/models/Cottage.obj', scene, (object) => {
    objModel = object;
    object.scale.set(0.1, 0.1, 0.1);
    object.position.set(0, 0, 0);   
});

// Add Lightining
const light = addLighting(scene, camera);

// Initialize Controls
const controls = initControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    light.position.copy(camera.position);
    renderer.render(scene, camera);
}
animate();


