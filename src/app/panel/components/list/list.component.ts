import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Topic } from "src/app/models/topic";
import { UserService } from "src/app/services/user.service";
import { TopicService } from "src/app/services/topic.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
  providers: [UserService, TopicService]
})
export class ListComponent implements OnInit {
  public page_title: string;
  public topics: Array<Topic>;
  public identity;
  public token;
  public status;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService: TopicService
  ) {
    this.page_title = "Mis temas";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getTopic();
  }

  getTopic() {
    var userId = this.identity._id;
    this._topicService.getMyTopics(userId).subscribe(
      response => {
        if (response.topics) {
          this.topics = response.topics;                
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
