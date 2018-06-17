import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { StaDaService } from '../shared/service/sta-da.service';
import { Station } from '../shared/model/station';

@Component({
  selector: 'stt-station-search',
  templateUrl: './station-search.component.html',
  styleUrls: ['./station-search.component.scss']
})
export class StationSearchComponent implements OnInit {
  @Output() selected:EventEmitter<Station> = new EventEmitter<Station>();
  @Output() canceled:EventEmitter<any> = new EventEmitter<any>(); 
  private searchUpdated = new Subject();
  private stationsSuggest:Station[];

  constructor(private staDaService:StaDaService) { }

  ngOnInit() { 
    this.searchUpdated.asObservable()
      .debounceTime(700)
      .distinctUntilChanged() 
      .subscribe(value => {
        this.staDaService.find(value);
      });
    
    this.staDaService.getSearchResults().subscribe(value => {
      this.stationsSuggest = value;
    });  
  }

  onCancelClick() {
    this.canceled.emit();
  }

  onInput(query) {
    this.searchUpdated.next(query);
  }

  onStationSelected(selectedStation:Station) {
    this.selected.emit(selectedStation);
  }

}
