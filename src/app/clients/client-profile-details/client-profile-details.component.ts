import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-profile-details',
  templateUrl: './client-profile-details.component.html',
  styleUrls: ['./client-profile-details.component.css']
})
export class ClientProfileDetailsComponent implements OnInit {
  public fishPondHealth: any;
  public fishPondProductionData: any;

  public rows: Array<object> = [];
  public srch = [];

  public viewP: any;

  constructor(
    private clientService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
    ) {
    this.rows = clientService.pondsData;
    // this.rows = this.ponds;
    this.srch = [...this.rows];
  }

  ngOnInit() {
    // this.route.queryParams.subscribe(params => {
    //   // console.log(params);
    //   this.viewP = [];
    //   if (params.id) {
    //     var id = params.id;
    //     const arr = this.rows.find(function (item, i) {
    //       return item.clientID == id;
    //     });
    //     if (!arr) {
    //       this.viewP = {};
    //       this.router.navigate(['clients/profile/details']);
    //     }
    //     else {
    //       this.viewP.push(arr);
    //       this.viewP = this.viewP[0];
    //       // console.log(this.viewP);
    //     }
    //   }
    //   else {
    //     this.router.navigate(['clients/profile/details']);
    //   }
    // });

    this.fishPondHealth = this.location.getState();
    this.fishPondProductionData = this.location.getState();

    // this.rows = this.ponds;
    console.log('client profile ctr: state data ==>', this.fishPondHealth);
    console.log('client profile ctr: profitability ==>', this.fishPondHealth.profitability);
    console.log('client profile ctr: growthInWorkforce ==>', this.fishPondHealth.growthInWorkforce);
    console.log('client profile ctr: growthInProductionUnits ==>', this.fishPondHealth.growthInProductionUnits);

    console.log('client profile ctr: feedConversionRation ==>', this.fishPondProductionData.feedConversionRation);
    console.log('client profile ctr: growthReate ==>', this.fishPondProductionData.growthReate);
    console.log('client profile ctr: hatchability ==>', this.fishPondProductionData.hatchability);
    console.log('client profile ctr: sexReversalGrowthRate ==>', this.fishPondProductionData.sexReversalGrowthRate);
    console.log('client profile ctr: state data ==>', this.fishPondProductionData.sexReversalMortality);
    console.log('client profile ctr: sexReversalMortalityRate ==>', this.fishPondProductionData.sexReversalMortalityRate);
    console.log('client profile ctr: weightGainAtNursery ==>', this.fishPondProductionData.weightGainAtNursery);
    console.log('client profile ctr: growthRateAtNursery ==>', this.fishPondProductionData.growthRateAtNursery);
    console.log('client profile ctr: recoveryRateDuringNursery ==>', this.fishPondProductionData.recoveryRateDuringNursery);
    console.log('client profile ctr: mortalityDuringNursery ==>', this.fishPondProductionData.mortalityDuringNursery);
    console.log('client profile ctr: mortalityRateDuringNursery ==>', this.fishPondProductionData.mortalityRateDuringNursery);

  }

  onEdit(id) {
    this.router.navigate(['clients/profile/edit'], { queryParams: { 'id': id } });
  }

}
