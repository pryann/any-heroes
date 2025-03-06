import { Component, OnInit } from '@angular/core';
import { Hero } from '../interfaces';
import { HeroService } from '../services/hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  hero?: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.heroService
      .findHero(id as string)
      .subscribe((hero) => (this.hero = hero));
  }

  goBack(): void {
    this.location.back();
  }

  saveHero(): void {
    if (this.hero && this.hero.name.trim()) {
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }

  ngOnInit(): void {
    this.getHero();
  }
}
