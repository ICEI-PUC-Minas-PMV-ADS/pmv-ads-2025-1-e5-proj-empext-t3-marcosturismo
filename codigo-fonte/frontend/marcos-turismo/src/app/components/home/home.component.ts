import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  imagens = [
    'assets/logo.jpg',
    'assets/excursao.jpg',
    'assets/poderosoUno.jpg',
    'assets/logo.jpg',
    'assets/logo.jpg',
    'assets/logo.jpg'
  ];

  videos = [
    { src: 'assets/video1.mp4' },
    { src: 'assets/video2.mp4' },
    { src: 'assets/video3.mp4' }
  ];
}
