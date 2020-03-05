

function add() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, 150, 75);
}

function remove() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(10, 10, 100, 100);
}

function init() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    document.getElementById('myCanvas').appendChild(renderer.domElement)

    var geometry = new THREE.BoxGeometry(1, 1, 1)
    var material = new THREE.MeshBasicMaterial({ color: 0xff0051 })
    var cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    renderer.render(scene, camera)
    camera.position.z = 5

    function animate() {
        requestAnimationFrame(animate)
        cube.rotation.x += 0.04;
        cube.rotation.y += 0.04;
        renderer.render(scene, camera)
    }
    animate()
}