import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Station } from '../shared/model/station';
import { FaStaService } from '../shared/service/fa-sta.service';
import { Observable, Observer } from 'rxjs';
import { Facility } from '../shared/model/facility';
import { OnDestroy } from "@angular/core";
import { ISubscription } from "rxjs/Subscription";

@Component({
  selector: 'stt-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent implements OnInit, OnDestroy {
  @Input() station:Station;
  @Input() edit:boolean = false;
  @Output() remove:EventEmitter<Station> = new EventEmitter<Station>();
  @Output() favor:EventEmitter<Object> = new EventEmitter<Object>();

  private subscription: ISubscription;
  private facilities:Facility[];
  private detailsVisible:boolean = false;
  private a;

  constructor(private faStaService:FaStaService) {}

  ngOnInit() {
    const facilitiesObservable = this.faStaService.getFacilitiesByStation(this.station.id);
    this.subscription = facilitiesObservable.subscribe((facilities:Facility[]) => {
      this.facilities = facilities;
    });
    
    if (!this.edit) {
      this.faStaService.fetch(this.station.id);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onRemoveClicked() {
    this.remove.emit(this.station);
  }

  onRefreshClicked() {
    this.faStaService.fetch(this.station.id, true);
  }

  onFavorFacilityClicked(id:string) {
    this.favor.emit({
      stationId: this.station.id,
      facilityId: id
    });
  }

  onToggleDetailsVisible() {
    this.detailsVisible = !this.detailsVisible;
  }

}
