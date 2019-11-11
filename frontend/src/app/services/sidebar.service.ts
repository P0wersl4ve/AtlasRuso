import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [

  ];


  constructor() { }

  getMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')).filter(menuItem => menuItem.permiso == true);
  }
}
