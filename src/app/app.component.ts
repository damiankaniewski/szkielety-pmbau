import { Component, ViewChild } from '@angular/core';
import { ThreeViewerComponent } from './components/three-viewer/three-viewer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [ThreeViewerComponent],
})
export class AppComponent {
  @ViewChild('viewer') viewer!: ThreeViewerComponent;

  toggleMesh(meshName: string, event: any) {
    this.viewer.toggleMeshVisibility(meshName, event.target.checked);
  }
}
