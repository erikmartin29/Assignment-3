/////////////////////////////////////////////////////////////////////////////
//
//  Cube.js
//

function Cube(gl, vertexShader, fragmentShader) {

    vertexShader ||= "Cube-vertex-shader";
    fragmentShader ||= "Cube-fragment-shader";

    let program = initShaders(gl, vertexShader, fragmentShader);

    // Set up our data:
    //   - positions contains our vertex positions
    //   - indices contains how to organize the vertices
    //     into primitives

    let positions = [
        0.0, 0.0, 0.0,  // Vertex 0
        1.0, 0.0, 0.0,  // Vertex 1
        0.0, 1.0, 0.0,  // Vertex 2
        1.0, 1.0, 0.0,  // Vertex 3
        0.0, 0.0, 1.0,  // Vertex 4
        1.0, 0.0, 1.0,  // Vertex 5
        0.0, 1.0, 1.0,  // Vertex 6
        1.0, 1.0, 1.0   // Vertex 7
    ];

    let indices = [
        
        0,1,3, //FRONT
        0,3,2,

        1,5,7, //RIGHT
        1,7,3,

        5,4,6, //BACK
        5,6,7,

        4,0,2, //LEFT
        4,2,6,

        4,5,1, //BOTTOM
        4,1,0,

        2,3,7, //TOP
        2,7,6
    ];

    // Initialize all of our WebGL "plumbing" variables

    let aPosition = new Attribute(gl, program, positions,
	    "aPosition", 3, gl.FLOAT);

    indices = new Indices(gl, indices);

    let MV = new Uniform(gl, program, "MV");
    let P  = new Uniform(gl, program, "P");

    this.render = () => {
        gl.useProgram(program);

        aPosition.enable();
        indices.enable();

        MV.update(this.MV);
        P.update(this.P);

        gl.drawElements(gl.TRIANGLES, indices.count, indices.type, 0);

        indices.disable();
        aPosition.disable();
    
    };
};
