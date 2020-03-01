import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { LivingAquariumService } from '../services/living-aquarium.service';
import {IMyDpOptions} from 'mydatepicker';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public rows = [];
  public srch = [];

  public addU: any = {};
  public uptU: any = [];

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
  isHidden: boolean = true;
  ecoDataForm: FormGroup;
  dateFrom: '';
  dateTo = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: AppService,
    private laService: LivingAquariumService
  ) {
    // this.rows = userService.fistPondRegisteredUsers;
    this.srch = [...this.rows];
  }

  ngOnInit() {
    this.ecoDataForm = this.formBuilder.group({
      dateFrom: [null],
      dateTo: [null],
      userId: [null]
    });

    $('.floating').on('focus blur', function(e) {
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
    this.ecoData = {
      dateFrom: '',
      dateTo: '',
      userId: ''
    };
    this.getAllRegisteredFishPondUsers();
  }

  getAllRegisteredFishPondUsers() {
    this.laService.getAllRegisterUser()
      .subscribe(res => {
        this.rows = res;
        console.log('ctrl: all registered users response =>' + this.rows);
      },
        error => {
          console.log('ctrl: error all registered users: ', error);
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

 onFormSubmit(form: NgForm) {
  console.log('ecoData form ===>', form);
  // console.log('ecoData form ===>', form.dateFrom.formatted);
  // console.log('ecoData form ===>', form.dateFrom.formatted);
  console.log('ecoData form ===>', form);


  // $('#economic_indicator').modal('hide');
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
      // console.log(id);
      var arr = this.rows.find(function (item, i) {
        return item.user_id === id;
      });

      arr.user_id = f.form.value.user_id;
      arr.user_name = f.form.value.user_name;
      arr.email = f.form.value.email;
      arr.company = f.form.value.company;
      arr.role = f.form.value.role;

      var index = this.rows.findIndex(function (item, i) {
        return item.user_id === id;
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
