import * as THREE from 'three';

export function initScene() {
    const scene = new THREE.Scene();
    return scene;
}

export function initCamera() {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(1.2, 0.8, 5);
    return camera;
}

export function initRenderer() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    return renderer;
}

export function updateScene(objModel, materials, modes, scene) {
    if (!objModel) return;

    objModel.traverse(function (child) {
        if (child.isMesh) {
            const { polygonMaterial, wireframeMaterial, pointsMaterial } = materials;
            const { isPolygonMode, isWireframeMode, isPointsMode } = modes;

            if (isPolygonMode) {
                child.material = polygonMaterial;
                child.visible = true;
            } else {
                child.material.dispose();
                child.visible = false;
            }

            if (isWireframeMode) {
                if (!child.userData.wireframeObject) {
                    const wireframeObject = new THREE.LineSegments(
                        new THREE.EdgesGeometry(child.geometry), wireframeMaterial
                    );
                    wireframeObject.position.copy(child.position);
                    scene.add(wireframeObject);
                    child.userData.wireframeObject = wireframeObject;
                }
            } else {
                const wireframeObject = child.userData.wireframeObject;
                if (wireframeObject) {
                    scene.remove(wireframeObject);
                    wireframeObject.geometry.dispose();
                    wireframeObject.material.dispose();
                    child.userData.wireframeObject = null;
                }
            }

            if (isPointsMode) {
                if (!child.userData.pointsObject) {
                    const pointsObject = new THREE.Points(child.geometry, pointsMaterial);
                    pointsObject.position.copy(child.position);
                    scene.add(pointsObject);
                    child.userData.pointsObject = pointsObject;
                }
            } else {
                const pointsObject = child.userData.pointsObject;
                if (pointsObject) {
                    scene.remove(pointsObject);
                    pointsObject.geometry.dispose();
                    pointsObject.material.dispose();
                    child.userData.pointsObject = null;
                }
            }
        }
    });
}
