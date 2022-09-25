import {Component, HostListener} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AppService} from "./app.service";

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
  *  в карточке товара.
  * Данные будут поставлять из backend*/
  carsData: any;

  constructor(private fb: FormBuilder, private appService: AppService) {
  }

/*инициализация данных продуктов, в момент открытия страницы. Также будут загружены и фото продуктов*/
ngOnInit(){
  this.appService.getData(this.category).subscribe(carsData => this.carsData = carsData);
}

  category: string = 'sport';

  toggleCategory(category: string) {
    this.category = category;
    this.ngOnInit();
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

    this.appService.sendQuery(this.priceForm.value)
      .subscribe(
        /*эта функция сработает в случае успешной валидации*/
        {
          next: (response: any) => {
             alert(response.message); /*сообщение будет выдавать сервер*/
             this.priceForm.reset(); /*после успешного ответа, данные формы будут очищены*/
          },
          /*эта функция сработает в случае если форма заполнена плохо*/
          error: (response) => {
            alert(response.error.message)
          }
        }
      );
  }
}
