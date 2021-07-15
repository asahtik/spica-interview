import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public tokenInput: string | null = null;
  public isValid = true;

  constructor(private settings: SettingsService) { 
    settings.token$.subscribe(t => {
      console.log("Got token");
      this.tokenInput = t;
    });
    settings.refresh();
  }

  ngOnInit(): void { }

  public saveToken() {
    if(this.tokenInput && this.tokenInput.length > 0) {
      this.settings.setToken(this.tokenInput);
      this.isValid = true;
    } else this.isValid = false;
  }

}
