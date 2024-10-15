import * as THREE from 'three';

function createWireframeMaterial(color = 0x0000ff) {
    return new THREE.LineBasicMaterial({
        color: color,
        linewidth: 2
    });
}

function createPointsMaterial(color = 0xff0000) {
    return new THREE.PointsMaterial({
        color: color,
        size: 0.05
    });
}

function createStandardMaterial(color = 0xffffff) {
    return new THREE.MeshStandardMaterial({
        color: color,
        wireframe: false
    });
}

export function setMaterial(mode, color) {
    if (mode == 'wireframe') {
        return createWireframeMaterial(color);
    } else if (mode == 'standard') {
        return createStandardMaterial(color);
    } else if (mode == 'points') {
        return createPointsMaterial(color);
    } else {
        return createStandardMaterial(color);
    }
}
