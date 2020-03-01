import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { LivingAquariumService } from '../services/living-aquarium.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { IMyDpOptions } from 'mydatepicker';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

declare const $: any;

@Component({
  selector: 'app-users',
  templateUrl: './myponds.component.html',
  styleUrls: ['./myponds.component.css']
})
export class MyPondsComponent implements OnInit {

  public rows = [];
  public srch = [];

  public addU: any = {};
  public uptU: any = [];

  public isLoading: string = 'false';
  public pondsData: any = {};

  public today = new Date();
  public myDatePickerOptionsT: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'su',
    sunHighlight: true,
    inline: false,
    height: '48px'
  };
  public myDatePickerOptionsF: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'su',
    sunHighlight: true,
    inline: false,
    height: '48px'
  };
  public myDatePickerOptions1: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'su',
    sunHighlight: true,
    inline: false,
    height: '38px'
  };
  ecoData: any = {};
  ecoDataForm: FormGroup;
  public addC: any = {};
  addClientValidation: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: AppService,
    private laService: LivingAquariumService
  ) {
    // this.rows = userService.users;
    this.rows = userService.myponds;
    this.srch = [...this.rows];
  }

  ngOnInit() {
    this.ecoDataForm = this.formBuilder.group({
      dateFrom: [null],
      dateTo: [null],
      userId: [null]
    });

    $('.floating').on('focus blur', function (e) {
      $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');

    this.addU = {
      'user_name': '',
      'email': '',
      'company': '',
      'role': '',
      'user_id': 0
    };
    this.uptU = {
      'user_name': '',
      'email': '',
      'company': '',
      'role': '',
      'user_id': 0
    };

    this.getPonds();
  }

  getPonds() {
    this.laService.getUserFarmPonds()
      .subscribe(res => {
        this.rows = res;
        console.log('get user ponds responds >>>', this.rows);
      }, err => {
        console.log('error getting user ponds', err);
      });
  }

  fishPondHealth(data: any) {
    console.log('ctr: myFishPond Health data items ==>', data);
    this.pondsData.pondId = data.pondId;
    this.pondsData.fromDate = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
    this.pondsData.toDate = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');

    this.laService.postUserFishPondHealth(this.pondsData)
      .subscribe(res => {
        this.rows = res;
        console.log(`ctr: myFishPond Health Response: ${JSON.stringify(this.rows)}`);
        this.router.navigate(['clients/profile/details'], { state: this.rows });
      }, err => {
        console.log(`ctr: error posting fishPond health: ${err}`);
      });
  }
  fishPondProductionData(data: any) {
    console.log('ctr: fishPond production data items ==>', data);
    this.pondsData.pondId = data.pondId;
    this.pondsData.fromDate = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
    this.pondsData.toDate = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');

    this.laService.postUserPondProductionData(this.pondsData)
      .subscribe(res => {
        this.rows = res;
        console.log('ctr: fishPond production data response ==>', JSON.stringify(res));
        this.router.navigateByUrl('/clients/profile/details', { state: this.rows });
      }, error => {
        console.log(`ctr: error posting fishPond production data: ${error}`);
      });
  }

  economicIndicator(f: any) {
    console.log('economic indicator items', f);
    console.log('economic indicator items', f.dateFrom.formatted);
    console.log('economic indicator items', f.dateTo.formatted);

    this.laService.calculateEconomicIndicator(f)
      .subscribe( res => {
        this.rows = res;
        console.log('ctr: economic indicator', this.rows);
        $('#economic_indicator').modal('hide');
        this.router.navigateByUrl('/clients/profile/details', { state: this.rows });
      }, error => {
        console.log('ctr: error economic indicator', error);
      });

  }

  addUserPond(f) {
    console.log('add user pond form: ', f.form.value);
    this.laService.postUserPond(f.form.value)
    .subscribe(res => {
      const addPondResponse = res;
      console.log('ctr: fishPond production data response ==>', JSON.stringify(addPondResponse));
      $('#add_pond').modal('hide');
      // alert(JSON.stringify(addPondResponse));
    }, error => {
      console.log(`ctr: error posting fishPond production data: ${error}`);
    });
  }

  addReset() {
    let randomnumber = Math.floor(Math.random() * 300);
    this.addU = { 'user_id': randomnumber };
    $('#add_user').modal('show');
  }

  addUser(f) {
    // console.log(f.form.value);
    if (f.invalid === false) {
      this.rows.unshift(f.form.value);
      this.srch.unshift(f.form.value);
      this.rows = this.rows;
      $('#add_user').modal('hide');
    }
  }

  onEdit(item) {
    this.uptU = item;
    $('#edit_user').modal('show');
  }

  updateUser(f) {
    // console.log(f.form.value);
    if (f.invalid === false) {
      var id = f.form.value.user_id;
      //console.log(id);
      var arr = this.rows.find(function (item, i) {
        return item.user_id === id
      });

      arr.user_id = f.form.value.user_id;
      arr.user_name = f.form.value.user_name;
      arr.email = f.form.value.email;
      arr.company = f.form.value.company;
      arr.role = f.form.value.role;

      var index = this.rows.findIndex(function (item, i) {
        return item.user_id === id
      });

      // console.log(index);
      if (index > -1) {
        this.rows.splice(index, 1);
      }

      this.rows.unshift(arr);
      this.srch.unshift(arr);
      this.rows = this.rows;
      $('#edit_user').modal('hide');
    }
  }

  onDelete(c) {
    // console.log("="+c.user_id+"=");
    var index = this.rows.findIndex(function (item, i) {
      return item.user_id === c.user_id
    });

    // console.log(index);
    if (index > -1) {
      this.rows.splice(index, 1);
      this.srch.splice(index, 1);
    }
    // console.log(this.rows);
    this.rows = this.rows;
  }

}
