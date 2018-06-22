import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Way } from '../shared/model/way';
import { WayService } from '../shared/service/way.service';
import { Station } from '../shared/model/station';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'stt-way-details-edit',
  templateUrl: './way-details-edit.component.html',
  styleUrls: ['./way-details-edit.component.scss']
})
export class WayDetailsEditComponent implements OnInit, OnDestroy {

  private way:Way;
  private isStationSerach:boolean = false;
  private readySubscription:ISubscription;
  private subscription:ISubscription;
  
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private wayService:WayService
  ) {}

  ngOnInit() {
    this.readySubscription = this.wayService.getReady().subscribe((isReady:boolean) => {
      if (isReady) {
        this.init();
      }
    });
  }

  init() {
    const wayId = this.route.snapshot.params['id'];
    this.way = this.wayService.getWayById(wayId);
    this.subscription = this.wayService.getKillWayMessage().subscribe((killedWay:Way) => {
      if (killedWay.id ===  wayId) {
        this.router.navigate(['meine-routen']);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.readySubscription.unsubscribe();
  }

  onAddStationClicked() {
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

  onTitleChanged() {
    this.wayService.save(this.way.id);
  }

  onKillWayClicked() {
    this.wayService.kill(this.way.id);
  }

}
