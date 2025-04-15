// --- [importy bez zmian] ---
import { CommonModule } from '@angular/common';
import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FormsModule } from '@angular/forms';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

@Component({
  selector: 'app-configurator',
  imports: [CommonModule, FormsModule],
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss'],
})
export class ConfiguratorComponent implements AfterViewInit {
  @ViewChild('canvasContainer') canvasContainer!: ElementRef;

  private modelUrl =
    'https://policrafts.s3.eu-central-1.amazonaws.com/dom.glb?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDGV1LWNlbnRyYWwtMSJIMEYCIQCp2PhAUQ0rI%2FG8l1GZlysarl51P2cv6Sz3IBFWWrkilQIhAO88rYpu5YWkEZ%2FAFdINFGvB8fA17EHMtRgWF43dNVGdKrkDCDcQABoMNDEyMzgxNzYxNTg2Igz3exHWliRVk9L%2BqacqlgPhc%2B4EOoyuLUzNSIj5R6hbxCOVyTYc2eia9FVQnIbNUui530CpY5lQ92aSgCvj0Kuw9GGsYvlDu5d8E3J5985Nacs5MBKwucAr13QSVwxKxoWj8Jm9rhmGmYJz7g72iFv46dDq%2B8oU8zlsG5moYRhVE3K5VcbE6lqLYdhgE4Y2lnFbl9U0nraeWEFjmgXu5cIZods1aUbhPU0DJJCNdvpR7nH9%2FYa5qTFIytMRUP48zIpkZch%2BvB0lpsWLzAf8ipjeJuRFcrogNjGEDlRNaEmT%2Bf1hwhk4GPe02o3cwSIP5wLLmOGKwAxgNofdjzrWhF5HVdVVhZNumP5cCb20hfCnwn6YNBZ8jzv8BX0ZDxZcVI8%2F%2B5YPOBvueigAA6qaYE3DNv2HgQi6MUdM5GhG3fCRFHI2OjSebrE9KoeE30lir91ARKC2N9XgmmM35kyFsaaU8WOtQWFhHfw7nxhJMqLr5Nema1Xy9y4G6PQsgKGsWoBKXSZuDdBkmm4BLZhdrp90zM74PDOhy1El7g6UIX0Ij78%2BeEALMPeP%2B78GOt0CEDg9DwIUiFlBFDsxAAWXQm6oCIvvVmGo1c2byIEeuJ6BNV%2BD%2FqVafMisOJrNv9lE%2FsZ6g0EaheXbK62yMGb%2F9S%2BdJ7WTq3nXzR8Q1Cd6yi5UKAF%2F9oK09w7Smh8yBWg0vYBqfkUEf3O5JbhyWNlUU7t2bgKZop6eQk6Tu9wNb2Ki2nOK0BnCLpXQ02BOsnik7sTYAXB395eaAxPotzPnwXC9lo0%2BjUBNyCDlZd4MhPO2mHY2YCMIXaxBSz0nBWfg4nfcCk%2BUl2Pw5k%2BV41zoD5ED%2BXatVWfABGPuLzbAEZNuz6hRtDG6JS7DMftX5udNqPhtG9c4Fd1%2F2pnPoAjjn1ARLdyeG9onICq8h2v1ahsxfMQIiQZcgp3bxbgcOskfUvcoRcIN2jdh3SdmSt1X4zdywcupWtUOVlecXdqus%2F6Wg4PHayTAZUt0fMKiH3GMfb%2FIm7EeO6H6jbRqWw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAWAA66KAZMNJXOYPU%2F20250415%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20250415T220853Z&X-Amz-Expires=43200&X-Amz-SignedHeaders=host&X-Amz-Signature=11c8558572c700d45e4aed84b7a3b86e9e10827a9d037dab5d2aaaa573e319fd';
  private hdrUrl =
    'https://policrafts.s3.eu-central-1.amazonaws.com/world.hdr?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDGV1LWNlbnRyYWwtMSJIMEYCIQCp2PhAUQ0rI%2FG8l1GZlysarl51P2cv6Sz3IBFWWrkilQIhAO88rYpu5YWkEZ%2FAFdINFGvB8fA17EHMtRgWF43dNVGdKrkDCDcQABoMNDEyMzgxNzYxNTg2Igz3exHWliRVk9L%2BqacqlgPhc%2B4EOoyuLUzNSIj5R6hbxCOVyTYc2eia9FVQnIbNUui530CpY5lQ92aSgCvj0Kuw9GGsYvlDu5d8E3J5985Nacs5MBKwucAr13QSVwxKxoWj8Jm9rhmGmYJz7g72iFv46dDq%2B8oU8zlsG5moYRhVE3K5VcbE6lqLYdhgE4Y2lnFbl9U0nraeWEFjmgXu5cIZods1aUbhPU0DJJCNdvpR7nH9%2FYa5qTFIytMRUP48zIpkZch%2BvB0lpsWLzAf8ipjeJuRFcrogNjGEDlRNaEmT%2Bf1hwhk4GPe02o3cwSIP5wLLmOGKwAxgNofdjzrWhF5HVdVVhZNumP5cCb20hfCnwn6YNBZ8jzv8BX0ZDxZcVI8%2F%2B5YPOBvueigAA6qaYE3DNv2HgQi6MUdM5GhG3fCRFHI2OjSebrE9KoeE30lir91ARKC2N9XgmmM35kyFsaaU8WOtQWFhHfw7nxhJMqLr5Nema1Xy9y4G6PQsgKGsWoBKXSZuDdBkmm4BLZhdrp90zM74PDOhy1El7g6UIX0Ij78%2BeEALMPeP%2B78GOt0CEDg9DwIUiFlBFDsxAAWXQm6oCIvvVmGo1c2byIEeuJ6BNV%2BD%2FqVafMisOJrNv9lE%2FsZ6g0EaheXbK62yMGb%2F9S%2BdJ7WTq3nXzR8Q1Cd6yi5UKAF%2F9oK09w7Smh8yBWg0vYBqfkUEf3O5JbhyWNlUU7t2bgKZop6eQk6Tu9wNb2Ki2nOK0BnCLpXQ02BOsnik7sTYAXB395eaAxPotzPnwXC9lo0%2BjUBNyCDlZd4MhPO2mHY2YCMIXaxBSz0nBWfg4nfcCk%2BUl2Pw5k%2BV41zoD5ED%2BXatVWfABGPuLzbAEZNuz6hRtDG6JS7DMftX5udNqPhtG9c4Fd1%2F2pnPoAjjn1ARLdyeG9onICq8h2v1ahsxfMQIiQZcgp3bxbgcOskfUvcoRcIN2jdh3SdmSt1X4zdywcupWtUOVlecXdqus%2F6Wg4PHayTAZUt0fMKiH3GMfb%2FIm7EeO6H6jbRqWw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAWAA66KAZMNJXOYPU%2F20250415%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20250415T220930Z&X-Amz-Expires=43200&X-Amz-SignedHeaders=host&X-Amz-Signature=200661c1eddadc6836e34ff4b5c60a21b8a8d7a1a4d9bd7ea53c06372d64ffef';

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private model!: THREE.Group;
  private loader = new GLTFLoader();
  private rgbeLoader = new RGBELoader();
  private controls: any;
  showCanvas = false;
  hidden = false;

