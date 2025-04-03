import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-frotas',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './frotas.component.html',
  styleUrls: ['./frotas.component.css']
})
export class FrotasComponent {
  frotas = [
    {
<<<<<<< Updated upstream
      image: 'logo.jpg',
=======
      image: 'bus.jpg',
>>>>>>> Stashed changes
      name: 'Ônibus Executivo',
      description: 'Ônibus confortável para viagens longas.'
    },
    {
<<<<<<< Updated upstream
      image: 'logo.jpg',
=======
      image: 'bus.jpg',
>>>>>>> Stashed changes
      name: 'Micro-ônibus',
      description: 'Ideal para pequenos grupos e eventos.'
    }
  ];
}