import * as THREE from "three";
//import Stats from "/node_modules/three/examples/jsm/libs/stats.module.js"; use for frames stats
import {CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// Scene
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
//raycast needs
let INTERSECTED;
let raycaster;
let tagNum = 0;


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
mesh1.userData.tag = "1";
scene.add(mesh1);

//face 2
const geometry2 = new THREE.BoxGeometry(.2, 3, 3); // width, height, depth
const material2 = new THREE.MeshLambertMaterial({ color: 0xffff00 });
const mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.position.set(1.6, 0, 0);
mesh2.userData.tag = "2";
scene.add(mesh2);

//face 3
const geometry3 = new THREE.BoxGeometry(3, 3, .2); // width, height, depth
const material3 = new THREE.MeshLambertMaterial({ color: 0xffff00 });
const mesh3 = new THREE.Mesh(geometry3, material3);
mesh3.position.set(0, 0, -1.6);
mesh3.userData.tag = "3";
scene.add(mesh3);

//face 4
const geometry4 = new THREE.BoxGeometry(.2, 3, 3); // width, height, depth
const material4 = new THREE.MeshLambertMaterial({ color: 0xffff00 });
const mesh4 = new THREE.Mesh(geometry4, material4);
mesh4.position.set(-1.6, 0, 0);
mesh4.userData.tag = "4";
scene.add(mesh4);

//create each face of the program
const p = document.createElement("div");



//label renderer
const labelRenderer =  new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight)
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.color = "white";
labelRenderer.domElement.style.pointerEvents = 'none'
document.body.appendChild(labelRenderer.domElement);

// Set up lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x000000, 0.6);
directionalLight.position.set(10, 20, 0); // x, y, z
scene.add(directionalLight);



// Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Movement
const controls = new OrbitControls(camera,renderer.domElement);
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
	labelRenderer.setSize(this.window.innerWidth, this.window.innerHeight);

}

//controls camera placement and updating of screen
function animate() {
	requestAnimationFrame( animate );
    
	//camera.updateMatrixWorld();
	//raycast pointing
	raycaster.setFromCamera(new THREE.Vector2(), camera);
	//checks if something intersects it (any object)
	const intersects = raycaster.intersectObjects(scene.children,false);
	
	if(intersects.length > 0)
	{
		//if the name of nothing does not equal nothing
		if(INTERSECTED != intersects[0].object)
		{
			if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

			INTERSECTED = intersects[ 0 ].object;
			tagNum = Number(INTERSECTED.userData.tag);
			console.log(tagNum);
			
			switch(tagNum)
			{
				case 1:
					p.innerHTML = '<video width="320" height="240" autoplay muted> <source src="Media\\vid1.mp4" type="video/mp4"> Your browser does not support the video tag. </video> ';
					//p.textContent = 'hello'; 
					const cPointLabel = new CSS2DObject(p);
					scene.add(cPointLabel);
					cPointLabel.position.set(0,0,2);
					INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
					INTERSECTED.material.emissive.setHex( 0xffff00 );	
					break;
				case 2:
					p.innerHTML = '<video width="320" height="240" autoplay muted> <source src="Media\\vid1.mp4" type="video/mp4"> Your browser does not support the video tag. </video> ';
					//p.textContent = 'hello'; 
					const dPointLabel = new CSS2DObject(p);
					scene.add(dPointLabel);
					dPointLabel.position.set(2,0,0);
					INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
					INTERSECTED.material.emissive.setHex( 0xff00ff );	
					break;
				case 3:
					p.innerHTML = '<video width="320" height="240" autoplay muted> <source src="Media\\vid1.mp4" type="video/mp4"> Your browser does not support the video tag. </video> ';
					//p.textContent = 'hello'; 
					const ePointLabel = new CSS2DObject(p);
					scene.add(ePointLabel);
					ePointLabel.position.set(0,0,-2);
					INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
					INTERSECTED.material.emissive.setHex( 0xffffff);	
					break;

				case 4:
					p.innerHTML = '<video width="320" height="240" autoplay muted> <source src="Media\\vid1.mp4" type="video/mp4"> Your browser does not support the video tag. </video> ';
					//p.textContent = 'hello'; 
					const fPointLabel = new CSS2DObject(p);
					scene.add(fPointLabel);
					fPointLabel.position.set(-2,0,0);
					INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
					INTERSECTED.material.emissive.setHex( 0x00ff00 );	
					break;
			}


		}
	} else //if not there, turn back to normal hue
	{
		if ( INTERSECTED ) 
		{
			INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
			console.log("balls");
		}
		p.innerHTML = "<p> nothing</p>"
	
		INTERSECTED = null;
	}
	labelRenderer.render(scene, camera);
	renderer.render( scene, camera );
}


