import {Component, HostListener} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  /*name, phone, car - это значения атрибута -> 'formControlName`, присвоенные элементам input*/
  priceForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    car: ['', Validators.required]
  })

  /* Значения этих данных могут меняться. То есть администратор может их менять
  * через web admin, и эти значения через переменные будут подставляться на странице,
  *  в карточке товара.*/
  carsData = [
    {
      image: "1-Lamborghini-Huracan-Spyder.png",
      /*подпись карточки товара с картинкой*/
      name: "Lamborghini Huracan Spyder",
      gear: "Полный", /*какой тип привода машины*/
      engine: 5.2, /*объем двигателя*/
      places: 2 /*количество мест в автомобиле*/
    },
    {
      image: "2-Chevrolet-Corvette.png",
      /*подпись карточки товара с картинкой*/
      name: "Chevrolet Corvette",
      gear: "Полный", /*какой тип привода машины*/
      engine: 6.2, /*объем двигателя*/
      places: 2 /*количество мест в автомобиле*/
    },
    {
      image: "3-Ferrari-California.png",
      /*подпись карточки товара с картинкой*/
      name: "Ferrari California",
      gear: "Полный", /*какой тип привода машины*/
      engine: 3.9, /*объем двигателя*/
      places: 4 /*количество мест в автомобиле*/
    },
    {
      image: "4-Lamborghini-Urus.png",
      /*подпись карточки товара с картинкой*/
      name: "Lamborghini Urus",
      gear: "Полный", /*какой тип привода машины*/
      engine: 4.0, /*объем двигателя*/
      places: 5 /*количество мест в автомобиле*/
    },
    {
      image: "5-Audi-R8.png",
      /*подпись карточки товара с картинкой*/
      name: "Audi R8",
      gear: "Полный", /*какой тип привода машины*/
      engine: 5.2, /*объем двигателя*/
      places: 2 /*количество мест в автомобиле*/
    },
    {
      image: "6-Chevrolet-Camaro.png",
      /*подпись карточки товара с картинкой*/
      name: "Chevrolet Camaro",
      gear: "Полный", /*какой тип привода машины*/
      engine: 2.0, /*объем двигателя*/
      places: 4 /*количество мест в автомобиле*/
    },
    {
      image: "7-Maserati-Quattroporte.png",
      /*подпись карточки товара с картинкой*/
      name: "Maserati Quattroporte",
      gear: "Полный", /*какой тип привода машины*/
      engine: 3.0, /*объем двигателя*/
      places: 5 /*количество мест в автомобиле*/
    }
  ]

  constructor(private fb: FormBuilder) {
  }


  /*Плавное перемещение к секции ввода данных,
   при нажатии на кнопку Забронировать, и  заполнение карточки названием
   автомобиля'*/
  goScroll(target: HTMLElement, car?: any) {
    target.scrollIntoView({behavior: "smooth"});
    if (car) {
      this.priceForm.patchValue({car: car.name});
    }
  }

  trans: any;
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.trans = {transform: 'translate3d(' + ((e.clientX * 0.3) / 8) + 'px,' + ((e.clientY * 0.3) / 8) + 'px,0px)'};
  }

  bgPos: any;
  @HostListener('document:scroll', ['$event'])
  onScroll() {
    this.bgPos = {backgroundPositionX: '0' + (0.3 * window.scrollY) + 'px'};
  }

  /*Обработчик отправки формы с заполненными значениями*/
  onSubmit() {
    if (this.priceForm.valid) {
      alert("Спасибо за заказ, мы свяжемся с вами!")
      this.priceForm.reset();
    }
  }
}
