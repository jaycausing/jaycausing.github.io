var canvas, scene, camera, renderer;
var wWidth, wHeight;

function init(){
  canvas = document.getElementById( "canvas" );
  wWidth = window.innerWidth; wHeight = window.innerHeight;
  renderer = new THREE.WebGLRenderer({
    canvas: canvas
  });
  renderer.setSize( wWidth, wHeight );
  renderer.setClearColor( 0xffffff, 1.0 );

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 75, wWidth / wHeight, 0.5, 1000 );
  camera.position.set( 0, 0, 5 );
  
  scene.add( camera );
}

function animate(){
  requestAnimationFrame( animate );
  
  boxObj.rotation.x += 0.01;
  boxObj.rotation.y += 0.01;
  
  renderer.render( scene, camera );
}

function onWindowResize(){
    canvas = document.getElementById( "canvas" );
    wWidth = window.innerWidth; wHeight = window.innerHeight;
  
    //set canvas size to match window
    canvas.width = wWidth;
    canvas.height = wHeight;
    
    /*
    Objects stretching on window size change is
    from static FOV camera var
    */
    //TODO: Figure out how to scale FOV on window resize
    renderer.setSize( wWidth, wHeight, true );
    camera.aspect( wWidth / wHeight );
    camera.updateProjectionMatrix();
}