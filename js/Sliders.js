
export default class DoubleSlider {
    constructor(min,max,text) {
        this.min  = min;
        this.max  = max;
        this.text = text;
        this.range_slider_down = false;
        this.id              = "Double_slider_"       + Date.now();
        this.id_slider       = "slider_Container_"    + Date.now();
        this.id_slider_body  = "slider_body_"         + Date.now();
        this.id_title_min    = "slider_title_min_"    + Date.now();
        this.id_title_max    = "slider_title_max_"    + Date.now();
        this.id_title_text   = "slider_title_text_"   + Date.now();
        this.id_slider_range = "slider_range_"        + Date.now();
        this.id_dot_left     = "slider_dot_left_"     + Date.now(); 
        this.id_dot_right    = "slider_dot_right_"    + Date.now();
        this.id_slider_progress = "slider_progress_"  + Date.now(); 

        this.element = this.createTemplate();
        document.body.append(this.element);

        this.titleMin    = document.getElementById(this.id_title_min);
        this.titleMax    = document.getElementById(this.id_title_max);

        this.dotLeft     = document.getElementById(this.id_dot_left);
        this.dotLeft.parent = this;
        this.dotRight    = document.getElementById(this.id_dot_right);
        this.dotRight.parent = this;

        this.slider_progress    = document.getElementById(this.id_slider_progress);

        this.sliderRange = document.getElementById(this.id_slider_range);
        this.sliderBody = document.getElementById(this.id_slider_body);
        this.slider = document.getElementById(this.id_slider);
        this.text = document.getElementById(this.id_title_text);      

        this.left  = this.dotLeft.getBoundingClientRect().x;
        this.right = this.dotRight.getBoundingClientRect().x;
        this.valueRight = this.right; 
        this.valueLeft  = this.left; 

        this.createListeners();
                             }

    sendEvent(from,to,text) {
        const event = new Event("overloadData");
        const data = {from : from, to : to, text : text};
        event.dataForOverload = data;
        document.body.dispatchEvent(event);
                             }

    handlerMouseUP(event){
        if (this.range_slider_down) {
            this.range_slider_down = false;
            this.sendEvent(this.titleMin.innerText, this.titleMax.innerText, this.text.innerText);
                                    }
        event.stopPropagation();
                         } 

    handlerMouseMove(event){
        if (this.range_slider_down) { 
           if (this.slider_type == "left") { this.setLeftValue(event); }
           else                            { this.setRightValue(event); }
                                    }
        event.stopPropagation();
                           } 

    handlerResize(event){
        const valueRight = this.valueRight / (this.right - this.left); 
        const valueLeft  = this.valueLeft  / (this.right - this.left);
        this.left        = this.sliderRange.getBoundingClientRect().left;
        this.right       = this.sliderRange.getBoundingClientRect().right;
        this.valueRight  = valueRight * (this.right - this.left); 
        this.valueLeft   = valueLeft  * (this.right - this.left);
        this.dotLeft.left=this.valueLeft;
        this.dotRight.left=this.valueRight;
                        } 


    createListeners() {
      //const jThis = this;
      this.dotLeft.addEventListener('mousedown', (event) => { event.target.parent.range_slider_down = true; event.target.parent.slider_type = "left"; event.stopPropagation(); });
      document.body.addEventListener('mouseup', this.handlerMouseUP.bind(this));  
      document.body.addEventListener('mousemove', this.handlerMouseMove.bind(this)); 
      this.dotRight.addEventListener('mousedown', (event) => { event.target.parent.range_slider_down = true;  event.target.parent.slider_type = "right"; event.stopPropagation();});
      window.addEventListener('resize', this.handlerResize.bind(this));  
                      }
 
    createTemplate() {
        const div = document.createElement('form');
        div.setAttribute("id", "doubleSlider" + Date.now());
        const bodyText = `
        <span class="form-group" data-elem="sliderContainer" id ="${this.id_slider}">
            <label class="form-label"  id="${this.id_title_text}">${this.text}</label>
            <div class="range-slider" id="${this.id_slider_body}">
            <span data-elem="from" id="${this.id_title_min}">${this.min}</span>
            <div data-elem="inner" class="range-slider__inner" id="${this.id_slider_range}">
                <span id="${this.id_slider_progress}" data-elem="progress" class="range-slider__progress" style="left: 0%; right: 0%;"></span>
                <span id="${this.id_dot_left}" data-elem="thumbLeft" class="range-slider__thumb-left" style="left: 0%;"></span>
                <span id="${this.id_dot_right}" data-elem="thumbRight" class="range-slider__thumb-right" style="right: 0%;"></span>
            </div>
            <span data-elem="to" id="${this.id_title_max}">${this.max}</span>
        </div>
      </span>`;
      div.innerHTML = bodyText ;
      return div;
                     }

    setLeftValue(event) {
        const left  =  Math.max(Math.min(event.clientX, this.valueRight), this.left);
        this.valueLeft = left;
        const percent =  Math.round((left - this.left) / (this.right - this.left) * 100);
        this.dotLeft.style.left = percent + "%";
        this.slider_progress.style.left = percent + "%"; 
        this.titleMin.innerText = Math.round((this.max - this.min) * percent / 100.0); 
                        }          

    setRightValue(event) {
        const right =  Math.min(Math.max(event.clientX, this.valueLeft), this.right);
        this.valueRight = right;
        const percent =  Math.ceil((this.right - right) / (this.right - this.left) * 100);
        this.dotRight.style.right = percent + "%";
        this.slider_progress.style.right = percent + "%"; 
        this.titleMax.innerText = Math.round((this.max - this.min) * (100 - percent) / 100.0); 
                         }          
                                            
                                  } 