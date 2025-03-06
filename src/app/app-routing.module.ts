import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { TopHeroesComponent } from './top-heroes/top-heroes.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/heroes',
    pathMatch: 'full',
  },
  {
    path: 'heroes',
    component: HeroComponent,
  },
  {
    path: 'hero-detail/:id',
    component: HeroDetailComponent,
  },
  {
    path: 'top-heroes',
    component: TopHeroesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
