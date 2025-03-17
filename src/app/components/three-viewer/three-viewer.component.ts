import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Import OrbitControls jako obiekt z zewnętrznej biblioteki
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

  // Zmieniamy typ controls na any
  private controls: any; // Można zmienić na 'any' lub 'OrbitControls' (patrz opis poniżej)

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
    this.controls.screenSpacePanning = false; // Prevent panning out of the scene
  }

  private loadModel() {
    this.loader.load('assets/dom.glb', (gltf: { scene: THREE.Group }) => {
      this.model = gltf.scene;
      this.scene.add(this.model);
    });
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
