import { AnimationAction, AnimationMixer, Group } from "three";
import { Asset } from "@three.ez/main";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";

export class Model extends Group {
  change(assetName: string) {
    if (this.children.length) this.remove(...this.children);
    Asset.load<any>(GLTFLoader, assetName, ({ loaded, total }) => {
      document.getElementById("loading").textContent =
        "download del modello: " + Math.floor((loaded / total) * 100) + "%";
    }).then((gltf) => {
      document.getElementById("loading").textContent = "";

      this.add(...clone(gltf.scene).children);

      if (assetName.includes("2k")) {
        this.translateY(-1.5);
        this.rotateY(Math.PI);
      }
      if (assetName.includes("free")) {
        this.translateZ(-2.5);
        this.translateY(-1.5);
        this.rotateY(Math.PI);
      }

      if (assetName.includes("lady")) {
        this.rotateY(Math.PI);
      }
      this._mixer = new AnimationMixer(this);
      this._idleAction = this._mixer.clipAction(gltf.animations[0]);

      this.on("animate", (e) => this._mixer.update(e.delta));

      this._idleAction.play();
    });
  }
  private _mixer: AnimationMixer;
  private _idleAction: AnimationAction;
  constructor(assetName: string) {
    super();
    this.change(assetName);
  }
}
