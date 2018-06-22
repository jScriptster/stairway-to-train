import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Way } from '../shared/model/way';
import { WayService } from '../shared/service/way.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'stt-way-details',
  templateUrl: './way-details.component.html',
  styleUrls: ['./way-details.component.scss']
})
export class WayDetailsComponent implements OnInit, OnDestroy {

  way:Way;
  private readySubscription:ISubscription;
  
  constructor(
    private route:ActivatedRoute, 
    private wayService:WayService
  ) { }

  ngOnInit() {
    this.readySubscription = this.wayService.getReady().subscribe((isReady:boolean) => {
      if (isReady) {
        this.init();
      }
    });
  }

  ngOnDestroy() {
    this.readySubscription.unsubscribe();
  }

  init() {
    const wayId = this.route.snapshot.params['id'];
    this.way = this.wayService.getWayById(wayId);   
  }

}
