import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UserService } from '@user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /** The current User */
  user: Observable<any>;
  /** Navbar options when User is not logged in */
  defaultOpts = [
    { link: "/login", text: 'Login' },
    { link: "/register", text: 'Register' }
  ];

  constructor(
    private userService: UserService
  ) {
    this.user = new Observable<any>(undefined);
  }

  ngOnInit() {
    this.user = this.userService.user;
  }

}
