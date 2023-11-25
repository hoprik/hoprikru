import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export let objects = []
export let interactionObject = []

export function skyInit(scene){
}

function door(scene, x, y, z){

	const boxGeometry = new THREE.BoxGeometry( 9.3, 17, 0.5 ).toNonIndexed();
	const colorsBox = [];


	boxGeometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colorsBox, 3 ) );

	const boxMaterial = new THREE.MeshPhongMaterial( { specular: 0xffffff, flatShading: true, vertexColors: true } );
	boxMaterial.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75, THREE.SRGBColorSpace );

	const box = new THREE.Mesh( boxGeometry, boxMaterial );
	box.position.x = x 
	box.position.y = y 
	box.position.z = z 
	box.castShadow = true;
	box.receiveShadow = true;
	console.log(box);

	let isOpen = false
	scene.add( box );
	interactionObject.push( {object: box, fun:(e)=>{
		const inter = setInterval(() => {	
			let rotate = 1.7
			let position = 4
			if (isOpen){
				rotate =- rotate
				position =- position
			}
			e.rotation.y = e.rotation.y + rotate * 0.1
			e.position.x = e.position.x + position * 0.1
			e.position.z = e.position.z + position * 0.1
			if (e.rotation.y > 1.5 || e.rotation.y < 0){
				if (e.rotation.y > 1.5 ) e.rotation.y = 1.5 
				if (e.rotation.y < 0) e.rotation.y = 0 
				clearInterval(inter)
				isOpen = !isOpen
			}
		}, 10);
	}});

	objects.push(box)
}

function door2(scene, x, y, z){

	const boxGeometry = new THREE.BoxGeometry( 7.8, 14, 0.3 ).toNonIndexed();
	const colorsBox = [];


	boxGeometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colorsBox, 3 ) );

	const boxMaterial = new THREE.MeshPhongMaterial( { specular: 0xffffff, flatShading: true, vertexColors: true } );
	boxMaterial.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75, THREE.SRGBColorSpace );

	const box = new THREE.Mesh( boxGeometry, boxMaterial );
	box.position.x = x 
	box.position.y = y 
	box.position.z = z 
	box.castShadow = true;
	box.receiveShadow = true;
	console.log(box);

	const save = box.position.x
	let isOpen = false
	scene.add( box );
	interactionObject.push( {object: box, fun:(e)=>{
		const inter = setInterval(() => {	
			let position = 7.8
			if (isOpen){
				position =- position
			}
			e.position.x += position * 0.1
			if (e.position.x > save + 7.8 || e.position.x < save){
				clearInterval(inter)
				isOpen = !isOpen
			}
		}, 10);
	}});

	objects.push(box)
}

export function init(scene, vertex, color, camera){

	const HemisphereLight = new THREE.HemisphereLight( 0xeeeeff, 0x777788,0.4 );
	HemisphereLight.position.set( 0.5, 1, 0.75 );
	scene.add( HemisphereLight );
	// objects

	door(scene, 57, 8.5, -26.8)
	door(scene, 56.5, 8.5, 14.9)
	door2(scene, 27.7, 8.5, 12.2)


	const loader = new GLTFLoader();

	loader.load( './assets/models/kitchen.glb', function ( gltf ) {
		console.log(gltf);
		gltf.scene.position.x = 50
		gltf.scene.scale.x = 3.5;
		gltf.scene.scale.y = 3.5;
		gltf.scene.scale.z = 3.5;
		scene.add( gltf.scene );	
		gltf.scene.children.forEach(element => {
			if (element.name == "light"){
				const light = new THREE.PointLight( 0xFFFFFF, 1000, 100);
				light.position.set(gltf.scene.position.x+element.position.x, element.position.y,  element.position.z);
				scene.add( light );
			}
			else{
				element.castShadow = true;
				element.receiveShadow = true;
				
				if (element.name == "Cube015"){
					if (element.children[0].material.name == "Зеркало"){
						// const cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 1024 );
						// let mirrorSphereCamera = new THREE.CubeCamera( 0.05, 50, cubeRenderTarget );
						// scene.add( mirrorSphereCamera );
						// const mirrorSphereMaterial = new THREE.MeshBasicMaterial( { envMap: camera.texture } );
						// element.children[0].material = mirrorSphereMaterial;
						// console.log(element);
					}	
				}
			}

		});

	}, undefined, function ( error ) {

		console.error( error );

	});


	loader.load( './assets/models/kithcen-hitboxmap.glb', function ( gltf ) {
		gltf.scene.position.x = 50
		gltf.scene.scale.x = 3.5;
		gltf.scene.scale.y = 5;
		gltf.scene.scale.z = 3.5;
		gltf.scene.visible = false;
		gltf.scene.castShadow = true;
		gltf.scene.receiveShadow = true;
		scene.add( gltf.scene );
		gltf.scene.children.forEach((child)=>{
			objects.push(child)
		})

	}, undefined, function ( error ) {

		console.error( error );

	});

}
