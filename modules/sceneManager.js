import * as THREE from 'three';
import { initScene, initCamera, initRenderer } from './scene.js';
import { loadOBJModel } from './modelLoader.js';
import { addLighting } from './lighting.js';
import { setMaterial } from './material.js';

export class SceneManager {
    constructor(modes) {
        this.scene = initScene();
        this.camera = initCamera();
        this.renderer = initRenderer();
        this.light = addLighting(this.scene, this.camera);
        this.model = null;
        this.modes = modes;
        this.materials = {};
    }

    // Load 3D object model into the scene
    loadModel(path) {
        loadOBJModel(path, this.scene, (object) => {
            this.model = object;
            this.materials = {
                polygonMaterial: setMaterial('standard'),
                wireframeMaterial: setMaterial('wireframe'),
                pointsMaterial: setMaterial('points'),
            };
            this.updateScene();
        });
    }

    updateScene() {
        if (!this.model) return;
        this.model.traverse((child) => {
            console.log(this.modes);
            if (child.isMesh) {
                if (this.modes.isPolygonMode) {
                    child.material = this.materials.polygonMaterial;
                    child.visible = true;
                } else {
                    child.material.dispose();
                    child.visible = false;
                }

                if (this.modes.isWireframeMode) {
                    if (!child.userData.wireframeObject) {
                        const wireframeObject = new THREE.LineSegments(
                            new THREE.EdgesGeometry(child.geometry), this.materials.wireframeMaterial
                        );
                        wireframeObject.position.copy(child.position);
                        this.scene.add(wireframeObject);
                        child.userData.wireframeObject = wireframeObject;
                    }
                } else {
                    const wireframeObject = child.userData.wireframeObject;
                    if (wireframeObject) {
                        this.scene.remove(wireframeObject);
                        wireframeObject.geometry.dispose();
                        wireframeObject.material.dispose();
                        child.userData.wireframeObject = null;
                    }
                }

                if (this.modes.isPointsMode) {
                    if (!child.userData.pointsObject) {
                        const pointsObject = new THREE.Points(child.geometry, this.materials.pointsMaterial);
                        pointsObject.position.copy(child.position);
                        this.scene.add(pointsObject);
                        child.userData.pointsObject = pointsObject;
                    }
                } else {
                    const pointsObject = child.userData.pointsObject;
                    if (pointsObject) {
                        this.scene.remove(pointsObject);
                        pointsObject.geometry.dispose();
                        pointsObject.material.dispose();
                        child.userData.pointsObject = null;
                    }
                }
            }
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.light.position.copy(this.camera.position);
        this.renderer.render(this.scene, this.camera);
    }

    // Update render modes
    setModes(newModes) {
        this.modes = newModes;
        this.updateScene();
    }
}
