//Based on https://www.youtube.com/watch?v=3CycKKJiwis

var canvas = document.getElementById("canvas");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initialize the GL context
var gl = canvas.getContext('webgl');
if(!gl){
  console.error("Unable to initialize WebGL.");
}

//Time step
var dt = 0.03;
//Time
var time = 0.0;

//************** Shader sources **************

var vertexSource = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

var fragmentSource = `
precision highp float;

uniform float width;
uniform float height;
vec2 resolution = vec2(width, height);

uniform float time;

float random(vec2 par){
   return fract(sin(dot(par.xy,vec2(12.9898,78.233))) * 43758.5453);
}

vec2 random2(vec2 par){
	float rand = random(par);
	return vec2(rand, random(par+rand));
}

void main(){
  // Normalized pixel coordinates (from 0 to 1)
  vec2 uv = gl_FragCoord.xy/resolution.xy;
	
  //The ratio of the width and height of the screen
  float widthHeightRatio = resolution.x/resolution.y;
    
  float t = time * 0.01;
  float dist = 0.0;
  const float layers = 16.0;
  float scale = 32.0;
  float depth;
  float phase;
  float rotationAngle = time * -0.01;
    
  vec2 offset;
  vec2 local_uv;
  vec2 index;
  vec2 pos;
  vec2 seed;
  vec2 centre = vec2(0.5, 0.5);
    
  mat2 rotation = mat2(cos(rotationAngle), -sin(rotationAngle), 
                       sin(rotationAngle),  cos(rotationAngle));
 	
	for(float i = 0.0; i < layers; i++){
    depth = fract(i/layers + t);
        
    //Move centre in a circle depending on the depth of the layer
    centre.x = 0.5 + 0.1 * cos(t) * depth;
    centre.y = 0.5 + 0.1 * sin(t) * depth;
        
    //Get uv from the fragment coordinates, rotation and depth
    uv = centre-gl_FragCoord.xy/resolution.xy;
   	uv.y /= widthHeightRatio;
    uv *= rotation;
   	uv *= mix(scale, 0.0, depth);
        
    //The local cell
    index = floor(uv);
        
    //Local cell seed;
    seed = 20.0 * i + index;
        
    //The local cell coordinates
    local_uv = fract(i + uv) - 0.5;
        
    //Get a random position for the local cell
    pos = 0.8 * (random2(seed) - 0.5);
        
   	//Get a random phase
   	phase = 128.0 * random(seed);
        
   	//Get distance to the generated point, add fading to distant points
   	//Add the distance to the sum
   	dist += pow(abs(1.0-length(local_uv-pos)), 50.0 + 20.0 * sin(phase + 3.0 * time)) * min(1.0, depth*2.0);
 	}
  
	gl_FragColor = vec4(vec3(dist),1.0);
}
`;

//************** Utility functions **************

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
	gl.viewport(0, 0, canvas.width, canvas.height);
  gl.uniform1f(widthHandle, window.innerWidth);
  gl.uniform1f(heightHandle, window.innerHeight);
}

//Compile shader and combine with source
function compileShader(shaderSource, shaderType){
  var shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
  	throw "Shader compile failed with: " + gl.getShaderInfoLog(shader);
  }
  return shader;
}

//From https://codepen.io/jlfwong/pen/GqmroZ
//Utility to complain loudly if we fail to find the attribute/uniform
function getAttribLocation(program, name) {
  var attributeLocation = gl.getAttribLocation(program, name);
  if (attributeLocation === -1) {
  	throw 'Cannot find attribute ' + name + '.';
  }
  return attributeLocation;
}

function getUniformLocation(program, name) {
  var attributeLocation = gl.getUniformLocation(program, name);
  if (attributeLocation === -1) {
  	throw 'Cannot find uniform ' + name + '.';
  }
  return attributeLocation;
}

//************** Create shaders **************

//Create vertex and fragment shaders
var vertexShader = compileShader(vertexSource, gl.VERTEX_SHADER);
var fragmentShader = compileShader(fragmentSource, gl.FRAGMENT_SHADER);

//Create shader programs
var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

gl.useProgram(program);

//Set up rectangle covering entire canvas 
var vertexData = new Float32Array([
  -1.0,  1.0, 	// top left
  -1.0, -1.0, 	// bottom left
   1.0,  1.0, 	// top right
   1.0, -1.0, 	// bottom right
]);

//Create vertex buffer
var vertexDataBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

// Layout of our data in the vertex buffer
var positionHandle = getAttribLocation(program, 'position');

gl.enableVertexAttribArray(positionHandle);
gl.vertexAttribPointer(positionHandle,
  2, 				// position is a vec2 (2 values per component)
  gl.FLOAT, // each component is a float
  false, 		// don't normalize values
  2 * 4, 		// two 4 byte float components per vertex (32 bit float is 4 bytes)
  0 				// how many bytes inside the buffer to start from
  );

//Set uniform handle
var timeHandle = getUniformLocation(program, 'time');
var widthHandle = getUniformLocation(program, 'width');
var heightHandle = getUniformLocation(program, 'height');

gl.uniform1f(widthHandle, window.innerWidth);
gl.uniform1f(heightHandle, window.innerHeight);

function draw(){
  //Update time
  time += dt;

  //Send uniforms to program
  gl.uniform1f(timeHandle, time);
  //Draw a triangle strip connecting vertices 0-4
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  requestAnimationFrame(draw);
}

draw();