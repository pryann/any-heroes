import { Component, OnInit } from '@angular/core';
import { HeroService } from '../services/hero.service';
import { Hero } from '../interfaces';

@Component({
  selector: 'app-top-heroes',
  templateUrl: './top-heroes.component.html',
  styleUrls: ['./top-heroes.component.css'],
})
export class TopHeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  // better if you use pagination (skip take or something like that)
  getTopHeroes(): void {
    this.heroService
      .fetchHeroes()
      .subscribe((heroes) => (this.heroes = heroes.slice(0, 3)));
  }

  ngOnInit(): void {
    this.getTopHeroes();
  }
}
