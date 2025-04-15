import { Component } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ContactComponent } from './components/contact/contact.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AboutComponent } from './components/about/about.component';
import { ConfiguratorComponent } from './components/configurator/configurator.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignatureComponent } from './components/signature/signature.component';
import * as AOS from 'aos';
import { TechnologyComponent } from './components/technology/technology.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    HomeComponent,
    HeaderComponent,
    AboutComponent,
    GalleryComponent,
    TechnologyComponent,
    ConfiguratorComponent,
    ContactComponent,
    FooterComponent,
    SignatureComponent,
  ],
})
export class AppComponent {
  ngOnInit() {
    AOS.init();
  }
}
