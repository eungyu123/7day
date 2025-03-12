// ThreeDModel.jsx
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function ThreeDModel({ location }) {
  const containerRef = useRef(null);
  const [mixer, setMixer] = useState(null); // 애니메이션 믹서를 위한 상태
  const [currentAction, setCurrentAction] = useState(null); // 현재 실행 중인 애니메이션
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

    const modelGroup = new THREE.Group();

    // 3D 모델 로드
    const loader = new GLTFLoader();
    loader.load("/Three/pets/peach.glb", (gltf) => {
      // 추가할 모델 경로
      const additionalModel = gltf.scene;
      additionalModel.scale.set(0.2, 0.2, 0.2); // 크기 조정
      additionalModel.position.set(1, 0, -1); // 위치 조정

      additionalModel.traverse((child) => {
        if (child.isMesh) {
          child.material.needsUpdate = true;
          child.material.metalness = 0; // 금속성 제거 (필요에 따라 조정)
          child.material.roughness = 0.5; // 거칠기 조정 (필요에 따라 조정)
        }
      });

      modelGroup.add(additionalModel); // 모델을 그룹에 추가
    });

    scene.add(modelGroup); // 모델 그룹을 씬에 추가
    loader.load("/Three/characters/baedal.glb", (gltf) => {
      console.log("model loaded ");
      const model = gltf.scene;
      model.scale.set(1, 1, 1); // 모델 크기 조정
      model.position.set(0, 0, -1);

      // 📌 모델이 조명을 제대로 받도록 설정
      model.traverse((child) => {
        if (child.isMesh) {
          child.material.needsUpdate = true;
        }
      });
      scene.add(model);

      // 애니메이션 믹서 설정
      const newMixer = new THREE.AnimationMixer(model);
      setMixer(newMixer);

      // 애니메이션이 하나라면 첫 번째 애니메이션만 실행
      const animation = gltf.animations[0]; // 하나의 애니메이션만 사용
      const action = newMixer.clipAction(animation);
      action.timeScale = 0.8; // 기본 속도의 절반으로 실행

      action.play(); // 새로운 애니메이션 실행
      setCurrentAction(action); // 현재 액션 상태 저장

      // 🎥 카메라가 모델을 바라보도록 설정
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      camera.position.set(center.x, center.y + 3, center.z + 1);
      camera.lookAt(center);

      camera.rotation.x = -Math.PI / 2;
      scene.background = null; // lightblue 색상
      // 애니메이션 루프
      const animate = () => {
        requestAnimationFrame(animate);

        // 모델 회전 (이동 방향에 맞춰 회전)
        if (location) {
          const direction = new THREE.Vector3(location.x, 0, location.z); // 예시로 location에서 x, z 좌표를 사용
          const angle = Math.atan2(direction.z, direction.x); // 이동 방향에 맞는 각도 계산

          modelGroup.rotation.y = angle + Math.PI / 2; // 모델이 이동 방향을 바라보도록 회전
        }

        // 애니메이션 업데이트
        if (newMixer) {
          newMixer.update(0.01); // 애니메이션을 계속 업데이트
        }
        renderer.render(scene, camera);
      };
      animate();
    });

    return () => {
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: "200px", height: "200px" }} />;
}

export default ThreeDModel;
