import { Cache, Scene, DirectionalLight, AmbientLight } from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Main, Asset, OrthographicCameraAuto } from "@three.ez/main";
import { Model } from "./soldier";

const canvas = document.getElementById("avatar");
const main = new Main({ rendererParameters: { canvas }, fullscreen: true }); // init three.ez app
Cache.enabled = true;

const model = new Model("models/cutegirl_2k.glb");
const gui = new GUI();
let obj = { model: "models/cutegirl_2k.glb" };
gui
  .add(obj, "model", [
    "models/character_free_model_3d_by_oscar_creativo.glb",
    "models/cutegirl_1k.glb",
    "models/cutegirl_2k.glb",
    "models/lady_deadpool.glb",
  ])
  .name("Change Model")
  .onChange((value: string) => {
    model.change(value);
  });

const scene = new Scene().add(
  model,
  new DirectionalLight(0xffffff, 1.5).translateZ(5),
  new AmbientLight(0xffffff, 1.0),
);
const camera = new OrthographicCameraAuto(2).translateZ(100);

main.createView({
  scene,
  camera: camera,
  enabled: false,
});
const controls = new OrbitControls(camera, main.renderer.domElement);
