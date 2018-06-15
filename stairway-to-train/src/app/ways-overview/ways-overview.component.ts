import { Component, OnInit } from '@angular/core';
import { WayService } from '../shared/service/way.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'stt-ways-overview',
  templateUrl: './ways-overview.component.html',
  styleUrls: ['./ways-overview.component.scss']
})
export class WaysOverviewComponent implements OnInit {

  ways;

  constructor(
    private wayService:WayService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.ways = this.wayService.getWays();
    this.wayService.getNewWayMessage().subscribe(way => {
      this.router.navigate(['details', way.id, 'bearbeiten'], {relativeTo: this.route});
    })
  }

  onClickNewButton(e) {
    this.wayService.create();
  }

}
