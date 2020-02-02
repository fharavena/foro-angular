import { Component, OnInit } from "@angular/core";
import { TopicService } from "src/app/services/topic.service";

import { Topic } from "src/app/models/topic";
import { Comments } from "src/app/models/comment";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { CommentService } from "src/app/services/comment.service";
import { global } from "src/app/services/global";

@Component({
  selector: "app-topic-detail",
  templateUrl: "./topic-detail.component.html",
  styleUrls: ["./topic-detail.component.css"],
  providers: [TopicService, UserService, CommentService]
})
export class TopicDetailComponent implements OnInit {
  public topic: Topic;
  public comment: Comments;
  public identity;
  public token;
  public status;
  public url;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService,
    private _userService: UserService,
    private _commentService: CommentService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.comment = new Comments("", "", "", this.identity._id);
    this.url = global.url;
  }

  ngOnInit() {
    this.getTopic();
  }

  getTopic() {
    this._route.params.subscribe(params => {
      let id = params["id"];
      this._topicService.getTopic(id).subscribe(
        response => {
          if (response.topic) {
            this.topic = response.topic;
            this.topic.comments.forEach(element => {
              console.log(element.user.name);
            });
          } else {
            this._router.navigate(["/inicio"]);
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  onSubmit(form) {
    this._commentService
      .add(this.token, this.comment, this.topic._id)
      .subscribe(
        response => {
          if (!response.topic) {
            this.status = "error";
          } else {
            this.status = "success";
            this.topic = response.topic;

            form.reset();
          }
        },
        error => {
          this.status = "error";
          console.log(error);
        }
      );
  }

  deleteComment(id) {
    
    this._commentService
      .delete(this.token, this.topic._id, id)
      .subscribe(
        response => {
          if (!response.topic) {
            this.status = "error";
          } else {
            this.status = "success";
            this.topic = response.topic;
          }
        },
        error => {
          this.status = "error";
          console.log(error);
        }
      );
  }
}
