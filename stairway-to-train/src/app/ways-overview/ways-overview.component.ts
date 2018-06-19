import { Component, OnInit, OnDestroy } from '@angular/core';
import { WayService } from '../shared/service/way.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Way } from '../shared/model/way';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'stt-ways-overview',
  templateUrl: './ways-overview.component.html',
  styleUrls: ['./ways-overview.component.scss']
})
export class WaysOverviewComponent implements OnInit, OnDestroy {

  private ways:Way[];
  private subscription: ISubscription;

  constructor(
    private wayService:WayService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.ways = this.wayService.getWays();
    this.subscription = this.wayService.getNewWayMessage().subscribe(way => {
      this.router.navigate(['details', way.id, 'bearbeiten'], {relativeTo: this.route});
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClickNewButton(e) {
    this.wayService.create();
  }

}
