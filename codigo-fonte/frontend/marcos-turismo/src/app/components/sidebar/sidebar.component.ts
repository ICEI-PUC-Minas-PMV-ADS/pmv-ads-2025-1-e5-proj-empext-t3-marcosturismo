import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<boolean>();
  isSidebarActive = true;  // Variable to control sidebar state

  constructor(private router: Router) {}

  ngOnInit() {}

  // Method to toggle the sidebar visibility and emit the state to the parent component
  toggleSidebarFunction() {
    this.isSidebarActive = !this.isSidebarActive;
    this.toggleSidebar.emit(this.isSidebarActive);  // Emit the new state to parent
  }

  // General method for navigation (reuse this for other links too)
  navigate(route: string) {
    this.router.navigate([route]);
  }

  // Handle user logout
  logout() {
    localStorage.removeItem('authToken');
    sessionStorage.clear();

    console.log('User logged out successfully');
    this.router.navigate(['/login']);
  }
}
