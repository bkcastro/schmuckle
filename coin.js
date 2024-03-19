import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// When you create a coin you can choose coin type 1 or 2, or get a random one. 
class Coin extends THREE.Object3D {
    constructor(coinType = null) {
        super();

        this.coinType = coinType;
        this.file = "";

        if (this.coinType == null) {
            this.file = (Math.random() >= .5) ? "./models/coin1.glb" : "./models/coin2.glb";
        } else {
            this.file = (this.coinType == 1) ? "./models/coin1.glb" : "./models/coin2.glb";
        }

        this.init();

    }

    async init() {
        // Load the pig model
        const loader = new GLTFLoader();
        loader.load(
            // resource URL
            this.file,
            (gltf) => {

                this.add(gltf.scene);

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

        this.add(this.coinParticles);
    }

    update(time) {
        // Animation logic for the coin
        this.rotation.y += 0.001;
    }
}

export default Coin;