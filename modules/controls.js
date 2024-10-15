import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Controls {
    constructor(sceneManager, toggles, onUpdate) {
        this.controls = new OrbitControls(sceneManager.camera, sceneManager.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.screenSpacePanning = false;
        this.controls.maxPolarAngle = Math.PI / 2;

        const { polygonToggle, wireframeToggle, pointsToggle } = toggles;

        const setupToggle = (toggle, modeKey) => {
            toggle.checked = sceneManager.modes[modeKey];
            toggle.addEventListener('change', (event) => {
                sceneManager.modes[modeKey] = event.target.checked;
                onUpdate({ ...sceneManager.modes });
            });
        };

        setupToggle(polygonToggle, 'isPolygonMode');
        setupToggle(wireframeToggle, 'isWireframeMode');
        setupToggle(pointsToggle, 'isPointsMode');
    }

    update() {
        this.controls.update();
    }
}
