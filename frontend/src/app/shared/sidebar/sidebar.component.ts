import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  user= '';
  
  constructor( public _sidebar: SidebarService ) {
    this._sidebar.getMenu();
    this.user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).nombres : JSON.parse(localStorage.getItem('currentAsociado')).nombres; 
   }

  ngOnInit() {
  }

}
