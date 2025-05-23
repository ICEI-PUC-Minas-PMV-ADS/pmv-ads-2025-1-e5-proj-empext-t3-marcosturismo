import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment'; // ajuste o caminho

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  imagens: string[] = [
    'logo.jpg',
    'excursao.jpg',
    'poderosoUno.jpg',
    'logo.jpg',
    'logo.jpg',
    'logo.jpg'
  ];

  videos: { src: string }[] = [
    { src: 'video.mp4' },
    { src: 'video.mp4' },
    { src: 'video.mp4' }
  ];

  apiUrl: string = `${environment.apiUrl}/upcoming`;

  constructor() {}
}
