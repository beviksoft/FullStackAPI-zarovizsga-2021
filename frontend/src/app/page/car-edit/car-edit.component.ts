import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Car } from 'src/app/model/car';
import { CarService } from 'src/app/service/car.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.scss']
})
export class CarEditComponent implements OnInit {

  car$: Observable<Car> = this.ar.params.pipe(
    switchMap(params => this.carService.get(params.id))
  );

  constructor(
    private carService: CarService,
    private router: Router,
    private ar: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  onSave(ngForm: NgForm): void {
    this.carService.update(ngForm.value).subscribe(
      car$ => this.router.navigate(['/', 'cars']),
      err => console.error(err)
    );
  }

}
