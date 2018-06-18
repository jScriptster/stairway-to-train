import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Way } from '../shared/model/way';
import { WayService } from '../shared/service/way.service';
import { Station } from '../shared/model/station';

@Component({
  selector: 'stt-way-details-edit',
  templateUrl: './way-details-edit.component.html',
  styleUrls: ['./way-details-edit.component.scss']
})
export class WayDetailsEditComponent implements OnInit {

  way:Way;
  isStationSerach:boolean = false;
  
  constructor(
    private route:ActivatedRoute, 
    private wayService:WayService
  ) { }

  ngOnInit() {
    const wayId = this.route.snapshot.params['id'];
    this.way = this.wayService.getWayById(wayId);
  }

  addStation() {
    this.isStationSerach = true;
  } 

  onAddStationCanceled() {
    this.isStationSerach = false;
  }

  onStationSelected(selectedStation:Station) {
    this.wayService.addStation(this.way.id, selectedStation);
    this.isStationSerach = false;
  }

  onRemoveStationClicked(removedStation:Station) {
    this.wayService.removeStation(this.way.id, removedStation);    
  }

}
