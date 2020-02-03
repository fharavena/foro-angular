import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user";
import { global } from "src/app/services/global";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  public page_title: string;
  public users: User[];
  public url: string;

  constructor(private _userService: UserService) {
    this.page_title = "Compañeros";
    this.url = global.url;
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this._userService.getUsers().subscribe(
      response => {
        if (response.users) {
          this.users = response.users;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
