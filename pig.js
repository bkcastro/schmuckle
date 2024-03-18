import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class Pig extends THREE.Object3D {
    constructor() {
      super();
      this.init();
    }
  
    async init() {
      // Load the pig model
      const pig = await this.loadModel('models/pig.glb');
      this.add(pig);
  
      // Create a particle system for the coins
      this.coinParticles = new THREE.Group();
      this.add(this.coinParticles);
      this.createCoinParticles();
    }
  
    async loadModel(path) {
      const loader = new GLTFLoader();
      return new Promise((resolve, reject) => {
        loader.load(
          path,
          (gltf) => {
            resolve(gltf.scene);
          },
          undefined,
          (error) => {
            reject(error);
          }
        );
      });
    }
  
    createCoinParticles() {
      // Load the coin model and create particles
      this.loadModel('models/coin.glb').then((coinModel) => {
        for (let i = 0; i < 10; i++) {
          const coin = coinModel.clone();
          coin.position.set(
            Math.random() * 2 - 1,
            Math.random() * 2,
            Math.random() * 2 - 1
          );
          coin.scale.setScalar(0.1);
          this.coinParticles.add(coin);
        }
      });
    }
  
    update() {
      // Animation logic for the pig and coin particles
      this.coinParticles.children.forEach((coin) => {
        coin.rotation.y += 0.1;
        coin.position.y += 0.02;
        if (coin.position.y > 2) {
          coin.position.y = 0;
        }
      });
    }
  }

  export default Pig;