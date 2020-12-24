import React, {useEffect, useMemo, useRef} from 'react';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {
  Geometry,
  Vector3,
  Face3,
  MeshPhongMaterial,
  Mesh,
  DirectionalLight,
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
} from 'three';
import './styles.sass';

function TriangulationBox(props: TBoxGeometry) {
  const canvasBox = useRef<HTMLCanvasElement>(null);
  const {vertices, triangles} = props;

  const geometry = useMemo(() => new Geometry(), []);
  geometry.vertices = [];
  geometry.faces = [];
  vertices.forEach((item: number[]) => {
    geometry.vertices.push(new Vector3(...item));
  });
  triangles.forEach((item: number[]) => {
    geometry.faces.push(new Face3(item[0], item[1], item[2]));
    geometry.faces.push(new Face3(item[3], item[4], item[5]));
  });
  geometry.verticesNeedUpdate = true;
  geometry.elementsNeedUpdate = true;
  geometry.computeFaceNormals();

  useEffect(() => {
    if (canvasBox.current !== null) {
      const material = new MeshPhongMaterial({color: 0x00ff00});
      const box = new Mesh(geometry, material);

      const light = new DirectionalLight(0xffffff, 1);
      light.position.set(-1, -1, 20);

      const scene = new Scene();
      scene.add(box);
      scene.add(light);

      const camera = new PerspectiveCamera(60, 1, 0.1, 1000);
      camera.position.z = 420;

      const control = new OrbitControls(camera, canvasBox.current);

      const animate = () => {
        box.rotation.x += 0.01;
        box.rotation.y += 0.01;
        renderer.render(scene, camera);
      };

      const renderer = new WebGLRenderer({alpha: true, canvas: canvasBox.current, antialias: true});
      renderer.setSize(canvasBox.current.clientWidth, canvasBox.current.clientHeight);
      renderer.setAnimationLoop(animate);

      return () => {
        control.dispose();
        renderer.dispose();
        geometry.dispose();
      }
    }
    return () => {
      geometry.dispose();
    }
  }, [geometry]);

  return (
    <canvas className="triangulation-box" ref={canvasBox}>
    </canvas>
  );
}

export default TriangulationBox;
