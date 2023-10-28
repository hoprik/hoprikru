import * as THREE from 'three';
import * as Collision from './collisions.js'
import * as Movement from './movement.js'
import * as HoprikMath from './math.js'
import * as World from './world.js'
import * as Interaction from './interaction.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
let camera, scene, renderer, controls, collision, composer, stats, raycaster, debuggerElem, info;
export let movement
let isDebug = false
let isDebugButtonPress = false;

const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();

document.addEventListener("keydown", (event)=>{
	if (event.code == "F4" && !isDebugButtonPress){
		isDebug = !isDebug
		if (isDebug){
			create()
		}
		else{
			remove()
		}
		isDebugButtonPress = true;
	}
})
document.addEventListener("keyup", (event)=>{
	if (event.code == "F4"){
		isDebugButtonPress = false;
	}
})

function init() {

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.y = 10;

	scene = new THREE.Scene();

	controls = new PointerLockControls( camera, document.body );
	const blocker = document.getElementById( 'blocker' );
	const instructions = document.getElementById( 'instructions' );
	const pointer = document.querySelector( '.pointer' );

	instructions.addEventListener( 'click', function () {

		controls.lock();

	} );

	controls.addEventListener( 'lock', function () {

		instructions.style.display = 'none';
		blocker.style.display = 'none';
		pointer.style.display = 'flex'

	} );

	controls.addEventListener( 'unlock', function () {

		blocker.style.display = 'block';
		instructions.style.display = '';
		pointer.style.display = 'none'

	} );



	scene.add( controls.getObject() );


	renderer = new THREE.WebGLRenderer( );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = 3;
	document.body.appendChild( renderer.domElement );

	raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10);
	collision = new Collision.Collisons(controls, raycaster, camera);
	movement = new Movement.Movement(document, velocity, direction, controls, camera)



	Interaction.init(camera, raycaster,controls)
	World.init(scene, vertex, color)
	World.skyInit(scene)

	composer = new EffectComposer(renderer);

	const renderPass = new RenderPass( scene, camera );
	composer.addPass( renderPass );
	
	
	const outputPass = new OutputPass();
	composer.addPass( outputPass );
	window.addEventListener( 'resize', onWindowResize );
}



function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function create(){
	debuggerElem = document.createElement('div');
	info = document.createElement("p");
	info.innerText = "info: "
	info.className = "info"
	
	debuggerElem.appendChild(info)
	stats = new Stats();
	stats.showPanel( 0 ); 
	stats.dom.style.position = "absolute"
	stats.dom.style.top = "25px"
	debuggerElem.appendChild( stats.dom );
	document.body.appendChild(debuggerElem);
	isDebug = true;
	
}

function remove(){
	debuggerElem.remove()
	isDebug = false;
}

function logger(){
	info.innerHTML = "xyz "+Math.round(controls.getObject().position.x)+" "+Math.round(controls.getObject().position.y)+" "+Math.round(controls.getObject().position.z)+" direction "+HoprikMath.getDirection(camera.getWorldDirection(new THREE.Vector3())).name+" fps "
}




function render() {
	composer.render()

	if (isDebug){
	logger()
	stats.begin();
	stats.end();
	}

	requestAnimationFrame( render );

	if ( controls.isLocked === true ) {
		collision.collisonDetector()
		movement.move()
	}



}   

init();
render();