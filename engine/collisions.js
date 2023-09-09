import * as math from './math.js'
import * as World from './world.js'
import * as THREE from 'three'

function genRays(numRays){
	const rayDirections = [];

	// Генерация направлений лучей
	for (let i = 0; i < numRays; i++) {
		const angle = (i / numRays) * Math.PI * 2; 
		const direction = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)); // Создание вектора направления
		rayDirections.push(direction); 
	}
	return rayDirections;
}

export let onObject = 0;

function onCollide(){
    
}


export class Collisons{

    constructor (controll, raycast){
        this.controll = controll;
        this.raycast = raycast;
    }

    collisonDetector(){
        this.raycast.ray.origin.copy( this.controll.getObject().position);
		this.raycast.ray.origin.y -= 10;

		const intersections = this.raycast.intersectObjects( World.objects, false );

		onObject = intersections.length > 0;

		this.raycast.ray.origin.copy(this.controll.getObject().position);

		const rayDistance = 5;

		for (const direction of genRays(8)) {
			this.raycast.ray.direction.copy(direction);
		
			// Здесь можно проводить проверку на столкновение для каждого луча
			const intersections = this.raycast.intersectObjects(World.objects, false);
		
			// Обработка столкновений для текущего луча
			if (intersections.length > 0 && intersections[0].distance < rayDistance) {
                console.log(math.getDirection(direction));
			}
		}
    }


}