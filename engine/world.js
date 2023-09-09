import * as THREE from 'three';
import { Sky } from 'three/addons/objects/Sky.js';

export let objects = []

export function skyInit(scene){
    // Add Sky
    let sky = new Sky();
    sky.scale.setScalar( 450000 );
    scene.add( sky );
    console.log(sky);
    sky.material.uniforms["sunPosition"].value.y = 50
    sky.material.uniforms["sunPosition"].value.x = 50

    //sun = new THREE.Vector3();

    // /// GUI

    // const effectController = {
    //     turbidity: 10,
    //     rayleigh: 3,
    //     mieCoefficient: 0.005,
    //     mieDirectionalG: 0.7,
    //     elevation: 2,
    //     azimuth: 180,
    //     exposure: renderer.toneMappingExposure
    // };


    // const uniforms = sky.material.uniforms;
    // 5.5 = effectController.turbidity;
    // 1 = effectController.rayleigh;
    // 0 = effectController.mieCoefficient;
    // 0 = effectController.mieDirectionalG;

    // const phi = THREE.MathUtils.degToRad( 90 - 28.1 );
    // const theta = THREE.MathUtils.degToRad( -138.6);

    // sun.setFromSphericalCoords( 1, phi, theta );

    // uniforms[ 'sunPosition' ].value.copy( sun );

    // renderer.toneMappingExposure = effectController.exposure;
    // renderer.render( scene, camera );
}

export function init(scene, vertex, color){
    let floorGeometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
	floorGeometry.rotateX( - Math.PI / 2 );

	// vertex displacement

	let position = floorGeometry.attributes.position;

	for ( let i = 0, l = position.count; i < l; i ++ ) {

		vertex.fromBufferAttribute( position, i );

		vertex.x += Math.random() * 20 - 10;
		vertex.y += Math.random() * 2;
		vertex.z += Math.random() * 20 - 10;

		position.setXYZ( i, vertex.x, vertex.y, vertex.z );

	}

	floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

	position = floorGeometry.attributes.position;
	const colorsFloor = [];

	for ( let i = 0, l = position.count; i < l; i ++ ) {

		color.setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75, THREE.SRGBColorSpace );
		colorsFloor.push( color.r, color.g, color.b );

	}

	floorGeometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colorsFloor, 3 ) );

	const floorMaterial = new THREE.MeshPhongMaterial( { specular: 0xffffff, flatShading: true, vertexColors: true } );
	const floor = new THREE.Mesh( floorGeometry, floorMaterial );
	scene.add( floor );

	// objects

	const boxGeometry = new THREE.BoxGeometry( 20, 20, 20 ).toNonIndexed();

	position = boxGeometry.attributes.position;
	const colorsBox = [];

	for ( let i = 0, l = position.count; i < l; i ++ ) {

		color.setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75, THREE.SRGBColorSpace );
		colorsBox.push( color.r, color.g, color.b );

	}

	boxGeometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colorsBox, 3 ) );

	for ( let i = 0; i < 500; i ++ ) {

		const boxMaterial = new THREE.MeshPhongMaterial( { specular: 0xffffff, flatShading: true, vertexColors: true } );
		boxMaterial.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75, THREE.SRGBColorSpace );

		const box = new THREE.Mesh( boxGeometry, boxMaterial );
		box.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
		box.position.y = Math.floor( Math.random() * 20 ) * 20 + 10;
		box.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;

		scene.add( box );
		objects.push( box );

	}

    let light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(50, 50, 0);
    light.target.position.set(300, 400, 200);    

    scene.add(light)

    var helper = new THREE.CameraHelper( light.shadow.camera );
    scene.add(helper);

    
	// const light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 2.5 );
	// light.position.set( 0.5, 1, 0.75 );
	// scene.add( light );

}