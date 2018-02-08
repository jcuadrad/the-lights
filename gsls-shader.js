/* global AFRAME, THREE */

AFRAME.registerShader('test', {
  schema: {
    color: {type: 'color', is: 'uniform'},
    timeMsec: {type: 'time', is: 'uniform'}
  },
  
  shader: `
varying vec2 vUv;
uniform vec3 color;
uniform float timeMsec; // A-Frame time in milliseconds.

void main( void ) {

	float ratio = resolution.x/resolution.y;
	vec2 uv = vec2( gl_FragCoord.x*2. / resolution.x - 1., gl_FragCoord.y*2. / resolution.x -1./ratio);

	// Ray Origin
	vec3 ro = vec3(0.0, 0.0,-2.0);
	// Ray Distance
	float t = time/2.;
	
	vec3 rd = normalize(vec3(uv.x, uv.y, 1.));
	
	float dist;
	
	dist = Trace(ro, rd);
	vec3 normal = EstimateNormal(ro + rd * dist);
	vec3 c;
	if(dist < MAXDIST)
		c = vec3(normal.x, normal.y, normal.z)/dist*20.;
	else
		c = vec3(0.0);
		
	gl_FragColor = vec4( c, 1.0 );

}
`,   
});