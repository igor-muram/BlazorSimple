"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Shader = /** @class */ (function () {
    function Shader(vertexSource, fragmentSource) {
        this.program = exports.gl.createProgram();
        var vertexShader = this.compileShader(vertexSource, exports.gl.VERTEX_SHADER);
        exports.gl.attachShader(this.program, vertexShader);
        exports.gl.deleteShader(vertexShader);
        var fragmentShader = this.compileShader(fragmentSource, exports.gl.FRAGMENT_SHADER);
        exports.gl.attachShader(this.program, fragmentShader);
        exports.gl.deleteShader(fragmentShader);
        exports.gl.linkProgram(this.program);
        if (!exports.gl.getProgramParameter(this.program, exports.gl.LINK_STATUS)) {
            console.log("Error linking shader program:");
            console.log(exports.gl.getProgramInfoLog(this.program));
        }
    }
    Shader.prototype.compileShader = function (source, type) {
        var shader = exports.gl.createShader(type);
        exports.gl.shaderSource(shader, source);
        exports.gl.compileShader(shader);
        if (!exports.gl.getShaderParameter(shader, exports.gl.COMPILE_STATUS)) {
            console.log("Error compiling " + (type === exports.gl.VERTEX_SHADER ? "vertex" : "fragment") + " shader:");
            console.log(exports.gl.getShaderInfoLog(shader));
        }
        return shader;
    };
    Shader.prototype.use = function () {
        exports.gl.useProgram(this.program);
    };
    return Shader;
}());
exports.Shader = Shader;
//# sourceMappingURL=shader.js.map