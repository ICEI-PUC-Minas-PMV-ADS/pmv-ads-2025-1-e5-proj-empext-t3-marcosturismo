import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, FormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSidebarActive = true;

  onToggleSidebar(active: boolean) {
    this.isSidebarActive = active;
  }
}
