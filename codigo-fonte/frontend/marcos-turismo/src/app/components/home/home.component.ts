import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  imagens: string[] = [
    'logo.jpg',
    'logo.jpg',
    'logo.jpg'
  ];
  constructor() { }

  ngOnInit(): void {
    // Pode ser algum código adicional se necessário para preencher a lista de imagens
  }

}
