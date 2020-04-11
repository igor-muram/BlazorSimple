var gl = null;
var glCanvas = null;
var Shader = /** @class */ (function () {
    function Shader(vertexSource, fragmentSource) {
        this.program = gl.createProgram();
        var vertexShader = this.compileShader(vertexSource, gl.VERTEX_SHADER);
        gl.attachShader(this.program, vertexShader);
        gl.deleteShader(vertexShader);
        var fragmentShader = this.compileShader(fragmentSource, gl.FRAGMENT_SHADER);
        gl.attachShader(this.program, fragmentShader);
        gl.deleteShader(fragmentShader);
        gl.linkProgram(this.program);
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            console.log("Error linking shader program:");
            console.log(gl.getProgramInfoLog(this.program));
        }
    }
    Shader.prototype.compileShader = function (source, type) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.log("Error compiling " + (type === gl.VERTEX_SHADER ? "vertex" : "fragment") + " shader:");
            console.log(gl.getShaderInfoLog(shader));
        }
        return shader;
    };
    Shader.prototype.use = function () {
        gl.useProgram(this.program);
    };
    return Shader;
}());
var vertexSource = "#version 300 es\n    layout(location = 0) in vec3 position;\n\n    out vec3 pos;\n    void main() {\n      pos = position;\n      gl_Position = vec4(position, 1.0);\n    }";
var fragmentSource = "#version 300 es\n    #ifdef GL_ES\n        precision highp float;\n    #endif\n\n    in vec3 pos;\n    out vec4 color;\n\n    void main() {\n            color = vec4(pos.x + 0.5, pos.y + 0.5, pos.z + 0.5, 1.0);\n    }";
var VertexArray = /** @class */ (function () {
    function VertexArray(vertices, indices) {
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
    VertexArray.prototype.use = function () {
        gl.bindVertexArray(this.VAO);
    };
    return VertexArray;
}());
var vertices;
var indices;
var vertexCount;
var shader;
var array;
function startup() {
    glCanvas = document.getElementById("canvas");
    gl = glCanvas.getContext("webgl2");
    gl.viewport(0, 0, glCanvas.width, glCanvas.height);
    shader = new Shader(vertexSource, fragmentSource);
    vertices = new Float32Array([
        0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0,
        -0.5, 0.5, 0.0
    ]);
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
//# sourceMappingURL=canvas.js.map