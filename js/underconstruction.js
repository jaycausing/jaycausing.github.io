var THREE = require('three');
var OBJLoader = require('three-obj-loader');
OBJLoader(THREE);

var canvas, scene, camera, renderer;
var wWidth, wHeight;

// initializes the camera, webgl renderer, and scene
// into the canvas
function init() {
  canvas = document.getElementById("canvas");
  wWidth = window.innerWidth;
  wHeight = window.innerHeight;
  renderer = new THREE.WebGLRenderer({
    canvas: canvas
  });
  renderer.setSize(wWidth, wHeight);
  renderer.setClearColor(0xffffff, 1.0);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, wWidth / wHeight, 0.5, 1000);
  camera.position.set(0, 0, 5);

  scene.add(camera);
}

// renders objects to the scene and animates them
function animate() {
  requestAnimationFrame(animate);

  // add animation here

  renderer.render(scene, camera);
}

// FIXME: aspect ratio isnt consistent on window resize
function onWindowResize() {
  canvas = document.getElementById("canvas");
  wWidth = window.innerWidth;
  wHeight = window.innerHeight;

  //set canvas size to match window
  canvas.width = wWidth;
  canvas.height = wHeight;

  /*
  Objects stretching on window size change is
  from static FOV camera var
  */
  //TODO: Figure out how to scale FOV on window resize
  renderer.setSize(wWidth, wHeight, true);
  camera.aspect(wWidth / wHeight);
  camera.updateProjectionMatrix();
}


/*****************************/
/*** DOCUMENT SCRIPT BEGIN ***/
/*****************************/


init();

//ensures object faces not hit by dLight still visible
var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

var dLight = new THREE.DirectionalLight();
scene.add(dLight);

// create loading manager
var manager = new THREE.LoadingManager();
manager.onStart = function(url, itemsLoaded, itemsTotal){
  console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' +
itemsTotal + ' files.');
};
manager.onLoad = function(){
  console.log('Loading complete!');
};
manager.onProgress = function(url, itemsLoaded, itemsTotal){
  console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' +
  itemsTotal + ' files.');
};
manager.onError = function(url){
	console.log('There was an error loading ' + url);
};

// load in maya objs
var wipTextObj = new THREE.OBJLoader(manager);
var uwuObj = new THREE.OBJLoader(manager);

wipTextObj.load(
  'model-assets/wip_model.obj',
  function(obj){
    scene.add(obj);
  },
  function(xhr){
    console.log((xhr.loaded/xhr.total * 100) + '% loaded');
  },
  function(error){
    console.log('Error has occured while loading wipTextObj');
  }
);

uwuObj.load(
  'model-assets/uwu.obj',
  function(obj){
    scene.add(obj);
  },
  function(xhr){
    console.log((xhr.loaded/xhr.total * 100) + '% loaded');
  },
  function(error){
    console.log('Error has occured while loading uwuObj');
  }
);

animate();

window.addEventListener("resize", onWindowResize);