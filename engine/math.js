export const DIRECTIONS = {
	NORTH: {id: 1, name:"north"},
	WEST: {id: 2, name:"west"},
	SOUTH: {id: 3, name:"south"},
	EAST: {id: 4, name:"east"}
}


export function getDirection(direction){
	const angle = Math.atan2(direction.x, direction.z);


	// Определяем направление на основе угла
	let directionReturn = {}
	
	if (angle >= -Math.PI / 4 && angle < Math.PI / 4) {
		directionReturn = DIRECTIONS['EAST']
	} else if (angle >= Math.PI / 4 && angle < 3 * Math.PI / 4) {
		directionReturn = DIRECTIONS['NORTH']
	} else if (angle >= 3 * Math.PI / 4 || angle < -3 * Math.PI / 4) {
		directionReturn = DIRECTIONS['WEST']
	} else if (angle >= -3 * Math.PI / 4 && angle < -Math.PI / 4) {
		directionReturn = DIRECTIONS['SOUTH']
	}
	return directionReturn;
}

export function getDirectionById(id){
	return Object.values(DIRECTIONS).find(direction => direction.id === id);
}



