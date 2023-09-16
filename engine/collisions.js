import * as HoprikMath from './math.js'
import * as World from './world.js'
import * as THREE from 'three'
import { movement } from './main.js';

function genRays(numRays){
	const rayDirections = [];

	// Генерация направлений лучей
	for (let i = 0; i < numRays; i++) {
		const angle = (i / numRays) * Math.PI * 2; 
		const directionM = new THREE.Vector3(Math.cos(angle), -45, Math.sin(angle)); // Создание вектора направления
		rayDirections.push(directionM); 
		const directionN = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)); // Создание вектора направления
		rayDirections.push(directionN); 
		const directionB = new THREE.Vector3(Math.cos(angle), 45, Math.sin(angle)); // Создание вектора направления
		rayDirections.push(directionB); 
	}
	return rayDirections;
}

export let onObject = 0;

function onCollide(){
    
}


export class Collisons{

    constructor (controll, raycast, camera){
        this.controll = controll;
        this.raycast = raycast;
		this.camera = camera;
    }

    collisonDetector(){
        this.raycast.ray.origin.copy( this.controll.getObject().position);
		this.raycast.ray.origin.y -= 10;

		const intersections = this.raycast.intersectObjects( World.objects, false );

		onObject = intersections.length > 0;

		this.raycast.ray.origin.copy(this.controll.getObject().position);

		const rayDistance = 7;

		for (const direction of genRays(20)) {
			this.raycast.ray.direction.copy(direction);
		
			// Здесь можно проводить проверку на столкновение для каждого луча
			const intersections = this.raycast.intersectObjects(World.objects, true);
		
			// Обработка столкновений для текущего луча
			if (intersections.length > 0 && intersections[0].distance < rayDistance) {
                const collisionDirection = HoprikMath.getDirection(direction);
				const cameraDirection = HoprikMath.getDirection(this.camera.getWorldDirection(new THREE.Vector3()))
				let id = cameraDirection.id;
				for (let counter = 1; counter < 5; counter++) {
					if (id == collisionDirection.id){
						movement.block(counter)
					}
					id--;
					if (id == 0){
						id = 4;
					}
				}
				

			}
		}
    }


}