  config = {
    foundation: 'płyta fundamentowa',
    area: '90',
    elevation: 'tynk+lamele',
    windowFrame: 'drewno',
    door: 'standard',
    roof: 'standard',
    terrace: 'brak',
    gutters: 'biały',
  };

  private loadedMeshes: THREE.Mesh[] = [];

  ngAfterViewInit(): void {
    this.initScene();
    this.animate();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const container = this.canvasContainer.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
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
    this.camera.position.set(0, 7, 7);
    this.camera.lookAt(0, 0, 0);
    this.camera.rotation.x = -Math.PI / 6;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const canvas = this.renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    this.canvasContainer.nativeElement.appendChild(canvas);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2);
    sunLight.position.set(-5, 10, -5);
    sunLight.castShadow = true;

    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.1;
    sunLight.shadow.camera.far = 100;
    sunLight.shadow.camera.left = -15;
    sunLight.shadow.camera.right = 15;
    sunLight.shadow.camera.top = 15;
    sunLight.shadow.camera.bottom = -15;
    sunLight.shadow.bias = -0.0001;

    this.scene.add(sunLight);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.screenSpacePanning = true;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.minPolarAngle = Math.PI / 6;
    this.controls.enableRotate = true;
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    this.controls.target.set(5, 3, -2);
  }

  private loadEnvironmentMap() {
    this.rgbeLoader.load(this.hdrUrl, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;

      this.scene.environment = texture;
      this.scene.background = texture;
    });
  }

  private loadModel() {
    this.loader.load(this.modelUrl, (gltf) => {
      this.model = gltf.scene;
      this.loadedMeshes = [];

      this.model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          console.log(child.name);

          if (
            child.name === '70_elewacja_biała001' ||
            child.name === '70_elewacja_biała001_1'
          ) {
            child.castShadow = true;
          }
          child.visible = false;

          child.receiveShadow = true;

          this.loadedMeshes.push(child);
        }
      });

      this.scene.add(this.model);
      this.updateMeshes(); // uruchom po załadowaniu
    });
  }

  updateMeshes() {
    const prefix = this.config.area + '_';
    const meshesToShow: string[] = [];

    // Zawsze wlaczone
    meshesToShow.push('Grass_Cortaderia-Selloana_A_spring-summer');
    meshesToShow.push('Grass_Cortaderia-Selloana_A_spring-summer_1');
    meshesToShow.push('Cube_1');
    meshesToShow.push('Cube_2');
    meshesToShow.push('Cube001_1');
    meshesToShow.push('Cube001_2');
    meshesToShow.push('Cube002_1');
    meshesToShow.push('Cube002_2');
    meshesToShow.push('tuje_1');
    meshesToShow.push('tuje_2');

    // Powierzchnia
    if (this.config.area === '70') {
      meshesToShow.push(`${prefix}lampki_1`);
      meshesToShow.push(`${prefix}lampki_2`);
      meshesToShow.push(`${prefix}lampki_3`);
      meshesToShow.push(`${prefix}lampki_scienne_1`);
      meshesToShow.push(`${prefix}lampki_scienne_2`);
      meshesToShow.push(`${prefix}kostka`);
      meshesToShow.push(`${prefix}trawa_ogródek`);
      meshesToShow.push(`${prefix}żwir`);
      meshesToShow.push(`${prefix}parapety`);
      meshesToShow.push(`${prefix}okno_dachowe001`);
      meshesToShow.push(`${prefix}okno_dachowe001_1`);
      meshesToShow.push(`${prefix}dach`);
    } else if (this.config.area === '90') {
      meshesToShow.push(`${prefix}lampki_1`);
      meshesToShow.push(`${prefix}lampki_2`);
      meshesToShow.push(`${prefix}lampki_3`);
      meshesToShow.push(`${prefix}lampki_scienne_1`);
      meshesToShow.push(`${prefix}lampki_scienne_2`);
      meshesToShow.push(`${prefix}kostka`);
      meshesToShow.push(`${prefix}trawa_ogródek`);
      meshesToShow.push(`${prefix}żwir`);
      meshesToShow.push(`${prefix}parapety`);
      meshesToShow.push(`${prefix}okno_dachowe001`);
      meshesToShow.push(`${prefix}okno_dachowe001_1`);
      meshesToShow.push(`${prefix}dach`);
    }

    // Elewacja
    if (this.config.elevation === 'tynk+lamele') {
      meshesToShow.push(`${prefix}lamele`);
      meshesToShow.push(`${prefix}elewacja_biała001`);
      meshesToShow.push(`${prefix}elewacja_biała001_1`);
    } else if (this.config.elevation === 'blacha+deski') {
      meshesToShow.push(`${prefix}elewacja_blacha_+_deski001`);
      meshesToShow.push(`${prefix}elewacja_blacha_+_deski001_1`);
      meshesToShow.push(`${prefix}elewacja_blacha_+_deski001_2`);
    } else if (this.config.elevation === 'białoszary tynk') {
      meshesToShow.push(`${prefix}elewacja_biało_ciemna001`);
      meshesToShow.push(`${prefix}elewacja_biało_ciemna001_1`);
    } else if (this.config.elevation === 'tynk+deski') {
      meshesToShow.push(`${prefix}elewacja_biała_+_deski001`);
      meshesToShow.push(`${prefix}elewacja_biała_+_deski001_1`);
      meshesToShow.push(`${prefix}elewacja_biała_+_deski001_2`);
    }

    // Framugi okien
    if (this.config.windowFrame === 'drewno') {
      if (this.config.area === '70') {
        meshesToShow.push(`${prefix}okna_drewno_1`);
        meshesToShow.push(`${prefix}okna_drewno_2`);
      } else if (this.config.area === '90') {
        meshesToShow.push(`${prefix}okna_drewno001`);
        meshesToShow.push(`${prefix}okna_drewno001_1`);
      }
    } else if (this.config.windowFrame === 'białe') {
      meshesToShow.push(`${prefix}okna_biały001`);
      meshesToShow.push(`${prefix}okna_biały001_1`);
    } else if (this.config.windowFrame === 'antracyt') {
      meshesToShow.push(`${prefix}okna_antracyt001`);
      meshesToShow.push(`${prefix}okna_antracyt001_1`);
    }

    // Drzwi
    if (this.config.door === 'standard') {
      meshesToShow.push(`${prefix}drzwi_standard_1`);
      meshesToShow.push(`${prefix}drzwi_standard_2`);
    } else if (this.config.door === 'premium') {
      meshesToShow.push(`${prefix}drzwi_premium_1`);
      meshesToShow.push(`${prefix}drzwi_premium_2`);
      meshesToShow.push(`${prefix}drzwi_premium_3`);
      meshesToShow.push(`${prefix}drzwi_premium_4`);
    }

    // Daszek nad drzwiami
    if (this.config.roof === 'standard') {
      meshesToShow.push(`${prefix}daszek_1`);
      meshesToShow.push(`${prefix}daszek_2`);
      meshesToShow.push(`${prefix}daszek_3`);
      meshesToShow.push(`${prefix}daszek_4`);
    } else if (this.config.roof === 'premium') {
      meshesToShow.push(`${prefix}daszek_premium_1`);
      meshesToShow.push(`${prefix}daszek_premium_2`);

      if (this.config.windowFrame === 'antracyt') {
        meshesToShow.push(`${prefix}daszek_premium_lamele_antracyt`);
      } else if (this.config.windowFrame === 'drewno') {
        meshesToShow.push(`${prefix}daszek_premium_lamele_drewno`);
      }
    }

    // Taras
    if (this.config.terrace === 'jest') {
      meshesToShow.push(`${prefix}taras001`);
      meshesToShow.push(`${prefix}taras001_1`);
    }

    // Rynny/Rury Spustowe
    if (this.config.gutters === 'biały') {
      meshesToShow.push(`${prefix}rynny_białe`);
    } else if (this.config.gutters === 'antracyt') {
      meshesToShow.push(`${prefix}rynny`);
    }

    // Ukryj wszystko
    this.loadedMeshes.forEach((mesh) => {
      mesh.visible = false;
    });

    // Pokaż tylko wybrane
    this.loadedMeshes.forEach((mesh) => {
      if (meshesToShow.includes(mesh.name)) {
        mesh.visible = true;
      }
    });
  }

  // Wywoływana przy zmianach konfiguracji z szablonu
  onConfigChange() {
    this.updateMeshes();
  }

  load3DView() {
    this.hidden = true;
    this.loadEnvironmentMap();
    this.loadModel();
  }

  private animate = () => {
    requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };
}
