import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public profile: any = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.authService.getUserProfile()
      .subscribe(res => {
        this.profile = res;
        console.log('get user profile >>>', this.profile);
      }, err => {
        console.log('user profile error: ', err);
      });
  }
}
