export function getDirection(direction){
	const angle = Math.atan2(direction.x, direction.z);

	// Определяем направление на основе угла
	let directionText = "";
	if (angle >= -Math.PI / 4 && angle < Math.PI / 4) {
		directionText = "east";
	} else if (angle >= Math.PI / 4 && angle < 3 * Math.PI / 4) {
		directionText = "north";
	} else if (angle >= 3 * Math.PI / 4 || angle < -3 * Math.PI / 4) {
		directionText = "west";
	} else if (angle >= -3 * Math.PI / 4 && angle < -Math.PI / 4) {
		directionText = "south";
	}
	return directionText;
}

export function getDirectionById(direction){
    switch (direction) {
        case "north":
            
            break;
    
        default:
            break;
    }
}