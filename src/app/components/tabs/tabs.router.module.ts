import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'nav',
    component: TabsPage,
    children: [
      {
        path: 'homework',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../pages/home-work/home-work.module').then(m => m.HomeWorkPageModule)
          }
        ]
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../pages/home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'newhomework',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../pages/new-home-work/new-home-work.module').then(m => m.NewHomeWorkPageModule)
          }
        ]
      },
      {
        path: 'planning',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../pages/planning/planning.module').then(m => m.PlanningPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/homelogin',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/homelogin',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
