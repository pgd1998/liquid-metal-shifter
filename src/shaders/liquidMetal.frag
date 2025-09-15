varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec2 vUv;

uniform float time;
uniform float metallic;
uniform float roughness;
uniform vec3 baseColor;
uniform vec3 emissiveColor;
uniform float emissiveIntensity;
uniform vec3 lightPosition;

// PBR helper functions
vec3 fresnel(vec3 f0, float cosTheta) {
  return f0 + (1.0 - f0) * pow(1.0 - cosTheta, 5.0);
}

float distributionGGX(vec3 N, vec3 H, float roughness) {
  float a = roughness * roughness;
  float a2 = a * a;
  float NdotH = max(dot(N, H), 0.0);
  float NdotH2 = NdotH * NdotH;
  
  float num = a2;
  float denom = (NdotH2 * (a2 - 1.0) + 1.0);
  denom = 3.14159265 * denom * denom;
  
  return num / denom;
}

float geometrySchlickGGX(float NdotV, float roughness) {
  float r = (roughness + 1.0);
  float k = (r * r) / 8.0;
  
  float num = NdotV;
  float denom = NdotV * (1.0 - k) + k;
  
  return num / denom;
}

float geometrySmith(vec3 N, vec3 V, vec3 L, float roughness) {
  float NdotV = max(dot(N, V), 0.0);
  float NdotL = max(dot(N, L), 0.0);
  float ggx2 = geometrySchlickGGX(NdotV, roughness);
  float ggx1 = geometrySchlickGGX(NdotL, roughness);
  
  return ggx1 * ggx2;
}

vec3 liquidEffect(vec3 pos, float time) {
  vec3 effect = vec3(0.0);
  
  // Ripple effects
  float ripple1 = sin(length(pos.xz) * 8.0 - time * 3.0) * 0.1;
  float ripple2 = cos(length(pos.xy) * 6.0 + time * 2.5) * 0.08;
  
  // Flowing patterns
  float flow = sin(pos.x * 4.0 + time * 1.5) * cos(pos.z * 3.0 + time * 2.0);
  
  effect.x = ripple1 * 0.3;
  effect.y = ripple2 * 0.4;
  effect.z = flow * 0.2;
  
  return effect;
}

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(-vViewPosition);
  vec3 L = normalize(lightPosition - vPosition);
  vec3 H = normalize(V + L);
  
  // Apply liquid effects to normals
  vec3 liquidOffset = liquidEffect(vPosition, time);
  N = normalize(N + liquidOffset * 0.3);
  
  // Base color with flowing patterns
  vec3 flowPattern = vec3(
    sin(vPosition.x * 2.0 + time) * 0.1 + 0.9,
    cos(vPosition.y * 3.0 + time * 1.5) * 0.1 + 0.9,
    sin(vPosition.z * 4.0 + time * 2.0) * 0.1 + 0.9
  );
  
  vec3 albedo = baseColor * flowPattern;
  vec3 f0 = mix(vec3(0.04), albedo, metallic);
  
  // Calculate lighting
  vec3 radiance = vec3(2.0); // Light color/intensity
  
  float NDF = distributionGGX(N, H, roughness);
  float G = geometrySmith(N, V, L, roughness);
  vec3 F = fresnel(f0, max(dot(H, V), 0.0));
  
  vec3 kS = F;
  vec3 kD = vec3(1.0) - kS;
  kD *= 1.0 - metallic;
  
  vec3 numerator = NDF * G * F;
  float denominator = 4.0 * max(dot(N, V), 0.0) * max(dot(N, L), 0.0) + 0.0001;
  vec3 specular = numerator / denominator;
  
  float NdotL = max(dot(N, L), 0.0);
  vec3 Lo = (kD * albedo / 3.14159265 + specular) * radiance * NdotL;
  
  // Ambient
  vec3 ambient = vec3(0.03) * albedo;
  
  // Emissive with pulsing effect
  float pulse = sin(time * 2.0) * 0.5 + 0.5;
  vec3 emissive = emissiveColor * emissiveIntensity * (0.8 + pulse * 0.4);
  
  // Final color
  vec3 color = ambient + Lo + emissive;
  
  // Tone mapping and gamma correction
  color = color / (color + vec3(1.0));
  color = pow(color, vec3(1.0/2.2));
  
  gl_FragColor = vec4(color, 0.9);
}