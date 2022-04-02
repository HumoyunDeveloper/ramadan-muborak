import * as THREE from "./three.module.js";
import { FontLoader } from "./FontLoader.js";
import { OrbitControls } from "./OrbitControls.js";
import { TextGeometry } from "./TextGeometry.js";

let scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(
    45,
    innerWidth / innerHeight,
    0.1,
    1000
);
camera.position.set(0, 0, 5);


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0xfafafa);
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
renderer.shadowMap.enabled = true;

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const light1 = new THREE.PointLight(0xff6666, 1, 100);
light1.castShadow = true;
light1.shadow.mapSize.width = 4096;
light1.shadow.mapSize.height = 4096;
scene.add(light1);

const loader = new FontLoader();
loader.load("./font.json", function (font = THREE.Font) {
    const geometry = new TextGeometry("Ramazon Muborak!", {
        font: font,
        size: 6,
        height: 2,
    });

    const textMesh = new THREE.Mesh(geometry, [
        new THREE.MeshPhongMaterial({ color: 0xad4000 }),
        new THREE.MeshPhongMaterial({ color: 0x5c2301 }),
    ]);
    textMesh.castShadow = true;
    textMesh.position.set(-35, 1, -80);
    scene.add(textMesh);
});

function animate() {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
}

document.body.appendChild(renderer.domElement);
animate();

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
