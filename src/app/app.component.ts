import {Component, OnInit} from '@angular/core';
import {Dialog} from "@angular/cdk/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
    './app-tablet.component.css',
    './app-desktop.component.css']
})
export class AppComponent implements OnInit{

  isDarkMode: boolean = false;

  constructor(private dialog: Dialog) {
  }

  ngOnInit() {
    this.isDarkMode = localStorage.getItem('isDarkMode') === 'true';
  }

  changeTheme(){
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('isDarkMode', this.isDarkMode.toString());
    document.body.classList.toggle('dark-mode');
  }
  headerClicked(){
    this.dialog.closeAll();
  }
}
