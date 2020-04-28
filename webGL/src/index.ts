import { Shader } from "./shader";
import { PointArray } from "./pointArray";
import { LineArray } from "./lineArray";
import { Camera } from "./camera";
import * as glm from "gl-matrix";

export let gl: WebGL2RenderingContext | null;
let glCanvas: HTMLElement | null;

const vertexSource: string = `#version 300 es
    layout(location = 0) in vec3 position;

    uniform mat4 model;
    uniform mat4 view;
    uniform mat4 proj;

    uniform vec4 color;
    out vec4 vert_color;

    void main() {
      gl_Position = proj * view * model * vec4(position, 1.0);
      gl_PointSize = 20.0;
      vert_color = color;
    }`;

const fragmentSource: string = `#version 300 es
    #ifdef GL_ES
        precision highp float;
    #endif

    in vec4 vert_color;
    out vec4 color;

    void main() {
            color = vert_color;
    }`;

const vertexSource1: string = `#version 300 es
    layout(location = 0) in vec3 position;
    layout(location = 1) in vec4 color;

    uniform mat4 model;
    uniform mat4 view;
    uniform mat4 proj;

    out vec4 vert_color;

    void main() {
      gl_Position = proj * view * model * vec4(position, 1.0);
      vert_color = color;
    }`;

let vertices: Float32Array;
let indices: Int32Array;

let shader: Shader;
let shader1: Shader;
let array1: PointArray | null = null;
let array2: LineArray | null = null;
let camera: Camera;

let translate: glm.vec3;

let width: number;
let height: number;

let lastX: number = 0;
let lastY: number = 0;

let currentX: number = 0;
let currentY: number = 0;

let wheelOffset: number = 0;

let firstMove: boolean = true;
let isDown: boolean = false;

function glCanvasOnMouseMove(e: MouseEvent): void {
  var rect = glCanvas.getBoundingClientRect();
  currentX = e.clientX - rect.left;
  currentY = e.clientY - rect.top;

  if (firstMove) {
    lastX = currentX;
    lastY = currentY;
    firstMove = false;
  }
}

function glCanvasOnMouseDown(e: MouseEvent) {
  if (e.button == 0) isDown = true;
}

function glCanvasOnMouseUp(e: MouseEvent) {
  isDown = false;
}

function glCanvasOnWheel(e: WheelEvent): void {
  wheelOffset = e.deltaY;
}

module.exports = {
  startup: function (): void {
    glCanvas = document.getElementById("canvas");

    glCanvas.addEventListener("mousemove", glCanvasOnMouseMove);
    glCanvas.addEventListener("wheel", glCanvasOnWheel);
    // glCanvas.addEventListener("mousedown", glCanvasOnMouseDown);
    //glCanvas.addEventListener("mouseup", glCanvasOnMouseUp);
    //glCanvas.addEventListener("click", glCanvasOnMouseUp);

    gl = (glCanvas as HTMLCanvasElement).getContext("webgl2");

    width = (glCanvas as HTMLCanvasElement).width;
    height = (glCanvas as HTMLCanvasElement).height;
    gl.viewport(0, 0, width, height);

    shader = new Shader(vertexSource, fragmentSource);
    shader1 = new Shader(vertexSource1, fragmentSource);

    camera = new Camera();
    translate = glm.vec3.create();
    translate[0] = 0.0;
    translate[1] = 0.0;
    translate[2] = 0.0;

    console.log("startup");
  },

  draw: function (): void {
    if (gl !== null) {
      gl.clearColor(1.0, 0.7, 0.4, 1.0);
      gl.enable(gl.DEPTH_TEST);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      let model: glm.mat4 = glm.mat4.create();
      model = glm.mat4.identity(model);
      glm.mat4.translate(model, model, translate);

      camera.ProcessMouseMovement(currentX - lastX, currentY - lastY);

      lastX = currentX;
      lastY = currentY;

      camera.ProcessMouseWheel(wheelOffset);
      wheelOffset = 0;

      let view: glm.mat4 = camera.GetLookAt();

      let proj: glm.mat4 = glm.mat4.create();
      proj = glm.mat4.identity(proj);
      glm.mat4.perspective(proj, glm.glMatrix.toRadian(45.0), width / height, 0.1, 100);

      if (array1 !== null) {
        shader.use();
        shader.setMat4("model", model as Float32Array);
        shader.setMat4("view", view as Float32Array);
        shader.setMat4("proj", proj as Float32Array);
        shader.setVec4("color", array1.color);
        array1.use();
        gl.drawArrays(array1.drawMode, 0, array1.size);
      }

      if (array2 !== null) {
        shader1.use();
        shader1.setMat4("model", model as Float32Array);
        shader1.setMat4("view", view as Float32Array);
        shader1.setMat4("proj", proj as Float32Array);
        array2.use();
        gl.drawElements(array2.drawMode, array2.size, gl.UNSIGNED_INT, 0);
      }

      window.requestAnimationFrame(module.exports.draw);
    }
  },

  drawPoints: function (raw_points: Float32Array, color: Float32Array, pointSize: number): void {
    array1 = new PointArray(new Float32Array(raw_points), null, new Float32Array(color), gl.POINTS, 10.0);
  },

  drawLines: function (raw_points: Float32Array, raw_indices: Int32Array) {
    array2 = new LineArray(new Float32Array(raw_points), new Int32Array(raw_indices));
  },
};
