import {
  AnimationAction,
  AnimationMixer,
  Group,
  Material,
  MeshStandardMaterial,
  SkinnedMesh,
} from "three";
import { Asset, Utils } from "@three.ez/main";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";

Asset.preload(
  GLTFLoader,
  //"models/character_free_model_3d_by_oscar_creativo.glb",
  //"models/cutegirl_1k.glb",
  "models/cutegirl_2k.glb",
  //"models/lady_deadpool.glb",
  //"models/facial_animation.glb",
);

export class Soldier extends Group {
  private _mixer = new AnimationMixer(this);
  private _idleAction: AnimationAction;
  constructor() {
    super();
    const gltf = Asset.get<GLTF>(
      "models/cutegirl_2k.glb",

      //"models/character_free_model_3d_by_oscar_creativo.glb",
      //"models/cutegirl_1k.glb",

      //"models/lady_deadpool.glb",
    );
    //const redMaterial = new MeshStandardMaterial({ color: 0xff0000 });
    //console.log(gltf.scene);
    //gltf.scene.traverse((obj: any) => {
    //  if (obj.material && obj.material.name === "Hair_A_Mat_Transparency") {
    //    obj.material = redMaterial;
    //    debugger;
    //  }
    //});
    this.add(...clone(gltf.scene).children);

    this.rotateY(Math.PI);
    //Utils.computeBoundingSphereChildren(this); // to make raycast works properly
    //Utils.setChildrenDragTarget(this, this); // make it draggable

    this._idleAction = this._mixer.clipAction(gltf.animations[0]);

    this.on("animate", (e) => this._mixer.update(e.delta));

    this._idleAction.play();
  }
}
