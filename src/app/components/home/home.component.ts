import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CommonModule],
})
export class HomeComponent {
  //backgorund parameters
  scale = 1;
  blur = 0;
  opacityB: number = 0; // Początkowa wartość opacity (1 oznacza widoczny)
  isDay: boolean = true;

  //icons opacity
  opacity = 1;

  links = [
    { label: 'O nas', href: '#about' },
    { label: 'Galeria', href: '#gallery' },
    { label: 'Technologia', href: '#technology' },
    { label: 'Konfigurator', href: '#configurator' },
    { label: 'Kontakt', href: '#contact' },
  ];

  scrollTo(event: Event, sectionId: string) {
    event.preventDefault();
    const section = document.querySelector(sectionId);
    const offset = 80;

    if (section) {
      const sectionTop =
        section.getBoundingClientRect().top + window.pageYOffset;
      const scrollPosition = sectionTop - offset;

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY;

    const maxScroll = 1000;
    const maxScale = 1.5;
    const scale = 1 + (scrollY / maxScroll) * (maxScale - 1);
    this.scale = Math.min(maxScale, scale);

    const maxOpacityScroll = 100;
    const opacity = 1 - scrollY / maxOpacityScroll;
    this.opacity = Math.max(0, opacity);

    const blurStart = 400;
    const blurEnd = 1000;
    const maxBlur = 30;

    if (scrollY < blurStart) {
      this.blur = 0;
    } else {
      const blurProgress = (scrollY - blurStart) / (blurEnd - blurStart);
      this.blur = Math.min(maxBlur, blurProgress * maxBlur);
    }
  }

  toggleDayNight(): void {
    this.isDay = !this.isDay;
    this.opacityB = this.opacityB === 1 ? 0 : 1;
  }
}
