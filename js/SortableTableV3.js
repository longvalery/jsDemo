import SortableTableV2 from './SortableTableV2.js';
import getData from './getURL.js';
export default class SortableTableV3 extends SortableTableV2 {
  sortOn="server"; 
  source="/rest/products"; //    /dashboard/bestsellers 
  constructor(headerConfig = [], data = []) {
     super(headerConfig, data);
     this.sortOn="server"; 
     this.delta = 30;
     this.start = 1;
     this.end   = 30;
     this.source="/rest/products"; // "/dashboard/bestsellers"; 

                                            }


  changeSource(value){ this.source = value; } 

  changeSorting(value){ this.sortOn = value; } 

  uploadData() {
     if ((this.end - this.data.length) < this.delta)  {
        this.end = this.end + this.delta;
        this.sort(this.fieldValue, this.orderValue);
                                                      }
               } 

  sortOnServer(fieldValue, orderValue) {
//       let url = `https://course-js.javascript.ru/api/dashboard/${this.source}?_sort=${fieldValue}&_order=${orderValue}`;
// &_start=0&_end=30
       let url = `https://course-js.javascript.ru/api${this.source}?_embed=subcategory.category&_sort=${fieldValue}&_order=${orderValue}&_start=${this.start}&_end=${this.end}`;
       let res = getData(url);
       let item = {};
       let line;
       res.then((data) => { 
           this.element.style.overflow = 'hidden';
           this.element.hidden = true;
           this.element.innerHTML = "";
           if (! data.isError) {
              this.data = data.data;
              this.data = this.sortColumn(fieldValue, orderValue);
              line = this.formHeader(fieldValue, orderValue) + this.formTable();
                               }
           else {
              const line = this.formHeader(fieldValue, orderValue);
              this.data = [];
                }
           this.element.innerHTML = line;
           this.createSubElements();
           this.setOnclickHandle(this);
           this.element.hidden = false;
           this.element.style.overflow = '';
           const event = new Event("endLoad");
           document.body.dispatchEvent(event);

                          });
                                       }

  sort(fieldValue, orderValue) {
      let event = new Event("startLoad");
      document.body.dispatchEvent(event);
      this.fieldValue = fieldValue;
      this.orderValue = orderValue;
      if (this.sortOn === "server") { this.sortOnServer(fieldValue, orderValue); }
      else                          { 
                                      this.element.style.overflow = 'hidden';
                                      super.sort(fieldValue, orderValue);  
                                      this.setOnclickHandle(this); 
                                      event = new Event("endLoad");
                                      document.body.dispatchEvent(event);
                                      this.element.style.overflow = '';
                               }
      
      return ; 
                                           }                          

                                                             }

/*
title: 'Карта памяти Kingston microSDHC 16 ГБ [SDC10G2/16GB]',
description: 'Карта памяти Kingston microSDHC 16 Гб может быть использована в различных видах мобильных устройств, 
а с помощью идущего в комплекте адаптера ее можно установить в фотоаппарат или видеокамеру. 
Объема флеш-памяти в 16 ГБ достаточно для хранения не одного часа видео 
в высоком разрешении или тысячи довольно качественных фотографий. 
Имеющие соответствующий порт компьютеры могут напрямую считывать информацию с этой карты, 
помещенной в адаптер и вставленной в разъем. Kingston microSDHC 16 Гб выпускается в основном для расширения 
собственной памяти мобильных устройств, позволяя хранить на них и использовать значительно больше различного мультимедийного контента. 
Большинство планшетных ПК, плееров, смартфонов и телефонов имеют интерфейс для чтения таких карт microSDHC.',
brand: 'Kingston',
quantity: 27,  
subcategory: [Object],
status: 1, 
characteristics: [Array],
images: [Array], 
price: 11,  
rating: 3.9,
discount: 0,
sales:272

  {
    "id": "soska-(pustyshka)-nuk-10729357",
    "title": "Соска (пустышка) NUK 10729357",
    "description": "кольцо; Материал: силикон; Форма: ортодонтическая; Возраст: 0m+; Тип: пустышка",
    "quantity": 20,
    "subcategory": {
      "id": "kormlenie-i-gigiena",
      "title": "Кормление и гигиена",
      "count": 18,
      "category": {
        "id": "detskie-tovary-i-igrushki",
        "title": "Детские товары и игрушки",
        "count": 83,
        "weight": 1
      },
      "weight": 2
    },
    "status": 1,
    "images": [
      {
        "url": "http://magazilla.ru/jpg_zoom1/872403.jpg",
        "source": "872403.jpg"
      },
      {
        "url": "http://mzimg.com/big/y1/f60itzsrly1.jpg",
        "source": "f60itzsrly1.jpg"
      },
      {
        "url": "http://mzimg.com/big/r1/f60iuj3g7r1.jpg",
        "source": "f60iuj3g7r1.jpg"
      },
      {
        "url": "http://mzimg.com/big/11/f60iuorc111.jpg",
        "source": "f60iuorc111.jpg"
      },
      {
        "url": "http://mzimg.com/big/41/f60iur65k41.jpg",
        "source": "f60iur65k41.jpg"
      }
    ],
    "price": 3,
    "discount": 0,
    "sales": 14
  },

*/
