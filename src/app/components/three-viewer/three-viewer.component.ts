import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-three-viewer',
  templateUrl: './three-viewer.component.html',
  styleUrls: ['./three-viewer.component.scss'],
})
export class ThreeViewerComponent implements AfterViewInit {
  @ViewChild('canvasContainer', { static: false }) canvasContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private model!: THREE.Group;
  private loader = new GLTFLoader();

  private controls: any; // Typowanie 'any' dla OrbitControls

  ngAfterViewInit(): void {
    this.initScene();
    this.loadModel();
    this.animate();
  }

  private initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf0f0f0);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 2, 5);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    this.scene.add(light);

    // Inicjalizujemy OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; // Smooth movement
    this.controls.dampingFactor = 0.25; // Adjust damping speed
    this.controls.screenSpacePanning = true; // Przesuwanie zależne od kamery

    // Zmieniamy przycisk myszy do panningu
    this.controls.mouseButtons.RIGHT = THREE.MOUSE.PAN; // Ustawienie prawego przycisku na panning
  }

  private loadModel() {
    // Zastąp 'url_do_pliku_s3' odpowiednim URL pliku w S3
    const s3Url =
      'https://policrafts.s3.eu-central-1.amazonaws.com/dom.glb?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDGV1LWNlbnRyYWwtMSJIMEYCIQCSfRAFbct%2F%2BjwEexWCAMRa3hYItz%2F3msEWvM8jm8UV5QIhAOa8LsOnqNzlPVHsbE73dXEB9Xz3hZ%2BqO9s3nguO5c5vKssDCEwQABoMNDEyMzgxNzYxNTg2IgzLpN%2FgDf6JU10I04oqqAMP9HwnsghEuXmPiJ%2B2iZWvW0%2BQDbhk43nxo%2F6Hv8OGl0%2Bd5qs3Xh5qgiRGEOJhxrYp8KqNcNxvpIIk0yiDsgnMyte20FbZ8Vsrdsoa9jAxzQh8Pi%2BgO5xvA8roOszADYSoI4KG2zgLlQvERxsrZeGGRuEVbpIR76%2BwXB2Gc6pPbHVabdsPS8FFA%2Fon%2BG2HWpvOUIVFZe6zJX%2FRswYwLfRjiQqkDdxWnCOlV5sgmlja1h%2FoqvgMsb%2FmWYa1buyCjfmuHdcLnZ37XQhv2rpqh%2BroOKUh2Q7t8ytCPUC%2BK%2Fp7PDOVJUzG%2B6kpJWmgEBXOoMXLQgj3SxjOZ3igs%2BQH%2B9HNqb%2BfcfNBepCS0hEGxeRT7qTe5JzspDqvs2jyYBROUbsJKud0w6zpb1dtYqnCZ%2FLLw5W5KOYvDxSemTDn5oHwLBgo6ixHKtwD5M6FWyffn4Tti8DreL%2FEwtzyREhdZZ9n4sbh0MXUrPtlfofaMctqwGMc1sHEgfuZNHpD%2F%2FV65M96OJHYkqxU%2Bn5opE6q5oa0Qqk5L99x4W978DbMYHbZv%2Fl68lisA%2FVhMOKa4b4GOuMC5RTsXoX717e4ipFsHiiBH3yOnQP8BVk4gXh8Yu5R3tXsJ%2FTJIfPrzESyNcdlITDPzBjpc9WaMxnSetqldDF9bVIE2a2JpPxQLCSKAeraLlcR%2FYBsYL1fjcQT2lXD1dn6nIYtUgM%2Bzt9Nlah3RQYSwA6EHRATihAPDMBj0%2F18rKQKFpRwIiAKY%2Bghfl26Pz21wC1mWzv8gwxjgRqH35NtE5O2c3RWv9C0OX6xpJ%2BiYeSZj%2BPAxPqxB8lieg3gvKtcYnRTNiVDJ4mwMaqlOEox9JCQiz337%2FpHyKHaq4VdR7%2FlqDwqMZwbnlFa2oM4XO7pH8Q%2B4I73Pu6Y1Mo0dMMPvNcV1pagLCjhfW8slNatET9nCpWo25AJQtUlzy4s3GeGutveH6WpsIZSTYvyjqh%2BtAFBfXfglbrGM0POPkG5XMNP8hO9LoN2qUh7spgJ4BX1emlgiHuVrPwIX5IeFVXQ%2BY%2BhMA%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAWAA66KAZDVJFHEQB%2F20250317%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20250317T182507Z&X-Amz-Expires=43200&X-Amz-SignedHeaders=host&X-Amz-Signature=b1b989709c526fcd3b69e43ca925ff3e833a0bac0dca04595d0e3b549f3ab149';

    this.loader.load(
      s3Url,
      (gltf: { scene: THREE.Group }) => {
        this.model = gltf.scene;
        this.scene.add(this.model);
      },
      undefined,
      (error) => {
        console.error('Error loading the model:', error);
      }
    );
  }

  private animate = () => {
    requestAnimationFrame(this.animate);

    // Aktualizujemy kontrolki w każdej klatce
    this.controls.update();

    this.renderer.render(this.scene, this.camera);
  };

  toggleMeshVisibility(meshName: string, isVisible: boolean) {
    if (this.model) {
      const mesh = this.model.getObjectByName(meshName);
      if (mesh) mesh.visible = isVisible;
    }
  }
}
