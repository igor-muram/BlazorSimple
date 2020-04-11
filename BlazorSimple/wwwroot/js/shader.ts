export var gl: WebGL2RenderingContext

export class Shader {

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