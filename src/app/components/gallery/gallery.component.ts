import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnDestroy {
  images = [
    { src: 'assets/home-background.png', tile: '1x2 top-left' },
    { src: 'assets/configurator-base.png', tile: '2x2' },
    { src: 'assets/home-background.png', tile: '1x1' },
    { src: 'assets/home-background-noc.png', tile: '1x1 top-right' },
    { src: 'assets/home-background.png', tile: '2x1' },
    { src: 'assets/home-background-noc.png', tile: '1x1 bottom-left' },
    { src: 'assets/home-background.png', tile: '1x1' },
    { src: 'assets/home-background-noc.png', tile: '2x1' },
    { src: 'assets/home-background.png', tile: '1x1 bottom-right' },
  ];

  isModalOpen = false;
  selectedIndex: number | null = null;

  get selectedImage(): string | null {
    return this.selectedIndex !== null
      ? this.images[this.selectedIndex].src
      : null;
  }

  openModal(index: number): void {
    this.selectedIndex = index;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden'; // blokada scrolla w tle
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedIndex = null;
    document.body.style.overflow = 'auto';
  }

  nextImage(): void {
    if (this.selectedIndex !== null) {
      this.selectedIndex = (this.selectedIndex + 1) % this.images.length;
    }
  }

  prevImage(): void {
    if (this.selectedIndex !== null) {
      this.selectedIndex =
        (this.selectedIndex - 1 + this.images.length) % this.images.length;
    }
  }

  // 🔑 Klawiatura globalnie
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (!this.isModalOpen) return;

    switch (event.key) {
      case 'ArrowRight':
        this.nextImage();
        break;
      case 'ArrowLeft':
        this.prevImage();
        break;
      case 'Escape':
        this.closeModal();
        break;
    }
  }

  // Na wszelki wypadek — sprzątanie stylu scrolla
  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
  }
}
