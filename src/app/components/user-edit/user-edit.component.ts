import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "src/app/models/user";
import { global } from "../../services/global";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.css"],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public page_title: string;
  public user: User;
  public identity;
  public token;
  public status;
  public afuConfig;
  public url;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService
  ) {
    this.page_title = "Ajustes de usuario";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.url = global.url;

    this.afuConfig = {
      multiple: false,
      formatsAllowed: ".jpg,.png,.gif,.jpeg",
      maxSize: "50",
      uploadAPI: {
        url: this.url + "upload",
        headers: {
          Authorization: this.token
        }
      },
      theme: "attachPin",
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      replaceTexts: {
        selectFileBtn: "Select Files",
        resetBtn: "Reset",
        uploadBtn: "Upload",
        dragNDropBox: "Drag N Drop",
        attachPinBtn: "Sube tu avatar",
        afterUploadMsg_success: "Successfully Uploaded !",
        afterUploadMsg_error: "Upload Failed !"
      }
    };
  }
  avatarUpload(data) {
    //     sudo umount /mnt/c
    // sudo mount -t drvfs C: /mnt/c -o metadata
    let data_obj = JSON.parse(data.response);
    this.user.image = data_obj.user.image;
  }

  ngOnInit() {}

  onSubmit() {
    this._userService.update(this.user).subscribe(
      response => {
        if(!response.user){
          this.status = 'error';
        }else{
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user));
        }
      },
      error => {
        this.status = "error";
        console.log(error);
      }
    );
  }
}
