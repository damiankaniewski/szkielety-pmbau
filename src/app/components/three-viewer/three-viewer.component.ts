import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-three-viewer',
  templateUrl: './three-viewer.component.html',
  styleUrls: ['./three-viewer.component.scss'],
  imports: [CommonModule],
})
export class ThreeViewerComponent implements AfterViewInit {
  @ViewChild('canvasContainer', { static: false }) canvasContainer!: ElementRef;

  isLoading = true;
  loadingMessage = 'Ładowanie...';

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private model!: THREE.Group;
  private loader = new GLTFLoader();
  private rgbeLoader = new RGBELoader();

  private controls: any;

  ngAfterViewInit(): void {
    this.initScene();
    this.loadEnvironmentMap();
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
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);

    // Ambient Light (bez cieni)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    // Directional Light (rzuca cienie)
    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(5, 10, 5);
    sunLight.castShadow = true;
    this.scene.add(sunLight);

    // Konfiguracja cieni
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 50;
    sunLight.shadow.camera.left = -10;
    sunLight.shadow.camera.right = 10;
    sunLight.shadow.camera.top = 10;
    sunLight.shadow.camera.bottom = -10;

    // Kontrolki kamery
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.screenSpacePanning = true;
    this.controls.mouseButtons.RIGHT = THREE.MOUSE.PAN;
  }
  private loadEnvironmentMap() {
    this.loadingMessage = 'Ładowanie tła...';
    this.rgbeLoader.load('assets/world.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      this.scene.environment = texture;
      this.scene.background = texture;
      this.checkIfLoaded();
    });
  }

  private loadModel() {
    this.loadingMessage = 'Ładowanie modelu 3D...';

    this.loader.load('assets/dom.glb', (gltf) => {
      this.model = gltf.scene;

      this.model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      this.scene.add(this.model);
      this.checkIfLoaded();
    });
  }

  private checkIfLoaded() {
    if (this.scene.background && this.model) {
      this.loadingMessage = 'Finalizowanie...';
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    }
  }

  private animate = () => {
    requestAnimationFrame(this.animate);
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
