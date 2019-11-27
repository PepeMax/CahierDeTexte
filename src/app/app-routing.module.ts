import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/auth/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'planning', loadChildren: './pages/planning/planning.module#PlanningPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'slides', loadChildren: './pages/slides/slides.module#SlidesPageModule' },
  { path: 'homelogin', loadChildren: './pages/homelogin/homelogin.module#HomeloginPageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

