varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec2 vUv;

uniform float time;
uniform float viscosity;
uniform vec3 mousePosition;
uniform float mouseInfluence;

vec3 deform(vec3 pos) {
  float wave1 = sin(pos.x * 2.0 + time * 1.5) * 0.1;
  float wave2 = cos(pos.y * 3.0 + time * 2.0) * 0.08;
  float wave3 = sin(pos.z * 4.0 + time * 1.2) * 0.06;
  
  float mouseDistance = distance(pos, mousePosition);
  float mouseEffect = exp(-mouseDistance * 2.0) * mouseInfluence;
  
  vec3 deformed = pos;
  deformed += normal * (wave1 + wave2 + wave3) * viscosity;
  deformed += normalize(mousePosition - pos) * mouseEffect * 0.3;
  
  return deformed;
}

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  
  vec3 deformedPosition = deform(position);
  
  vec4 mvPosition = modelViewMatrix * vec4(deformedPosition, 1.0);
  vViewPosition = -mvPosition.xyz;
  vPosition = deformedPosition;
  
  gl_Position = projectionMatrix * mvPosition;
}