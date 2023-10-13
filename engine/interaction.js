import * as THREE from 'three';
import * as World from './world.js';


let intercationButtonPress = false;

export function init(camera, raycaster, controll){
    document.addEventListener("keyup", (event)=>{
        if (event.code == "KeyE" && !intercationButtonPress){
            raycaster.ray.origin.copy(controll.getObject().position);

            const rayDistance = 50;

            raycaster.ray.direction.copy(camera.getWorldDirection(new THREE.Vector3()));

            let interactionObjects = []

            World.interactionObject.forEach(element => {
                    interactionObjects.push(element["object"])
            });
            

            const intersections = raycaster.intersectObjects(interactionObjects, true);

            if (intersections.length > 0 && intersections[0].distance < rayDistance) {
                World.interactionObject.forEach(element => {
                    console.log(intersections);
                    if (intersections[0] == element["object"]){
                        element["fun"]()
                    }
                });
            }
            intercationButtonPress = true;
        }
    })

    document.addEventListener("keydown", (event)=>{
        if (event.code == "KeyE" && intercationButtonPress){
            intercationButtonPress = false;
        }
    })
}
