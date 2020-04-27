import { gl } from "./index";

export class VertexArray {
  readonly VAO: WebGLVertexArrayObject | null = null;
  readonly VBO: WebGLBuffer | null = null;
  readonly EBO: WebGLBuffer | null = null;

  readonly color: Float32Array;
  readonly drawMode: number;
  readonly pointSize: number;

  readonly isIndexed: boolean = true;

  readonly size: number = 0;

  constructor(vertices: Float32Array, indices: Int32Array, color: Float32Array, drawMode: number, pointSize: number) {
    this.VAO = gl.createVertexArray();
    gl.bindVertexArray(this.VAO);

    this.isIndexed = false;
    this.size = vertices.length / 3;

    this.VBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    this.color = color;
    this.drawMode = drawMode;
    this.pointSize = pointSize;

    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

    console.log("size: ", this.size);

    gl.bindVertexArray(null);
  }

  use() {
    gl.bindVertexArray(this.VAO);
  }
}
