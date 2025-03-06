import { Component, OnInit } from '@angular/core';
import { Hero } from '../interfaces';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  fetchHeroes(): void {
    this.heroService
      .fetchHeroes()
      .subscribe((heroes) => (this.heroes = heroes));
  }

  generateId(): string {
    return this.heroes.length > 0
      ? String(
          Math.max(...this.heroes.map((hero) => parseInt(hero.id, 10))) + 1
        )
      : '1';
  }

  add(heroName: string, heroForm: HTMLFormElement): void {
    const name = heroName.trim();
    if (name) {
      const id = this.generateId();
      this.heroService.createHero({ id, name } as Hero).subscribe((hero) => {
        this.heroes.push(hero);
        heroForm.reset();
      });
    }
  }

  deleteHero(id: string): void {
    this.heroService.deleteHero(id).subscribe(() => {
      this.heroes = this.heroes.filter((hero) => hero.id !== id);
    });
  }

  ngOnInit(): void {
    this.fetchHeroes();
  }
}
