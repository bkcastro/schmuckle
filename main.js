import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Pig from './pig';
import GUI from 'lil-gui'

// Debug
const gui = new GUI()
gui.hide()

// Scene
const scene = new THREE.Scene()

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

// White directional light at half intensity shining from the top.
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1.5 );
directionalLight.position.set(1, 1, 1);
scene.add( directionalLight );

const hemiLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( hemiLight );

scene.add(new THREE.AxesHelper(10, 10));

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = 1
camera.position.z = 1
camera.lookAt(new THREE.Vector3(0, 0, 0))
scene.add(camera);

const container = document.getElementById("container");

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setClearColor(new THREE.Color(0xffffFF));


// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

scene.add(controls);

var pig = new Pig();
scene.add(pig);

const clock = new THREE.Clock()

renderer.setAnimationLoop(function () {

    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    pig.update();

    renderer.render(scene, camera);

});