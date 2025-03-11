// src/utils/generateThumbnail.js
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"; // HDR 로더
import GLTFModel from "../component/Three/GLTFModel"; // GLTF로더

export function generateThumbnail(character) {
  return new Promise((resolve, reject) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(60, 60);
    renderer.setClearColor(0x000000, 0);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const loader = new GLTFLoader();

    loader.load(
      characterModelPath,
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const maxSize = Math.max(size.x, size.y, size.z);

        const scale = 50 / maxSize;
        model.scale.set(scale, scale, scale);

        box.getCenter(model.position);
        model.position.multiplyScalar(-1);

        camera.position.z = 50;
        camera.lookAt(model.position);

        renderer.render(scene, camera);
        const imageDataURL = renderer.domElement.toDataURL("image/png");
        resolve(imageDataURL);
      },
      undefined,
      (error) => {
        console.error("모델 로드 오류:", error);
        reject(error);
      }
    );
  });
}
