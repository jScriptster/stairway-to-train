import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Facility } from '../shared/model/facility';

@Component({
  selector: 'stt-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.scss']
})
export class FacilityComponent implements OnInit {
  @Input() isPreview:boolean = false;
  @Input() facility:Facility;
  @Input() favorFacilities:string[];
  @Output() favor:EventEmitter<string> = new EventEmitter();
  private isFavor:boolean = false;
  private _favorFacilities:string[];
  private iterableDiffer;

  constructor() {
   }

  ngOnInit() {
  }

  onFavorFacilityClicked(facilityId) {
    this.favor.emit(facilityId);
  }

  ngDoCheck() {
    if (this.favorFacilities) {
      this.isFavor = this.favorFacilities.indexOf(this.facility.id) > -1;
    }
  }
}
