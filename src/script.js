import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
const fontLoader = new THREE.FontLoader();
fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
  console.log('loaded');
  const textGeometry = new THREE.TextBufferGeometry('Hello world', {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  const matcapTexture = textureLoader.load('/textures/matcaps/7.png');
  //   const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  const textMaterial = new THREE.MeshNormalMaterial();
  //   gui.add(textMaterial, 'matcap');
  textGeometry.computeBoundingBox();
  //   textGeometry.translate(
  //     -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
  //     -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
  //     -(textGeometry.boundingBox.max.z - 0.02) * 0.5
  //   );
  textGeometry.center();
  console.log(textGeometry.boundingBox);
  //   gui.add(textGeometry, 'size').min(0).max(5).step(0.01);
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  //   textMesh.position.x = -2;
  scene.add(textMesh);
  const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 42);
  for (let i = 0; i < 1000; i++) {
    const donutMesh = new THREE.Mesh(donutGeometry, textMaterial);
    donutMesh.position.x = (Math.random() - 0.5) * 10;
    donutMesh.position.y = (Math.random() - 0.5) * 10;
    donutMesh.position.z = (Math.random() - 0.5) * 10;
    donutMesh.rotation.x = Math.random() * Math.PI;
    donutMesh.rotation.y = Math.random() * Math.PI;
    const rand = Math.random() - 0.5;
    donutMesh.scale.x = rand;
    donutMesh.scale.y = rand;
    donutMesh.scale.z = rand;
    scene.add(donutMesh);
  }
});
const gui = new dat.GUI();

/**
 * Base
 */
// Debug

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

/**
 * Object
 */
const cube = new THREE.Mesh(
  new THREE.BoxBufferGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial()
);

// scene.add(cube);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
