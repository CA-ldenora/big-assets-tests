import {
  Cache,
  Scene,
  DirectionalLight,
  AmbientLight,
  Color,
  PointLight,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Main, Asset, OrthographicCameraAuto } from "@three.ez/main";
import { Soldier } from "./soldier";

const canvas = document.getElementById("avatar");
const main = new Main({ rendererParameters: { canvas }, fullscreen: true }); // init three.ez app
Cache.enabled = true;
await Asset.preloadAllPending({
  onProgress: (e) =>
    (document.getElementById("loading").textContent = e * 100 + "%"),
});

const scene = new Scene().add(
  new Soldier().translateY(-1.5),
  new DirectionalLight(0xffffff, 1.5).translateZ(5),
  //new PointLight(0xffaa55, 1.5, 100).translateZ(5).translateX(5).translateY(10),
  //new DirectionalLight(0xffaa55).translateZ(3).translateX(-3),
  new AmbientLight(0xffffff, 1.0),
);
const camera = new OrthographicCameraAuto(2).translateZ(100);

main.createView({
  scene,
  camera: camera,
  enabled: false,
});
const controls = new OrbitControls(camera, main.renderer.domElement);
