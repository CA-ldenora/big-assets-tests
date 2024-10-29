import { AnimationAction, AnimationMixer, Group, Object3D } from "three";
import { Asset } from "@three.ez/main";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";
export class Model extends Group {
  private _mixer: AnimationMixer = new AnimationMixer(this);
  private _idleAction: AnimationAction;
  constructor(assetName: string) {
    super();
    this.change(assetName);
  }
  public async change(assetName: string) {
    const gltf = await Asset.load<any>(
      GLTFLoader,
      assetName,
      ({ loaded, total }) => {
        document.getElementById("loading").textContent =
          "download del modello: " + Math.floor((loaded / total) * 100) + "%";
      },
      (r) => console.log(r)
    );
    document.getElementById("loading").textContent = "";
    this._add(gltf, assetName);
  }
  private _add(gltf: Object3D, assetName: string) {
    this.add(...clone(gltf.scene).children);

    if (assetName.includes("2k")) {
      this.translateY(-1.5);
      this.rotateY(Math.PI);
    }
    if (assetName.includes("1k")) {
      this.translateY(-1.5);
      this.rotateY(Math.PI);
    }
    if (assetName.includes("free")) {
      this.translateZ(-10);
      this.translateY(-3);
    }

    if (assetName.includes("lady")) {
      this.translateZ(-50);
      this.translateY(-2.5);
    }
    this._idleAction = this._mixer.clipAction(gltf.animations[0]);

    this.on("animate", (e) => this._mixer.update(e.delta));

    this._idleAction.play();

    this.needsRender = true;
  }
}
