import { Component, OnInit, EventEmitter, Output, ViewChild, OnDestroy } from '@angular/core';
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { StaDaService } from '../shared/service/sta-da.service';
import { Station } from '../shared/model/station';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'stt-station-search',
  templateUrl: './station-search.component.html',
  styleUrls: ['./station-search.component.scss']
})
export class StationSearchComponent implements OnInit, OnDestroy {
  @Output() selected:EventEmitter<Station> = new EventEmitter<Station>();
  @Output() canceled:EventEmitter<any> = new EventEmitter<any>(); 
  private searchUpdated = new Subject();
  private stationsSuggest:Station[];
  private subscriptionSearchField:ISubscription;
  private subscriptionStaDaService:ISubscription;

  constructor(private staDaService:StaDaService) { }

  ngOnInit() { 
    this.subscriptionSearchField = this.searchUpdated.asObservable()
      .debounceTime(700)
      .distinctUntilChanged() 
      .subscribe(value => {
        this.staDaService.find(value);
      });
    
    this.subscriptionStaDaService = this.staDaService.getSearchResults().subscribe(value => {
      this.stationsSuggest = value;
    });  
  }

  ngOnDestroy() {
    this.subscriptionSearchField.unsubscribe();
    this.subscriptionStaDaService.unsubscribe();
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
