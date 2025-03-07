// ThreeDModel.jsx
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function ThreeDModel({ location }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!location || !containerRef.current) return;

    // 씬, 카메라, 렌더러 설정
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(200, 200); // 캔버스 크기 설정
    containerRef.current.appendChild(renderer.domElement);
    // ⭐ 조명 추가 ⭐
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // 환경광 (부드러운 빛)
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 직사광 (태양빛 같은 빛)
    directionalLight.position.set(5, 10, 5); // 빛 위치
    scene.add(directionalLight);
    // 3D 모델 로드
    const loader = new GLTFLoader();
    loader.load("/Three/characters/Creative_Character_free.glb", (gltf) => {
      console.log("model loaded ");
      const model = gltf.scene;
      model.scale.set(1, 1, 1); // 모델 크기 조정
      model.position.set(0, 1, 0);
      // 📌 모델이 조명을 제대로 받도록 설정
      model.traverse((child) => {
        if (child.isMesh) {
          child.material.needsUpdate = true;
        }
      });
      scene.add(model);
      // 🎥 카메라가 모델을 바라보도록 설정
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      camera.position.set(center.x, center.y + 3, center.z);
      camera.lookAt(center);

      // 모델 위치 설정
      const scale = 10;

      camera.rotation.x = -Math.PI / 2;
      scene.background = null; // lightblue 색상
      // 애니메이션 루프
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();
    });

    return () => {
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [location]);

  return <div ref={containerRef} style={{ width: "200px", height: "200px" }} />;
}

export default ThreeDModel;
