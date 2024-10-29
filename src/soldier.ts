import {
  AnimationAction,
  AnimationMixer,
  Group,
  LoadingManager,
  MeshStandardMaterial,
  Object3D,
  REVISION,
  Vector3,
  WebGLRenderer,
} from "three";
import { Asset } from "@three.ez/main";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";
const MANAGER = new LoadingManager();
const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`;
const KTX2_LOADER = new KTX2Loader(MANAGER).setTranscoderPath(
  `${THREE_PATH}/examples/jsm/libs/basis/`
);

export class Model extends Group {
  private _mixer: AnimationMixer = new AnimationMixer(this);
  private _idleAction: AnimationAction;
  private _talkAction: AnimationAction;
  constructor(assetName: string, private renderer: WebGLRenderer) {
    super();
    this.change(
      `https://corsproxy.io/?https://github.com/CA-ldenora/big-assets-tests/raw/refs/heads/main/public/${assetName}`
    );
  }
  public async change(assetName: string) {
    if (assetName.includes("base")) {
      const loader = new GLTFLoader(MANAGER)
        .setCrossOrigin("anonymous")
        .setKTX2Loader(KTX2_LOADER.detectSupport(this.renderer))
        .setMeshoptDecoder(MeshoptDecoder);
      const gltf = (await loader.loadAsync(assetName, ({ loaded, total }) => {
        document.getElementById("loading").textContent =
          "download del modello: " + Math.floor((loaded / total) * 100) + "%";
      })) as any;

      document.getElementById("loading").textContent = "";
      this._add(gltf, assetName);
    } else {
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
  }
  private _add(gltf: Object3D, assetName: string) {
    this.add(...clone(gltf.scene).children);
    this._idleAction = this._mixer.clipAction(gltf.animations[0]);
    if (assetName.includes("2k")) {
      this.scale.set(15, 15, 15);
      this.translateY(-1.5);
      this.rotateY(Math.PI);
    }
    if (assetName.includes("base")) {
      this.scale.set(40, 40, 40);
      this.position.setY(5);
      this._mixer.uncacheClip(this._idleAction.getClip());
      this._idleAction = this._mixer.clipAction(gltf.animations[32]);
      this._talkAction = this._mixer.clipAction(gltf.animations[12]);
      this._talkAction.setEffectiveTimeScale(0.9)
    }
    if (assetName.includes("1k")) {
      this.scale.set(15, 15, 15);
      this.translateY(1.5);
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
    this._talkAction?.play();

    this.needsRender = true;
  }
}
