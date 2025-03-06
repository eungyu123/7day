import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import GLTFModel from "./GLTFModel";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"; // HDR 로더

function ThreeScene() {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    // 초기 렌더러 크기 설정 (부모 요소의 크기로 설정)
    const initialWidth = mountRef.current.offsetWidth;
    const initialHeight = mountRef.current.offsetHeight;
    const scene = new THREE.Scene();

    // GLTF 모델 추가
    const model = GLTFModel();
    scene.add(model);

    // HDRi 이미지 로딩
    const hdrLoader = new RGBELoader();
    hdrLoader.load(
      "/Three/background/HDR_029_Sky_Cloudy_Env.hdr",
      (hdrTexture) => {
        // HDR 이미지를 환경 맵으로 설정
        const pmremGenerator = new THREE.PMREMGenerator(hdrTexture);
        const envMap = pmremGenerator.fromEquirectangular(hdrTexture).texture;

        // 씬 배경으로 설정
        scene.background = envMap;
        // 씬의 환경 맵 설정 (반사 및 조명 효과)
        scene.environment = envMap;

        // HDR 텍스처는 불필요한 경우 자동으로 정리해주는 것이 좋습니다
        hdrTexture.dispose();
        pmremGenerator.dispose();
      }
    );
    //카메라 설정
    const camera = new THREE.PerspectiveCamera(
      45,
      initialWidth / initialHeight,
      0.01,
      1000
    );
    const cameraX = 5;
    const cameraY = 0;
    const cameraZ = 20;
    camera.position.set(cameraX, cameraY, cameraZ);

    // 렌더러 생성
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // 조명 추가
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    scene.background = new THREE.Color(0xadd8e6); // lightblue 색상

    // OrbitControls 추가
    controlsRef.current = new OrbitControls(camera, renderer.domElement);
    controlsRef.current.enableDamping = true;
    controlsRef.current.dampingFactor = 0.25;
    controlsRef.current.screenSpacePanning = false;
    controlsRef.current.rotateSpeed = 0.2;
    // 위아래 회전 제한 (수직 방향 회전 제한)
    controlsRef.current.maxPolarAngle = Math.PI / 2; // 90도
    controlsRef.current.minPolarAngle = Math.PI / 2; // 90도

    // 마우스 놓으면 원래 위치로 돌아가기
    const onMouseUp = () => {
      gsap.to(camera.position, {
        x: cameraX,
        y: cameraY,
        z: cameraZ,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => controlsRef.current.update(),
      });
    };
    window.addEventListener("mouseup", onMouseUp);

    // 애니메이션 루프
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // 크기 변경 시 렌더러와 카메라 업데이트
    const handleResize = () => {
      if (mountRef.current) {
        const width = mountRef.current.offsetWidth;
        const height = mountRef.current.offsetHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height); // 렌더러 크기 변경
      }
    };

    // 윈도우 크기나 부모 요소 크기 변경 시 처리
    window.addEventListener("resize", handleResize);
    handleResize(); // 초기 렌더러 크기 설정

    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}

export default ThreeScene;
