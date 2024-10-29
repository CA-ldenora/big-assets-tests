import { Cache, Scene, DirectionalLight, AmbientLight } from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Main, Asset, OrthographicCameraAuto } from "@three.ez/main";
import { Model } from "./soldier";

const canvas = document.getElementById("avatar");
const main = new Main({ rendererParameters: { canvas }, fullscreen: true }); // init three.ez app

let model = new Model("models/base.glb", main.renderer);

const scene = new Scene().add(
  new DirectionalLight(0xffffff, 1.5).translateZ(5),
  new AmbientLight(0xffffff, 1.0)
);
scene.add(model);

const gui = new GUI();
let obj = { model: "models/cutegirl_2k.glb", resetView: true };
gui
  .add(obj, "model", [
    "models/character_free_model_3d_by_oscar_creativo.glb",
    "models/cutegirl_1k.glb",
    "models/cutegirl_2k.glb",
    "models/lady_deadpool.glb",
    "models/base.glb",
  ])
  .name("Change Model")
  .onChange((value: string) => {
    scene.remove(model);
    if (obj.resetView) controls.reset();
    model = new Model(value, main.renderer);
    scene.add(model);
  });
gui.add(obj, "resetView").name("center camera on model change");

const camera = new OrthographicCameraAuto(200).translateZ(100);

main.createView({
  scene,
  camera: camera,
  enabled: false,
});
const controls = new OrbitControls(camera, main.renderer.domElement);
