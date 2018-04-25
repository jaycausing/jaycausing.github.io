var canvas, scene, camera, renderer;
var wWidth, wHeight;

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

function animate() {
  requestAnimationFrame(animate);

  boxObj.rotation.x += 0.01;
  boxObj.rotation.y += 0.01;

  renderer.render(scene, camera);
}

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

/*** DOCUMENT SCRIPT BEGIN ***/

init();

//ensures object faces not hit by dLight still visible
var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

var dLight = new THREE.DirectionalLight();
scene.add(dLight);

var boxGeo = new THREE.BoxGeometry(3, 3, 3);
var mat = new THREE.MeshNormalMaterial();
var boxObj = new THREE.Mesh(boxGeo, mat);
scene.add(boxObj);

//background circles
var cMesh = new THREE.CircleGeometry(10, 30);

var mat = new THREE.MeshBasicMaterial({
  color: 0xc0c0c0
});

var cObj1 = new THREE.Mesh(cMesh, mat);
cObj1.position.set(-20, 0, -10);
var cObj2 = new THREE.Mesh(cMesh, mat);
cObj2.position.set(0, 0, -10);
var cObj3 = new THREE.Mesh(cMesh, mat);
cObj3.position.set(20, 0, -10);

var cGroup = new THREE.Group();
cGroup.add(cObj1);
cGroup.add(cObj2);
cGroup.add(cObj3);
scene.add(cGroup);

animate();

window.addEventListener("resize", onWindowResize);