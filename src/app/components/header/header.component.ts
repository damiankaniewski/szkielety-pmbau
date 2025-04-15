import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule],
})
export class HeaderComponent {
  menuOpen = false;
  activeSection: string = '#home';
  showHeader = false;

  links = [
    { label: 'O nas', href: '#about' },
    { label: 'Galeria', href: '#gallery' },
    { label: 'Technologia', href: '#technology' },
    { label: 'Konfigurator', href: '#configurator' },
    { label: 'Kontakt', href: '#contact' },
  ];

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

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

      this.activeSection = sectionId;
      this.menuOpen = false; // Zamykamy menu na mobile
    }
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPosition = window.scrollY;

    // Pokazuje nagłówek tylko wtedy, gdy użytkownik NIE jest na samej górze strony
    this.showHeader = scrollPosition > 50;

    // Aktywna sekcja dla podświetlenia menu
    let scrollOffset = scrollPosition + 100;

    for (let link of this.links) {
      const section = document.querySelector(link.href);
      if (section) {
        const offsetTop = (section as HTMLElement).offsetTop;
        const offsetHeight = (section as HTMLElement).offsetHeight;

        if (
          scrollOffset >= offsetTop &&
          scrollOffset < offsetTop + offsetHeight
        ) {
          this.activeSection = link.href;
        }
      }
    }
  }
}
