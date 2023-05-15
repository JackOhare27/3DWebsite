import * as THREE from "three";
//import Stats from "/node_modules/three/examples/jsm/libs/stats.module.js"; use for frames stats
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// Scene
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
//raycast needs
const pointer = new THREE.Vector2();
let INTERSECTED;
let raycaster;


// Add a cube to the scene
const geometry = new THREE.BoxGeometry(3, 3, 3); // width, height, depth
const material = new THREE.MeshLambertMaterial({ color: 0xffffff });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0);
scene.add(mesh);
//face 1
const geometry1 = new THREE.BoxGeometry(3, 3, .2); // width, height, depth
const material1 = new THREE.MeshLambertMaterial({ color: 0xffff00 });
const mesh1 = new THREE.Mesh(geometry1, material1);
mesh1.position.set(0, 0, 1.6);
scene.add(mesh1);

//face 2
const geometry2 = new THREE.BoxGeometry(.2, 3, 3); // width, height, depth
const material2 = new THREE.MeshLambertMaterial({ color: 0xffff00 });
const mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.position.set(1.6, 0, 0);
scene.add(mesh2);

//face 3
const geometry3 = new THREE.BoxGeometry(3, 3, .2); // width, height, depth
const material3 = new THREE.MeshLambertMaterial({ color: 0xffff00 });
const mesh3 = new THREE.Mesh(geometry3, material3);
mesh3.position.set(0, 0, -1.6);
scene.add(mesh3);

//face 4
const mesh4 = new THREE.Mesh(geometry2, material1);
mesh4.position.set(-1.6, 0, 0);
scene.add(mesh4);

// Set up lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x000000, 0.6);
directionalLight.position.set(10, 20, 0); // x, y, z
scene.add(directionalLight);

// Camera
const width = 10;
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Movement
const controls = new OrbitControls(camera,renderer.domElement);
controls.addEventListener( 'change', renderer ); // add this only if there is no animation loop (requestAnimationFrame)
//controls.listenToKeyEvents(window); //use when no animation
//controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
//controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.enablePan = false;
controls.enableZoom = false;
controls.maxPolarAngle = Math.PI / 2;
//raycast creation
raycaster = new THREE.Raycaster();

//camera initial placement
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
//window resizements
window.addEventListener( 'resize', onWindowResize );
// Renderer
renderer.setSize(window.innerWidth, window.innerHeight);
animate();

// Add it to HTML
document.body.appendChild(renderer.domElement);


//controls window resizing
function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

//controls camera placement and updating of screen
function animate() {
	requestAnimationFrame( animate );
    
	//camera.updateMatrixWorld();
	//raycast pointing
	raycaster.setFromCamera(new THREE.Vector2(), camera);
	//checks if something intersects it (any object)
	const intersects = raycaster.intersectObject(mesh1,false);
	
	if(intersects.length > 0)
	{
		//if the name of nothing does not equal nothing
		if(INTERSECTED != intersects[0].object)
		{
			if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

			INTERSECTED = intersects[ 0 ].object;
			INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
			INTERSECTED.material.emissive.setHex( 0x00ffff );	
		}
	} else //if not there, turn back to normal hue
	{
		if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

		INTERSECTED = null;
	}
	renderer.render( scene, camera );
}


