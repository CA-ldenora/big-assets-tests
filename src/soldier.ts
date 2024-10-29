import { AnimationAction, AnimationMixer, Group, Object3D } from "three";
import { Asset } from "@three.ez/main";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";
export class Model extends Group {
  private _mixer: AnimationMixer = new AnimationMixer(this);
  private _idleAction: AnimationAction;
  private _talkAction: AnimationAction;
  constructor(assetName: string) {
    super();
    this.change(
      `https://corsproxy.io/?https://github.com/CA-ldenora/big-assets-tests/raw/refs/heads/main/public/${assetName}`
    );
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
    this._idleAction = this._mixer.clipAction(gltf.animations[0]);
    if (assetName.includes("2k")) {
      this.translateY(-1.5);
      this.rotateY(Math.PI);
    }
    if (assetName.includes("base")) {
      this.translateY(-1.5);
      this.translateZ(-50);
      this._mixer.uncacheClip(this._idleAction.getClip());
      this._idleAction = this._mixer.clipAction(gltf.animations[31]);
      this._talkAction = this._mixer.clipAction(gltf.animations[12]);
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

    this.on("animate", (e) => this._mixer.update(e.delta));

    this._idleAction.play();

    this.needsRender = true;
  }
}
