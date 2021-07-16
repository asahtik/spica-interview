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
  public errMsg = false;
  public succMsg = false;

  constructor(private settings: SettingsService) { 
    settings.token$.subscribe(t => {
      this.tokenInput = t;
    });
    settings.refresh();
  }

  ngOnInit(): void { }

  // Save API token
  public saveToken() {
    if(this.tokenInput && this.tokenInput.length > 0) {
      this.settings.setToken(this.tokenInput);
      this.isValid = true;
      this.succMsg = true;
      setTimeout(() => this.succMsg = false, 3000);
    } else {
      this.isValid = false;
      this.errMsg = true;
      setTimeout(() => this.errMsg = false, 3000);
    }
  }

}
