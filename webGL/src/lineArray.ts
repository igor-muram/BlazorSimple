import { gl } from "./index";

export class LineArray {
  readonly VAO: WebGLVertexArrayObject | null = null;
  readonly VBO: WebGLBuffer | null = null;
  readonly EBO: WebGLBuffer | null = null;

  readonly drawMode: number;
  readonly pointSize: number;

  readonly size: number;

  constructor(vertices: Float32Array, indices: Int32Array) {
    this.VAO = gl.createVertexArray();
    gl.bindVertexArray(this.VAO);

    this.size = indices.length;
    this.VBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    this.EBO = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.EBO);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    this.drawMode = gl.LINES;

    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 7 * 4, 0);

    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 7 * 4, 3 * 4);

    gl.bindVertexArray(null);
  }

  use() {
    gl.bindVertexArray(this.VAO);
  }
}
