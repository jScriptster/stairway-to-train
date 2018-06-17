import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Way } from '../shared/model/way';
import { WayService } from '../shared/service/way.service';

@Component({
  selector: 'stt-way-details',
  templateUrl: './way-details.component.html',
  styleUrls: ['./way-details.component.scss']
})
export class WayDetailsComponent implements OnInit {

  way:Way;
  
  constructor(
    private route:ActivatedRoute, 
    private wayService:WayService
  ) { }

  ngOnInit() {
    const wayId = this.route.snapshot.params['id'];
    this.way = this.wayService.getWayById(wayId);
  }

}
