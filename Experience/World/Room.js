import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }

    setModel() {
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }

            //console.log(child);

            if (child.name === "Aquaruiem") {
                //console.log(child);
                child.children[0].material = new THREE.MeshPhysicalMaterial();
                child.children[0].material.roughness = -21;
                child.children[0].material.color.set(0x549dd2);
                child.children[0].material.ior = 1;
                child.children[0].material.transmission = 1;
                child.children[0].material.opacity = 1;
                // child.children[0].material.depthWrite = false;
                // child.children[0].material.depthTest = false;
            }

            if (child.name === "Computer") {
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }

            // // if (child.name === "Mini_Floor") {
            // //     child.position.x = -0.289521;
            // //     child.position.z = 8.83572;
            // // }

            // // if (
            // //     child.name === "Mailbox" ||
            // //     child.name === "Lamp" ||
            // //     child.name === "FloorFirst" ||
            // //     child.name === "FloorSecond" ||
            // //     child.name === "FloorThird" ||
            // //     child.name === "Dirt" ||
            // //     child.name === "Flower1" ||
            // //     child.name === "Flower2"
            // // ) {
            // //     child.scale.set(0, 0, 0);
            // // }

            // child.scale.set(0, 0, 0);
            // if (child.name === "Cube") {
            //     // child.scale.set(1, 1, 1);
            //     child.position.set(0, -1, 0);
            //     child.rotation.y = Math.PI / 4;
            // }

            // this.roomChildren[child.name.toLowerCase()] = child;
        });

        //fish tank
        const width = 1.1;
        const height = 1.7;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight(
            0xffffff,
            intensity,
            width,
            height
            );
            
        rectLight.position.set( 5.94513, 10.38, 6.71403);
        rectLight.rotation.x = -Math.PI / 2;
        rectLight.rotation.z = Math.PI / -3;
        this.actualRoom.add( rectLight )

        //left wall lamp
        // const width2 = .02;
        // const height2 = 0.1;
        // const intensity2 = 6;
        // const rectLight2 = new THREE.RectAreaLight(
        //     0xffffff,
        //     intensity2,
        //     width2,
        //     height2
        //     );
            
        // rectLight2.position.set( 3.56649, 17.9555 , -6.32272);
        // rectLight2.rotation.x = -Math.PI / 2;
        // rectLight2.rotation.z = Math.PI / 4;
  

        // this.actualRoom.add( rectLight2 )
        
        //right wall lamp

        // const width3 = 0.03;
        // const height3 = 15.1;
        // const intensity3 = 1.51;
        // const rectLight3 = new THREE.RectAreaLight(
        //     0xffffff,
        //     intensity3,
        //     width3,
        //     height3
        //     );
            
        // rectLight3.position.set( 7.94513, 18.58, 1.55403);
        // rectLight3.rotation.x = -Math.PI / 2;
        // rectLight3.rotation.z = Math.PI / -3;
        // this.actualRoom.add( rectLight3 )

        // // middle wall lamp 

        const width4 = 0.06;
        const height4 = 0.5;
        const intensity4 = 2.51;
        const rectLight4 = new THREE.RectAreaLight(
            0xffffff,
            intensity4,
            width4,
            height4
            );
            
        rectLight4.position.set( 7.94514, 20.0, -2.45404);
        rectLight4.rotation.x = -Math.PI / 2;
        rectLight4.rotation.z = Math.PI / -3;
        this.actualRoom.add( rectLight4 )

        // const rectLightHelper = new RectAreaLightHelper( rectLight4 );
        // rectLight4.add( rectLightHelper );   


        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11, 0.11, 0.11);

        // const width = 0.5;
        // const height = 0.7;
        // const intensity = 1;
        // const rectLight = new THREE.RectAreaLight(
        //     0xffffff,
        //     intensity,
        //     width,
        //     height
        // );
        // rectLight.position.set(7.68244, 7, 0.5);
        // rectLight.rotation.x = -Math.PI / 2;
        // rectLight.rotation.z = Math.PI / 4;
        // this.actualRoom.add(rectLight);

        // this.roomChildren["rectLight"] = rectLight;

        // // const rectLightHelper = new RectAreaLightHelper(rectLight);
        // // rectLight.add(rectLightHelper);
        // // console.log(this.room);


    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[0]);
        this.swim.play();
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation =
                ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.05;
        });
    }

    resize() {}

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta * 0.0009);
    }
}