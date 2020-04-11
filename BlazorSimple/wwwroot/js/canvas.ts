let gl: WebGL2RenderingContext = null;
let glCanvas = null;

class Shader {

    private program: WebGLProgram;

    constructor(vertexSource: string, fragmentSource: string) {
        this.program = gl.createProgram();

        let vertexShader: WebGLShader = this.compileShader(vertexSource, gl.VERTEX_SHADER);
        gl.attachShader(this.program, vertexShader);
        gl.deleteShader(vertexShader);

        let fragmentShader: WebGLShader = this.compileShader(fragmentSource, gl.FRAGMENT_SHADER);
        gl.attachShader(this.program, fragmentShader);
        gl.deleteShader(fragmentShader);

        gl.linkProgram(this.program);

        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            console.log("Error linking shader program:");
            console.log(gl.getProgramInfoLog(this.program));
        }
    }

    private compileShader(source: string, type: number): WebGLShader {
        let shader: WebGLShader = gl.createShader(type);

        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.log(`Error compiling ${type === gl.VERTEX_SHADER ? "vertex" : "fragment"} shader:`);
            console.log(gl.getShaderInfoLog(shader));
        }

        return shader;
    }

    use() {
        gl.useProgram(this.program);
    }
}

const vertexSource: string = `#version 300 es
    layout(location = 0) in vec3 position;

    out vec3 pos;
    void main() {
      pos = position;
      gl_Position = vec4(position, 1.0);
    }`;

const fragmentSource: string = `#version 300 es
    #ifdef GL_ES
        precision highp float;
    #endif

    in vec3 pos;
    out vec4 color;

    void main() {
            color = vec4(pos.x + 0.5, pos.y + 0.5, pos.z + 0.5, 1.0);
    }`;

class VertexArray {
    private VAO: WebGLVertexArrayObject;
    private VBO: WebGLBuffer;
    private EBO: WebGLBuffer;

    constructor(vertices: Float32Array, indices: Int32Array) {

        this.VAO = gl.createVertexArray();
        gl.bindVertexArray(this.VAO);

        this.VBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        this.EBO = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.EBO);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

        gl.bindVertexArray(null);
    }

    use() {
        gl.bindVertexArray(this.VAO);
    }
}

var vertices: Float32Array;
var indices: Int32Array;
let vertexCount: number;

var shader: Shader
var array: VertexArray

function startup() {
    glCanvas = document.getElementById("canvas");
    gl = glCanvas.getContext("webgl2");

    gl.viewport(0, 0, glCanvas.width, glCanvas.height);

    shader = new Shader(vertexSource, fragmentSource);

    vertices = new Float32Array([
        0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0,
        -0.5, 0.5, 0.0]);

    indices = new Int32Array([
        0, 1, 3,
        1, 2, 3 
    ]); 

    array = new VertexArray(vertices, indices);
}

function animateScene() {
    gl.clearColor(1.0, 0.9, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    shader.use();
    array.use();

    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_INT, 0);
}
