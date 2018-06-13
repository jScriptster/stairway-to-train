import { Component } from '@angular/core';
import { StaDaService } from './shared/service/sta-da.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private staDaService: StaDaService) {

  }

  testButtonClickHandler(e) {
    this.staDaService.find();
  }

}
