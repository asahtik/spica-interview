import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public isCollapsed = true
  public tokenIsValid = false;

  constructor(private settings: SettingsService) { 
    settings.token$.subscribe(t => {
      if(t && t != "") this.tokenIsValid = true;
      else this.tokenIsValid = false;
    });
    settings.refresh();
  }

  ngOnInit(): void {
  }

}
