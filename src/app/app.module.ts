import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { routing, appRoutingProviders } from "./app.routing";
import { AngularFileUploaderModule } from "angular-file-uploader";
import { MomentModule } from "angular2-moment";
import { NgxHighlightJsModule } from "@nowzoo/ngx-highlight-js";

import { AppComponent } from "./app.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { FormsModule } from "@angular/forms";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { PanelModule } from "./panel/panel.module";
import { TopicsComponent } from "./components/topics/topics.component";
import { TopicDetailComponent } from "./components/topic-detail/topic-detail.component";

import { UserService } from "./services/user.service";
import { UserGuard } from "./services/user.guard";
import { NoIdentityGuard } from './services/no.identity.guard';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserEditComponent,
    TopicsComponent,
    TopicDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    AngularFileUploaderModule,
    PanelModule,
    MomentModule,
    NgxHighlightJsModule.forRoot()
  ],
  providers: [appRoutingProviders, UserGuard, UserService, NoIdentityGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
