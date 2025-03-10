import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
function GLTFModel() {
  const gltfLoader = new GLTFLoader();
  const modelGroup = new THREE.Group(); // 여러 개의 모델을 담을 수 있도록 Group 사용
  const objLoader = new OBJLoader();

  const adjustModelScaleAndPosition = (model, scaleFactor, positionX) => {
    // 모델의 크기 계산
    const bbox = new THREE.Box3().setFromObject(model);
    const size = bbox.getSize(new THREE.Vector3());

    // 최대 크기를 기준으로 비율을 계산하고 크기 설정
    const maxDimension = Math.max(size.x, size.y, size.z);
    const scale = scaleFactor / maxDimension; // 상대적인 스케일 계산
    model.scale.set(scale, scale, scale); // 모델 크기 설정

    // 모델 위치 설정 (나란히 배치)
    model.position.set(positionX, 0, 0); // x값을 변경하여 옆으로 배치
  };

  gltfLoader.load(
    "/Three/pets/babyGhost.glb",
    (gltf) => {
      const model = gltf.scene;
      model.rotation.y = Math.PI / 4;
      modelGroup.add(model);
      adjustModelScaleAndPosition(model, 4, 2); // 펫 크기 설정
      model.position.y = 4;
    },
    undefined,
    (error) => {
      console.error("GLTF 모델 로드 실패:", error);
    }
  );
  // gltfLoader.load(
  //   "/Three/chick.glb",
  //   (gltf) => {
  //     const model = gltf.scene;
  //     model.scale.set(5, 5, 5);
  //     model.position.set(-5, 2, 8);
  //     model.rotation.y = Math.PI / 4;
  //     modelGroup.add(model);
  //   },
  //   undefined,
  //   (error) => {
  //     console.error("GLTF 모델 로드 실패:", error);
  //   }
  // );
  gltfLoader.load(
    "/Three/characters/Creative_Character_free.glb",
    (gltf) => {
      const model = gltf.scene;
      model.rotation.y = Math.PI / 4;
      modelGroup.add(model);
      adjustModelScaleAndPosition(model, 14, -5); // 캐릭터 크기 설정
    },
    undefined,
    (error) => {
      console.error("GLTF 모델 로드 실패:", error);
    }
  );

  modelGroup.position.y -= 7;
  return modelGroup; // Three.js 객체 반환
}

export default GLTFModel;
