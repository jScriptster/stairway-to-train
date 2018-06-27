import { Component, OnInit, Input, Output, EventEmitter, IterableDiffer, DoCheck, IterableDiffers } from '@angular/core';
import { Facility } from '../shared/model/facility';

@Component({
  selector: 'stt-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.scss']
})
export class FacilityComponent implements OnInit, DoCheck {
  @Input() isPreview:boolean = false;
  @Input() facility:Facility;
  @Input() favorFacilities:string[];
  @Output() favor:EventEmitter<string> = new EventEmitter();
  private isFavor:boolean = false;
  private _favorFacilities:string[];
  private differ;

  constructor(differs:IterableDiffers) {
    this.differ = differs.find([]).create(null);
  }

  ngOnInit() {
  }

  onFavorFacilityClicked(facilityId) {
    this.favor.emit(facilityId);
  }

  //ngDoCheck() {
  //  if (this.favorFacilities) {
  //    this.isFavor = this.favorFacilities.indexOf(this.facility.id) > -1;
  //  }
  //}

  ngDoCheck() {
    const change = this.differ.diff(this.favorFacilities);
    if (change) {
      change.forEachAddedItem((el) =>{
        if (el.item === this.facility.id) {
          this.isFavor = true;
        }
      });
      change.forEachRemovedItem((el) =>{
        if (el.item === this.facility.id) {
          this.isFavor = false;
        }
      });
    }
    // here you can do what you want on array change
    // you can check for forEachAddedItem or forEachRemovedItem on change object to see the added/removed items
    // Attention: ngDoCheck() is triggered at each binded variable on componenet; if you have more than one in your component, make sure you filter here the one you want.
  }
}
