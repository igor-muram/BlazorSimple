var scene, camera, renderer;
var isCubeActive = false;
var cube;

function init() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.z = 5;


    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(1000, 1000);
    document.getElementById('myCanvas').appendChild(renderer.domElement)

    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
    cameraControls.target.set(0, 0, 0);
    cameraControls.update();
}

function addCube() {

    if (cube === undefined) {
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: 0xff0051, side: THREE.DoubleSide, wireframe: true});
        cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
    }
    else {
        scene.add(cube);
    }
}

function gameloop() {
    requestAnimationFrame(gameloop)

    if (isCubeActive) {
        cube.rotation.x += 0.04;
        cube.rotation.y += 0.04;
    }

    renderer.render(scene, camera)
}

function start() {
    isCubeActive = true;
}

function stop() {
    isCubeActive = false;
}

function removeCube() {
    scene.remove(cube);
    isCubeActive = false;
}