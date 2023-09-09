import * as THREE from 'three';
import * as Collision from './collisions.js'
import * as Movement from './movement.js'
import * as HoprikMath from './math.js'
import * as World from './world.js'

import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

const info = document.querySelector(".info")

let camera, scene, renderer, controls, collision, movement;


let raycaster;


const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();



init();
render();

function init() {

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.y = 10;

	scene = new THREE.Scene();
	scene.background = new THREE.TextureLoader().load( "./textures/sky.jpg" );

	controls = new PointerLockControls( camera, document.body );

	movement = new Movement.Movement(document, velocity, direction, controls)

	const blocker = document.getElementById( 'blocker' );
	const instructions = document.getElementById( 'instructions' );

	instructions.addEventListener( 'click', function () {

		controls.lock();

	} );

	controls.addEventListener( 'lock', function () {

		instructions.style.display = 'none';
		blocker.style.display = 'none';

	} );

	controls.addEventListener( 'unlock', function () {

		blocker.style.display = 'block';
		instructions.style.display = '';

	} );

	scene.add( controls.getObject() );


	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
	collision = new Collision.Collisons(controls, raycaster)

	World.init(scene, vertex, color)
	World.skyInit(scene)

	window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function logger(){
	info.innerHTML = "xyz "+Math.round(controls.getObject().position.x)+" "+Math.round(controls.getObject().position.y)+" "+Math.round(controls.getObject().position.z)+" direction "+HoprikMath.getDirection(camera.getWorldDirection(new THREE.Vector3()))
}

function render() {

	logger()

	requestAnimationFrame( render );

	if ( controls.isLocked === true ) {
		collision.collisonDetector()
		movement.move()
	}
	renderer.render( scene, camera );
}   