import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { useEffect, useRef } from "react";

function FBXModel() {
  const modelGroup = useRef(new THREE.Group()); // useRef로 객체 참조

  useEffect(() => {
    const loader = new FBXLoader();

    loader.load(
      "/Three/background/night.fbx", // FBX 파일 경로
      (fbx) => {
        fbx.scale.set(10, 10, 10); // 크기 설정 (배경 크기)
        fbx.position.set(0, 0, -50); // 카메라 뒤쪽에 배치
        fbx.rotation.y = Math.PI / 2; // 필요에 따라 회전
        modelGroup.current.add(fbx);
      },
      undefined,
      (error) => {
        console.error("FBX 모델 로드 실패:", error);
      }
    );

    return () => {
      modelGroup.current.traverse((object) => {
        if (object.isMesh) {
          object.geometry.dispose();
          if (object.material.isMaterial) {
            object.material.dispose();
          }
        }
      });
      modelGroup.current.clear();
    };
  }, []);

  return <primitive object={modelGroup.current} />; // primitive로 감싸서 반환
}

export default FBXModel;
