// Importar los modulos del router
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Importar componentes
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { TopicsComponent } from "./components/topics/topics.component";


// Array de rutas
const appRoutes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "inicio", component: HomeComponent },
  { path: "registro", component: RegisterComponent },
  { path: "ajustes", component: UserEditComponent },
  { path: "temas", component: TopicsComponent },
  { path: "temas/:page", component: TopicsComponent },
  { path: "**", component: LoginComponent }
];

// Exportar configuracion
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
