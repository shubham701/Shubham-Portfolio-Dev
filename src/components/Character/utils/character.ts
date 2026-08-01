import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        let character: THREE.Object3D;
        loader.load(
          "/models/character.glb",
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                // Make the character smile by setting smile morph targets
                if (mesh.morphTargetDictionary && mesh.morphTargetInfluences) {
                  for (const key in mesh.morphTargetDictionary) {
                    if (key.toLowerCase().includes("smile")) {
                      const index = mesh.morphTargetDictionary[key];
                      mesh.morphTargetInfluences[index] = 0.5; // 0.5 for a 'little' smile
                    }
                  }
                }

                // Dynamically change colors based on common mesh/material names
                if (mesh.material) {
                  const meshName = (mesh.name || "").toLowerCase();
                  const singleMaterial = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
                  const matName = (singleMaterial.name || "").toLowerCase();
                  const isTop = meshName.includes('shirt') || meshName.includes('top') || matName.includes('shirt') || matName.includes('top');
                  const isBottom = meshName.includes('pant') || meshName.includes('bottom') || meshName.includes('leg') || matName.includes('pant') || matName.includes('bottom');
                  const isSkin = meshName.includes('skin') || meshName.includes('body') || meshName.includes('head') || meshName.includes('face') || matName.includes('skin') || matName.includes('body') || matName.includes('head');

                  if (isTop || isBottom || isSkin) {
                    mesh.material = (mesh.material as THREE.Material).clone();
                    const mat = mesh.material as THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial;
                    
                    if (isTop) {
                      mat.color.set('#cbb1ff'); // Light Purple
                      mat.roughness = 0.9;      // Matte finish
                      mat.metalness = 0.1;
                      mat.map = null; 
                    } else if (isBottom) {
                      mat.color.set('#1a1a1a'); // Dark Black
                      mat.map = null;
                    } else if (isSkin) {
                      mat.color.set('#d2a18c'); // Light brown human skin tone
                    }
                  }
                }
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            if (character.getObjectByName("footR")) character.getObjectByName("footR")!.position.y = 3.36;
            if (character.getObjectByName("footL")) character.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
