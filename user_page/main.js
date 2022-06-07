import * as THREE from 'three';

// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(30);
camera.position.setX(-3);

// RENDERER
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// skill spheres
function add_sphere(pos, path) {
  const texture = new THREE.TextureLoader().load(`assets/${path}`);
  const skill_obj = new THREE.SphereGeometry(5, 32, 32);
  const skill_mat = new THREE.MeshStandardMaterial({ map: texture });
  const skill = new THREE.Mesh(skill_obj, skill_mat);
  skill.position.setX(pos.x);
  skill.position.setY(pos.y);
  skill.position.setZ(pos.z);
  skill.scale.set(2.5, 2.5, 2.5);
  return skill;
}

var js_sphere = add_sphere({ x: -40, y: 30, z: -50 }, 'js.png');
var html_sphere = add_sphere({ x: -80, y: -5, z: 30 }, 'html.png');
var cpp_sphere = add_sphere({ x: -60, y: -5, z: -40 }, 'cpp.jpg');
var python_sphere = add_sphere({ x: -10, y: -10, z: -60 }, 'python.jpg');
scene.add(js_sphere);
scene.add(html_sphere);
scene.add(cpp_sphere);
scene.add(python_sphere);
// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background
const spaceTexture = new THREE.TextureLoader().load('assets/bg1.jpg');
scene.background = spaceTexture;

// Box
var loader = new THREE.TextureLoader();
var mats = [
  'assets/cpp.jpg',
  'assets/java.png',
  'assets/python.jpg',
  'assets/ml.jpg',
  'assets/js.png',
  'assets/html.png'
].map(pic => {
  return new THREE.MeshLambertMaterial({map: loader.load(pic)});
});
var geom = new THREE.BoxBufferGeometry(3, 3, 3);
var skill_box = new THREE.Mesh(geom, mats);
scene.add(skill_box);

// Skill
const skillsTexture = new THREE.TextureLoader().load('assets/skills.jpeg');

const skills = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: skillsTexture,
  })
);

scene.add(skills);

skills.position.z = 30;
skills.position.setX(-10);

skill_box.position.z = -5;
skill_box.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  skills.rotation.x += 0.05;
  skills.rotation.y += 0.075;
  skills.rotation.z += 0.05;

  skill_box.rotation.y += 0.01;
  skill_box.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);

  skills.rotation.x += 0.005;

  cpp_sphere.rotation.y += 0.02;
  // cpp_sphere.rotation.x += 0.02;

  js_sphere.rotation.y += 0.02;
  js_sphere.rotation.z += 0.02;

  html_sphere.rotation.y += 0.02;
  html_sphere.rotation.z += 0.02;

  python_sphere.rotation.y += 0.02;
  python_sphere.rotation.z += 0.02;

  skill_box.rotation.y -= 0.005;
  skill_box.rotation.z -= 0.005;
  skill_box.rotation.x += 0.005;
  // controls.update();

  renderer.render(scene, camera);
}

animate();
