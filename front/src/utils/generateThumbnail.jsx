// src/utils/generateThumbnail.js
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"; // HDR 로더
import GLTFModel from "../component/Three/GLTFModel"; // GLTF로더

export function generateThumbnail(character) {
  const initialWidth = 60; // 60px로 크기 설정
  const initialHeight = 60; // 60px로 크기 설정
  const scene = new THREE.Scene();

  // GLTF 모델 추가
  const model = GLTFModel(character);
  scene.add(model);

  //카메라 설정
  const camera = new THREE.PerspectiveCamera(
    45,
    initialWidth / initialHeight,
    0.01,
    1000
  );
  camera.position.set(5, 0, 20); // 카메라 위치 조정

  // 렌더러 생성 (2D 이미지 추출을 위한 canvas)
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(initialWidth, initialHeight); // 썸네일 크기에 맞게 설정
  renderer.toneMapping = THREE.ACESFilmicToneMapping; // 🔥 HDR toneMapping 추가
  renderer.toneMappingExposure = 1.0; // 🔥 적절한 노출 설정
  renderer.outputEncoding = THREE.sRGBEncoding; // 🔥 색상 인코딩 설정

  // 조명 추가
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // 3D 씬을 렌더링하고 이미지 캡처
  renderer.render(scene, camera);

  // canvas에서 이미지 데이터 추출
  const imageURL = renderer.domElement.toDataURL(); // 이미지 URL로 변환

  return imageURL; // 이 URL을 썸네일로 사용
}
