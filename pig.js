import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class Pig extends THREE.Object3D {
  constructor() {
    super();

    this.init().then(() => {
      this.particles = new WaterFountain();
      this.particles.position.set(0, .3, 0);
      this.add(this.particles);
    });

  }

  async init() {
    // Load the pig model
    const loader = new GLTFLoader();
    loader.load(
      // resource URL
      '/models/pig.glb',
      (gltf) => {

        gltf.scene.children[0].name = "pig-model"

        const material = new THREE.MeshPhongMaterial({
          color: new THREE.Color(Math.random(), Math.random(), Math.random()), // Pink color (adjust if needed)
        });

        gltf.scene.children[0].material = material;

        this.add(gltf.scene.children[0]);

      },
      function (xhr) {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

      },
      // called when loading has errors
      function (error) {

        console.log('An error happened', error);

      }
    );

    // Create a particle system for the coins
    this.coinParticles = new THREE.Group();

    //this.add(this.coinParticles);
  }

  update(time) {
    // Animation logic for the pig and coin particles
    this.particles.update(time);
    this.rotation.y += 0.001;
  }
}

class WaterFountain extends THREE.Object3D {
  constructor() {
    super();

    this.particleCount = 100;
    this.particles = [];

    this.particleGeometry = new THREE.BufferGeometry();
    this.particleMaterial = new THREE.PointsMaterial({
      color: 0x00aaff,
      size: .01,
      transparent: false,
      opacity: 1
    });

    this.initParticles();
    this.createParticleSystem();
  }

  initParticles() {
    const positions = new Float32Array(this.particleCount * 3);
    const velocities = new Float32Array(this.particleCount * 3);

    for (let i = 0; i < this.particleCount; i++) {
      // Initial positions (x, y, z)
      positions[i * 3] = 0; // x
      positions[i * 3 + 1] = 0; // y
      positions[i * 3 + 2] = 0; // z

      // Initial velocities
      const theta = Math.random() * Math.PI * 2;
      const speed = (Math.random() + 1) * 0.001;

      velocities[i * 3] = (Math.cos(theta) * speed); // vx
      velocities[i * 3 + 1] = (Math.random() + .2) * 0.01; // vy (upward force)
      velocities[i * 3 + 2] = (Math.sin(theta) * speed); // vz
    }

    this.particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.particleGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
  }

  createParticleSystem() {
    this.particleSystem = new THREE.Points(this.particleGeometry, this.particleMaterial);
    this.add(this.particleSystem);
  }

  update() {

    const positions = this.particleGeometry.attributes.position.array;
    const velocities = this.particleGeometry.attributes.velocity.array;

    for (let i = 0; i < positions.length / 3; i++) {
      positions[i * 3] += velocities[i * 3]; // Update x
      positions[i * 3 + 1] += (velocities[i * 3 + 1]); // Update y
      positions[i * 3 + 2] += velocities[i * 3 + 2]; // Update z

      //velocities[i * 3 + 1] -= 0.0001; // Simulate gravity

      // // Reset particles when they fall below a certain height
      if (positions[i * 3 + 1] > .5) {
        positions[i * 3] = 0;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = 0;


        //   const theta = Math.random() * Math.PI * 2;
        //   const speed = Math.random() * 1;
        //   velocities[i * 3] = Math.cos(theta) * speed;
        //   velocities[i * 3 + 1] = Math.random() * 1;
        //   velocities[i * 3 + 2] = Math.sin(theta) * speed;
      }
    }

    this.particleGeometry.attributes.position.needsUpdate = true;
  }
}


export default Pig;