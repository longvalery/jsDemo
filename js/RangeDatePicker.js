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
  weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  months = ['январь', 'февраль', "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];

  constructor(date) {
      this.id_element = "idRangeDatePicker" + Date.now();
      this.setDates(date);
      this.element = this.createTemplate();
      document.body.append(this.element);
      this.createListener();
      this.setListeners();
                    }


  createListener() {
      this.toggleElement = (event) => {
          event.stopPropagation();
          this.element.classList.toggle("rangepicker_open"); 
          if (! this.element.classList.contains("rangepicker_open")) {
             if (this.date_start_between != null && this.date_end_between != null) {
                const strDateStart = this.date_start_between.toLocaleString('ru-RU').split(',', 1)[0];
                const strDateEnd   = this.date_end_between.toLocaleString('ru-RU').split(',', 1)[0];
                const newEvent = new Event("needLoad");
                newEvent.strDateStart = strDateStart;
                newEvent.strDateEnd   = strDateEnd;
                document.body.dispatchEvent(newEvent);
//         this.element.innerHTML = this.createBody(); 
                                                                                   }
                                                                    }
                                    };
     this.moveLeft = (event) => {
     event.stopPropagation();
     const date = new Date(this.date_first_day.toISOString().split('T')[0]);
     date.setMonth(this.date_first_day.getMonth() - 1);
     this.setDates(date.toISOString().split('T')[0]);
     this.date_start_between = null;
     this.date_end_between = null;
     this.render();
                                }

     this.moveRight = (event) => {
     event.stopPropagation();
     const date = new Date(this.date_first_day.toISOString().split('T')[0]);
     date.setMonth(this.date_first_day.getMonth() + 1);
     this.setDates(date.toISOString().split('T')[0]);
     this.date_start_between = null;
     this.date_end_between = null;
     this.render();
                                  }

     this.dateClick= (event) => {
         event.stopPropagation();
         let date; 
         const label_from = this.element.querySelector("[data-elem='from']"); 
         const label_to = this.element.querySelector("[data-elem='to']"); 

         if (this.date_start_between == null && this.date_end_between == null) {
            this.date_start_between = new Date(event.target.dataset.value);
                                                                               }
         else {
             if (this.date_start_between != null && this.date_end_between != null) {
                this.date_start_between = new Date(event.target.dataset.value);
                this.date_end_between = null;
                                                                                   }
             else {
                date = new Date(event.target.dataset.value);
                if (date < this.date_start_between) {
                    this.date_end_between = this.date_start_between;
                    this.date_start_between = date;
                                                     }
                else { this.date_end_between = date}
                  }
               }

         if (this.date_start_between != null) { label_from.innerText = this.date_start_between.toLocaleString('ru-RU').split(',', 1)[0]; }
         if (this.date_end_between != null) { label_to.innerText =  this.date_end_between.toLocaleString('ru-RU').split(',', 1)[0]; }
         this.setColorsForDates();
         if (this.date_start_between != null && this.date_end_between != null) {this.toggleElement(event);}
                                }

                   }

  getWeekDay(date){
     const day = date.toString().split(" ")[0].toUpperCase();
     return this.weekdays.indexOf(day);
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

      this.date_start_between = null;
      this.date_end_between = null;

/*
      console.log("date", date);
      console.log("this.date_from", this.date_from);
      console.log("this.date_last_day", this.date_last_day);
      console.log("this.date_first_day", this.date_first_day);
      console.log("this.date_to", this.date_to);
      console.log("this.date_finish", this.date_finish)
*/

                 }





  setColorsForDates() {
     let date_start_between = "";
     let date_end_between = "";
     let between = false;
     const is_range = (this.date_start_between != null && this.date_end_between != null);
     const items = this.element.querySelectorAll(".rangepicker__cell"); 
     if (this.date_start_between != null) {
        date_start_between = this.date_start_between.toISOString();
                                          }
     if (this.date_end_between != null) {
        date_end_between = this.date_end_between.toISOString();
                                        }

     for (let i=0; i < items.length ; i++) { 
         items[i].classList.remove("rangepicker__selected-between"); 
         items[i].classList.remove("rangepicker__selected-from");
         items[i].classList.remove("rangepicker__selected-to");
         if (items[i].dataset.value == date_end_between) { items[i].classList.add("rangepicker__selected-to"); between = false; }
         if (between && is_range) {items[i].classList.add("rangepicker__selected-between");}
         if (items[i].dataset.value == date_start_between) { items[i].classList.add("rangepicker__selected-from"); between = true;}
                                           }
                      }

 
  createTemplate() {
      const div = document.createElement('div');
      div.setAttribute("id", this.id_element);
      div.className = "rangepicker";
      div.innerHTML = this.createBody();
      return div;
    }


  render(){
      this.removeListeners();
      this.element.innerHTML = this.createBody(); 
      this.setListeners();
          }

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
      let items;
      this.element.removeEventListener("click", this.toggleElement);    
      item = this.element.querySelector(".rangepicker__selector-control-left");
      item.removeEventListener("click", this.moveLeft);
      item = this.element.querySelector(".rangepicker__selector-control-right");
      item.removeEventListener("click", this.moveRight);
      items = this.element.querySelectorAll(".rangepicker__cell"); 
      for (let i=0; i < items.length ; i++) { items[i].removeEventListener("click", this.dateClick); }
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
     return `<button type="button" class="rangepicker__cell" data-value="${full_date}" ${style}>${day}</button>`;
                         }

  createBody() {
     const first_month  = this.iterateDateRange(this.date_from, this.date_last_day);
     const second_month = this.iterateDateRange(this.date_first_day, this.date_finish);
     const month1 = this.months[this.date_from.getMonth()];
     const month2 = this.months[this.date_first_day.getMonth()];
     const year1 = this.date_from.getFullYear();
     const year2 = this.date_first_day.getFullYear();
     let date_start_between = this.date_to.toLocaleString('ru-RU').split(',', 1)[0];
     let date_end_between   = this.date_to.toLocaleString('ru-RU').split(',', 1)[0];
     if (this.date_start_between != null) {date_start_between = this.date_start_between.toLocaleString('ru-RU').split(',', 1)[0];}
     if (this.date_end_between != null) {date_end_between = this.date_end_between.toLocaleString('ru-RU').split(',', 1)[0];}
    return `
      <div class="rangepicker__input" data-elem="input">
        <span data-elem="from">${date_start_between}</span> - <span data-elem="to">${date_end_between}</span>
      </div>
      <div class="rangepicker__selector" data-elem="selector">
       <div class="rangepicker__selector-arrow"></div>
       <div class="rangepicker__selector-control-left" data-parentID="${this.id_element}"></div>
       <div class="rangepicker__selector-control-right" data-parentID="${this.id_element}"></div>
       <div class="rangepicker__calendar">
         <div class="rangepicker__month-indicator"><time datetime="${month1}">${month1} ${year1}</time> </div>
         <div class="rangepicker__day-of-week">
           <div>Пн</div><div>Вт</div><div>Ср</div><div>Чт</div><div>Пт</div><div>Сб</div><div>Вс</div>
         </div>
         <div class="rangepicker__date-grid">${first_month}</div>
       </div>
       <div class="rangepicker__calendar">
         <div class="rangepicker__month-indicator"><time datetime="${month2}">${month2} ${year2}</time></div>
         <div class="rangepicker__day-of-week">
            <div>Пн</div><div>Вт</div><div>Ср</div><div>Чт</div><div>Пт</div><div>Сб</div><div>Вс</div>
         </div>
         <div class="rangepicker__date-grid">${second_month}
         </div>
        </div>
      </div>
    `;
  }

                                     } 
