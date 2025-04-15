// about.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  sections = [
    {
      title: 'Wieloletnie doświadczenie',
      icon: 'fa-helmet-safety',
      text: `
        <strong>20-letnie doświadczenie</strong> w branży budowlanej to nasz kluczowy atut. 
        Zrealizowaliśmy <strong>setki projektów budowlanych</strong>, co pozwala nam świadczyć usługi 
        na najwyższym poziomie. Dzięki wiedzy technicznej oraz długoletniej pracy w różnych 
        warunkach, jesteśmy w stanie doradzić naszym klientom w kwestiach wyboru najlepszych 
        materiałów budowlanych, a także rozwiązań konstrukcyjnych.
      `,
      img: 'assets/configurator-base.png',
      buttonLabel: 'Dowiedz się więcej',
    },
    {
      title: 'Najwyższa jakość usług',
      icon: 'fa-award',
      text: `
        Nasza firma jest <strong>synonimem jakości</strong>. Nasza baza sprzętowa, w tym nowoczesne 
        elektronarzędzia, szalunki stropowe, rusztowania i inne urządzenia budowlane, 
        stanowi fundament naszych usług. <strong>Doświadczony zespół wykonawców</strong> gwarantuje 
        realizację prac zgodnie z najwyższymi standardami. Zależy nam na terminowości 
        i zadowoleniu naszych klientów.
      `,
      img: 'assets/home-background-noc.png',
      buttonLabel: 'Poznaj jakość',
    },
    {
      title: 'Ekologiczne podejście',
      icon: 'fa-leaf',
      text: `
        Stosowanie <strong>energooszczędnych i ekologicznych</strong> rozwiązań to nie tylko nasza filozofia, 
        ale także odpowiedź na potrzeby rynku. Wprowadzamy <strong>nowoczesne technologie</strong>, które 
        nie tylko pomagają oszczędzać, ale i chronią środowisko. Domy, które budujemy, 
        to konstrukcje <strong>przyjazne dla natury</strong> i zapewniające użytkownikom komfort życia. 
        Dbamy o każdy detal – od materiałów budowlanych po instalacje.
      `,
      img: 'assets/home-background.png',
      buttonLabel: 'Zobacz jak dbamy o środowisko',
    },
    {
      title: 'Solidność i zaufanie',
      icon: 'fa-shield-alt',
      text: `
        Nasza firma działa na rynku budowlanym od wielu lat, zdobywając zaufanie zarówno klientów indywidualnych, 
        jak i dużych firm. Proponujemy nie tylko wykonanie zleceń, ale również <strong>kompleksowe doradztwo</strong>, 
        pomoc w kosztorysach oraz nadzór nad realizacją projektów. Współpracując z nami, masz pewność, że 
        <strong>Twoje inwestycje są w dobrych rękach</strong>.
      `,
      img: 'assets/configurator-base.png',
      buttonLabel: 'Zaufaj profesjonalistom',
    },
  ];
}
