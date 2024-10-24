export default class RangeDatePicker {
  element;
  id_element;

  date_from;
  date_last_day;
  date_first_day;
  date_to;
  date_finish;
  
  date_start_between;
  date_end_between;

  constructor(date) {
      this.id_element = "idRangeDatePicker" + Date.now();
      this.setDates(date);
      console.log(this.getWeekDay(this.date_from));
      this.element = this.createTemplate();
      document.body.append(this.element);
      this.setListeners();
                    }


  getWeekDay(date){
     const weekdays = ['SUN', 'MON', 'THU', 'WED', 'THU', 'FRI', 'SAT'];
     const day = date.toString().split(" ")[0].toUpperCase();
     return weekdays.indexOf(day);
                  }

   setDates(date){
      
      this.date_to   = new Date(date);
//      console.log(this.date_to.toLocaleString('ru-RU')); //'en-GB'); //'ru-RU'

      this.date_from = new Date(date);
      this.date_from.setDate(1);
      this.date_from.setMonth(this.date_from.getMonth() - 1);

      this.date_first_day = new Date(date);
      this.date_first_day.setDate(1);

      this.date_finish = new Date(this.date_to.getFullYear(), this.date_to.getMonth() + 1, 0);

      this.date_last_day = new Date(this.date_from.getFullYear(), this.date_from.getMonth() + 1, 0);

      console.log(date);
      console.log(this.date_from);
      console.log(this.date_last_day);
      console.log(this.date_first_day);
      console.log(this.date_to);
      console.log(this.date_finish)

                 }


  moveLeft(event){
     event.stopPropagation();
     console.log("moveLeft");
                 }


  moveRight(event){
     event.stopPropagation();
     console.log("moveRight");
                  }

  dateClick(event){
     event.stopPropagation();
     console.log(this);
             }
 
  createTemplate() {
      const div = document.createElement('div');
      div.setAttribute("id", this.id_element);
      div.className = "rangepicker";
      div.innerHTML = this.createBody();
      return div;
    }

  toggleElement(){
      this.classList.toggle("rangepicker_open"); 
                 };

  setListeners(){
      let item;
      let items;
      this.element.addEventListener("click", this.toggleElement);
      item = this.element.querySelector(".rangepicker__selector-control-left");
      item.addEventListener("click", this.moveLeft);
      item = this.element.querySelector(".rangepicker__selector-control-right");
      item.addEventListener("click", this.moveRight);
      items = this.element.querySelectorAll(".rangepicker__cell"); 
      for (let i=0; i < items.length ; i++) { items[i].addEventListener("click", this.dateClick); }
                }  

  removeListeners(){
     let item;
     this.element.removeEventListener("click", this.toggleElement);    
     item = this.element.querySelector(".rangepicker__selector-control-left");
     item.removeEventListener("click", this.moveLeft);
     item = this.element.querySelector(".rangepicker__selector-control-right");
     item.removeEventListener("click", this.moveRight);
                   }  


  iterateDateRange(start_date, end_date){
     const stop_date = new Date(end_date.toISOString().split('T')[0]); 
     stop_date.setDate(stop_date.getDate() + 1);
     let current = new Date(start_date.toISOString().split('T')[0]);
     let result = "";
     while (current <= stop_date) {
           //console.log(current.toISOString().split('T')[0]);
           result = result + this.createDateButton(current);
           current.setDate(current.getDate() + 1);

                                  }
     return result;
                                        }

  createDateButton(date) {
     const full_date = date.toISOString();
     const day = date.getDate();
     let style = "";
     if (day == 1) {
        const weekday = this.getWeekDay(date);
        style = `style="--start-from: ${weekday}"  `;
                   }
     return `<button type="button" class="rangepicker__cell" data-value="${full_date} ${style}">${day}</button>`;
                         }

  createBody() {
     const first_month  = this.iterateDateRange(this.date_from, this.date_last_day);
     const second_month = this.iterateDateRange(this.date_first_day, this.date_finish);

    return `
      <div class="rangepicker__input" data-elem="input">
        <span data-elem="from">23.02.2024</span> - <span data-elem="to">24.03.2024</span>
      </div>
      <div class="rangepicker__selector" data-elem="selector">
       <div class="rangepicker__selector-arrow"></div>
       <div class="rangepicker__selector-control-left"></div>
       <div class="rangepicker__selector-control-right"></div>
       <div class="rangepicker__calendar">
         <div class="rangepicker__month-indicator"><time datetime="февраль">февраль</time> </div>
         <div class="rangepicker__day-of-week">
           <div>Пн</div><div>Вт</div><div>Ср</div><div>Чт</div><div>Пт</div><div>Сб</div><div>Вс</div>
         </div>
         <div class="rangepicker__date-grid">
           <button type="button" class="rangepicker__cell" data-value="2024-02-01T09:54:38.390Z" style="--start-from: 4">1</button>
           <button type="button" class="rangepicker__cell" data-value="2024-02-02T09:54:38.390Z">2</button>
           <button type="button" class="rangepicker__cell" data-value="2024-02-03T09:54:38.390Z">3</button>
           <button type="button" class="rangepicker__cell" data-value="2024-02-04T09:54:38.390Z">4</button>
           <button type="button" class="rangepicker__cell" data-value="2024-02-05T09:54:38.390Z">5</button>
           <button type="button" class="rangepicker__cell" data-value="2024-02-06T09:54:38.390Z">6</button>
           <button type="button" class="rangepicker__cell" data-value="2024-02-07T09:54:38.390Z">7</button>
           <button type="button" class="rangepicker__cell" data-value="2024-02-08T09:54:38.390Z">8</button>
           <button type="button" class="rangepicker__cell" data-value="2024-02-09T09:54:38.390Z">9</button>
           <button type="button" class="rangepicker__cell" data-value="2024-02-10T09:54:38.390Z">10</button>
           <button type="button" class="rangepicker__cell" data-value="2024-02-11T09:54:38.390Z">11</button>
           <button type="button" class="rangepicker__cell" data-value="2024-02-12T09:54:38.390Z">12</button>
           <button type="button" class="rangepicker__cell" data-value="2024-02-13T09:54:38.390Z">13</button>
           <button type="button" class="rangepicker__cell" data-value="2024-02-14T09:54:38.390Z">14</button>
           <button type="button" class="rangepicker__cell" data-value="2024-02-15T09:54:38.390Z">15</button>
           <button type="button" class="rangepicker__cell" data-value="2024-02-16T09:54:38.390Z">16</button>
           <button type="button" class="rangepicker__cell" data-value="2024-02-17T09:54:38.390Z">17</button>
           <button type="button" class="rangepicker__cell" data-value="2024-02-18T09:54:38.390Z">18</button>
           <button type="button" class="rangepicker__cell" data-value="2024-02-19T09:54:38.390Z">19</button>
           <button type="button" class="rangepicker__cell" data-value="2024-02-20T09:54:38.390Z">20</button>
           <button type="button" class="rangepicker__cell" data-value="2024-02-21T09:54:38.390Z">21</button>
           <button type="button" class="rangepicker__cell" data-value="2024-02-22T09:54:38.390Z">22</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-from" data-value="2024-02-23T09:54:38.390Z">23</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-02-24T09:54:38.390Z">24</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-02-25T09:54:38.390Z">25</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-02-26T09:54:38.390Z">26</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-02-27T09:54:38.390Z">27</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-02-28T09:54:38.390Z">28</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-02-29T09:54:38.390Z">29</button>
         </div>
       </div>
       <div class="rangepicker__calendar">
         <div class="rangepicker__month-indicator"><time datetime="март">март</time></div>
         <div class="rangepicker__day-of-week">
            <div>Пн</div><div>Вт</div><div>Ср</div><div>Чт</div><div>Пт</div><div>Сб</div><div>Вс</div>
         </div>
         <div class="rangepicker__date-grid">
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-03-01T09:54:38.390Z" style="--start-from: 5">1</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-03-02T09:54:38.390Z">2</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-03-03T09:54:38.390Z">3</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-03-04T09:54:38.390Z">4</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-03-05T09:54:38.390Z">5</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-03-06T09:54:38.390Z">6</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-03-07T09:54:38.390Z">7</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-03-08T09:54:38.390Z">8</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-03-09T09:54:38.390Z">9</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-03-10T09:54:38.390Z">10</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-03-11T09:54:38.390Z">11</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-03-12T09:54:38.390Z">12</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-03-13T09:54:38.390Z">13</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-03-14T09:54:38.390Z">14</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-03-15T09:54:38.390Z">15</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-03-16T09:54:38.390Z">16</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-03-17T09:54:38.390Z">17</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-03-18T09:54:38.390Z">18</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-03-19T09:54:38.390Z">19</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-03-20T09:54:38.390Z">20</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-03-21T09:54:38.390Z">21</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-03-22T09:54:38.390Z">22</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-between" data-value="2024-03-23T09:54:38.390Z">23</button>
           <button type="button" class="rangepicker__cell rangepicker__selected-to" data-value="2024-03-24T09:54:38.390Z">24</button>
           <button type="button" class="rangepicker__cell" data-value="2024-03-25T09:54:38.390Z">25</button>
           <button type="button" class="rangepicker__cell" data-value="2024-03-26T09:54:38.390Z">26</button>
           <button type="button" class="rangepicker__cell" data-value="2024-03-27T09:54:38.390Z">27</button>
           <button type="button" class="rangepicker__cell" data-value="2024-03-28T09:54:38.390Z">28</button>
           <button type="button" class="rangepicker__cell" data-value="2024-03-29T09:54:38.390Z">29</button>
           <button type="button" class="rangepicker__cell" data-value="2024-03-30T09:54:38.390Z">30</button>
           <button type="button" class="rangepicker__cell" data-value="2024-03-31T09:54:38.390Z">31</button>
         </div>
        </div>
      </div>
    `;
  }

                                     } 
