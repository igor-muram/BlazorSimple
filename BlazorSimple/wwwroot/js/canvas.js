let gl = null;
let glCanvas = null;

// Aspect ratio and coordinate system
// details

const vertexS = `
    attribute vec2 aVertexPosition;

    uniform vec2 uScalingFactor;
    uniform vec2 uRotationVector;

    void main() {
        vec2 rotatedPosition = vec2(
        aVertexPosition.x * uRotationVector.y +
              aVertexPosition.y * uRotationVector.x,
        aVertexPosition.y * uRotationVector.y -
              aVertexPosition.x * uRotationVector.x
      );

      gl_Position = vec4(rotatedPosition * uScalingFactor, 0.0, 1.0);
    }`;

const fragmentS = `
    #ifdef GL_ES
        precision highp float;
    #endif
    uniform vec4 uGlobalColor;
    void main() {
            gl_FragColor = uGlobalColor;
    }`;

let aspectRatio;
let currentRotation = [0, 1];
let currentScale = [1.0, 1.0];

let vertexArray;
let vertexBuffer;
let vertexNumComponents;
let vertexCount;

let uScalingFactor;
let uGlobalColor;
let uRotationVector;
let aVertexPosition;

let previousTime = 0.0;
let degreesPerSecond = 90.0;

function startup() {
    glCanvas = document.getElementById("canvas");
    gl = glCanvas.getContext("webgl");

    gl.viewport(0, 0, glCanvas.width, glCanvas.height);

    shaderProgram = buildShaderProgram();

    aspectRatio = glCanvas.width / glCanvas.height;
    currentRotation = [0, 1];
    currentScale = [1.0, aspectRatio];

    vertexArray = new Float32Array([-0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5]);

    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexArray, gl.STATIC_DRAW);

    vertexNumComponents = 2;
    vertexCount = vertexArray.length / vertexNumComponents;
}

function buildShaderProgram() {
    let program = gl.createProgram();

    let Vshader = compileShader(gl.VERTEX_SHADER, vertexS);
    gl.attachShader(program, Vshader);

    let Fshader = compileShader(gl.FRAGMENT_SHADER, fragmentS);
    gl.attachShader(program, Fshader);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log("Error linking shader program:");
        console.log(gl.getProgramInfoLog(program));
    }

    return program;
}

function compileShader(type, code) {
    let shader = gl.createShader(type);

    gl.shaderSource(shader, code);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log(`Error compiling ${type === gl.VERTEX_SHADER ? "vertex" : "fragment"} shader:`);
        console.log(gl.getShaderInfoLog(shader));
    }
    return shader;
}

function animateScene(angle) {
    gl.clearColor(1.0, 0.9, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    let radians = angle / 200.0;
    currentRotation[0] = Math.sin(radians);
    currentRotation[1] = Math.cos(radians);

    gl.useProgram(shaderProgram);
    uScalingFactor = gl.getUniformLocation(shaderProgram, "uScalingFactor");
    uGlobalColor = gl.getUniformLocation(shaderProgram, "uGlobalColor");
    uRotationVector = gl.getUniformLocation(shaderProgram, "uRotationVector");

    gl.uniform2fv(uScalingFactor, currentScale);
    gl.uniform2fv(uRotationVector, currentRotation);
    gl.uniform4fv(uGlobalColor, [0., 0.0, 0.0, 1.0]);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    aVertexPosition = gl.getAttribLocation(shaderProgram, "aVertexPosition");

    gl.enableVertexAttribArray(aVertexPosition);
    gl.vertexAttribPointer(aVertexPosition, vertexNumComponents, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.LINE_LOOP, 0, vertexCount);
}
