import * as THREE from "three";
import Experience from "../Experience.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "/node_modules/gsap/ScrollTrigger.js";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room;
        gsap.registerPlugin(ScrollTrigger);

        this.setScrollTrigger();

}

    setScrollTrigger(){
        ScrollTrigger.matchMedia({
            //desktop
            "(min-width: 969px)": () => {
                console.log("fired desktop");

                this.firstMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        markers: true,
                        start: "top top",
                        end: "bottom bottom",
                    },
                });
                this.firstMoveTimeline.to(this.room, {
                    x: () => {
                        return this.sizes.width * 0.0014;
                    },
                });
            },

            //mobile
            "(max-width: 968px)": () => {
                console.log("fired mobile");
            },

            all: function () {},
          });
    }
    
    resize() {}

    update() {}
}

