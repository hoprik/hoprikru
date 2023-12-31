import * as Collisons from './collisions.js'
import * as Main from './main.js'
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;
let speed = 400.0;
let speedRun = 600.0;
let speedWalk = 400.0
let prevTime = performance.now();
let velocityM;
let controlsM;

const onKeyDown = function ( event ) {
    if (controlsM.isLocked){
        switch ( event.code ) {

            case 'ArrowUp':
            case 'KeyW':
                moveForward = true;
                break;

            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = true;
                break;

            case 'ArrowDown':
            case 'KeyS':
                moveBackward = true;
                break;

            case 'ArrowRight':
            case 'KeyD':
                moveRight = true;
                break;

            case 'Space':
                if ( canJump === true ) velocityM.y += 50;
                canJump = false;
                break;
            case 'ShiftLeft':
                speed = speedRun;
                break;
        }
    }

};

const onKeyUp = function ( event ) {
    if (controlsM.isLocked){
        switch ( event.code ) {

            case 'ArrowUp':
            case 'KeyW':
                moveForward = false;
                break;

            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = false;
                break;

            case 'ArrowDown':
            case 'KeyS':
                moveBackward = false;
                break;

            case 'ArrowRight':
            case 'KeyD':
                moveRight = false;
                break;
            case 'ShiftLeft':
                speed = speedWalk
                break;
        }
    }
};



export class Movement{
    constructor (document, velocity, direction, controls, camera){
        velocityM = velocity;
        this.velocity = velocity;
        this.direction = direction;
        this.controls = controls;
        this.camera = camera;
        controlsM = controls;
        document.addEventListener( 'keydown', onKeyDown );
        document.addEventListener( 'keyup', onKeyUp );
    }

    move(){
        const time = performance.now();

        const delta = ( time - prevTime ) / 1000;

		this.velocity.x -= this.velocity.x * 10.0 * delta;
		this.velocity.z -= this.velocity.z * 10.0 * delta;

		this.velocity.y -= 9.8 * 40.0 * delta; // 100.0 = mass

		this.direction.z = Number( moveForward ) - Number( moveBackward );
		this.direction.x = Number( moveRight ) - Number( moveLeft );
		this.direction.normalize(); // this ensures consistent movements in all directions
    
		if ( moveForward || moveBackward ) this.velocity.z -= this.direction.z * speed * delta;
		if ( moveLeft || moveRight ) this.velocity.x -= this.direction.x * speed * delta;


		if ( Collisons.onObject === true ) {

			this.velocity.y = Math.max( 0, this.velocity.y );
			canJump = true;

		}
		this.controls.moveRight( - this.velocity.x * delta );
		this.controls.moveForward( - this.velocity.z * delta );

        if (this.controls.getObject().position.x > 1000){
            this.block(1)
        }
        if (this.controls.getObject().position.z < -1000){
            this.block(2)
        }
        if (this.controls.getObject().position.z < -1000){
            this.block(3)
        }
        if (this.controls.getObject().position.z > 1000){
            this.block(4)
        }

		this.controls.getObject().position.y += ( this.velocity.y * delta ); // new behavior

		if ( this.controls.getObject().position.y < 10 ) {

			this.velocity.y = 0;
			this.controls.getObject().position.y = 10;

			canJump = true;

		}
        prevTime = time;
	}

    block(id){
        if (id == 1){
            moveForward = false;
        }
        if (id == 2){
            moveRight = false;
        }
        if (id == 3){
            moveBackward = false;
        }
        if (id == 4){
            moveLeft = false;
        }
    }

    isDontMove(){
        if (!moveForward) if (!moveRight) if (!moveBackward) if (!moveLeft) return false;
    }

    setWalkSpeed(walk){
        speedWalk = walk;
        speed = walk
    }

    setRunSpeed(run){
        speedRun = run;
    }


}
