'use client';

import { useEffect, useRef, useState } from 'react';

const vertexShaderSource = `
  attribute vec4 a_position;
  void main() {
    gl_Position = a_position;
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec3 u_colorBg;
  uniform vec3 u_colorFold;
  
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    
    float diagonal = (st.x + st.y) * 0.5;
    float fold = smoothstep(0.3, 0.7, diagonal);
    
    vec3 color = mix(u_colorBg, u_colorFold, fold * 0.15);
    
    float grain = random(st * u_time) * 0.03;
    color += grain;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.setAttribute('data-theme', savedTheme);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [-1, -1, 1, -1, -1, 1, 1, 1];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const colorBgLocation = gl.getUniformLocation(program, 'u_colorBg');
    const colorFoldLocation = gl.getUniformLocation(program, 'u_colorFold');

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl?.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    window.addEventListener('resize', resize);

    let animationId: number;
    function render(time: number) {
      if (!gl || !canvas) return;

      const nightBg = [6 / 255, 16 / 255, 58 / 255];
      const nightFold = [149 / 255, 219 / 255, 190 / 255];
      const lightBg = [240 / 255, 237 / 255, 230 / 255];
      const lightFold = [26 / 255, 99 / 255, 230 / 255];

      const t = theme === 'light' ? 1 : 0;
      const colorBg = nightBg.map((n, i) => n + (lightBg[i] - n) * t);
      const colorFold = nightFold.map((n, i) => n + (lightFold[i] - n) * t);

      gl.clearColor(colorBg[0], colorBg[1], colorBg[2], 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.enableVertexAttribArray(positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, time * 0.001);
      gl.uniform3f(colorBgLocation, colorBg[0], colorBg[1], colorBg[2]);
      gl.uniform3f(colorFoldLocation, colorFold[0], colorFold[1], colorFold[2]);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationId = requestAnimationFrame(render);
    }

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        id="glcanvas"
        className="fixed inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />
      <button
        onClick={toggleTheme}
        className="theme-toggle"
        aria-label="Toggle theme"
      >
        <span className="theme-toggle-track">
          <span className="theme-toggle-thumb" data-theme={theme}>
            {theme === 'dark' ? 'NIGHT' : 'DAY'}
          </span>
        </span>
      </button>
    </>
  );
}
