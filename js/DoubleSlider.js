export default class DoubleSlider {
    constructor(min,max,text) {
        this.min  = min;
        this.max  = max;
        this.text = text;
        this.valueLeft  = ((max + min) / 2) - 1; 
        this.valueRight = ((max + min) / 2) + 1; 
        const id_title_min    = "title_min"    + Date.now();
        const id_title_max    = "title_max"    + Date.now();
        const id_title_text   = "title_text"   + Date.now();
        const id_slider_range = "slider_range" + Date.now();
        const id_dot_left     = "dot_left"     + Date.now(); 
        const id_dot_right    = "dot_right"    + Date.now();
        const id_input_left   = "input_left"   + Date.now(); 
        const id_input_right  = "input_right"  + Date.now();
        const bodyText = `
            <div class="slider-value inline">
                <h2 id="${id_title_min}" class="slider-value__title">${this.min}</h2>
                <h2 id="${id_title_text}" class="slider-value__title">${this.text}</h2>
                <h2 id="${id_title_max}" class="slider-value__title">${this.max}</h2>
            </div>
            <div class="double-slider inline">
                <div class="double-slider__body">
                    <div class="double-slider__track">
                        <div id="${id_slider_range}" class="double-slider__range"></div>
                        <div id="${id_dot_left}" class="double-slider__dot double-slider__dot--left"></div>
                        <div id="${id_dot_right}" class="double-slider__dot double-slider__dot--right"></div>
                    </div>
                    <input id="${id_input_left}"  min="${this.min}" max="${this.max}" value="${this.valueLeft}"  type="range" class="double-slider__input"/>
                    <input id="${id_input_right}" min="${this.min}" max="${this.max}" value="${this.valueRight}" type="range" class="double-slider__input"/>
                </div>
            </div>`;
        let div = document.createElement('div');
        div.setAttribute("id", "slider" + Date.now());
        div.className = "container";
        div.innerHTML = bodyText ;
        this.element = div;
        document.body.append(div);

        this.titleMin    = document.getElementById(id_title_min);
        this.titleMax    = document.getElementById(id_title_max);
        this.inputLeft   = document.getElementById(id_input_left);
        this.inputLeft.parent  = this;
  //      this.inputLeft.max     = this.max;
  //      this.inputLeft.value   = this.valueLeft;
        this.inputRight  = document.getElementById(id_input_right);
        this.inputRight.parent = this;
 // /     this.inputRight.max    = this.max;
 //       this.inputRight.value   = this.valueRight;
        this.dotLeft     = document.getElementById(id_dot_left);
        this.dotRight    = document.getElementById(id_dot_right);
        this.sliderRange = document.getElementById(id_slider_range);


        this.inputLeft.addEventListener('input',  this.setLeftValue);
        this.inputRight.addEventListener('input', this.setRightValue);
        const event = new Event("input");
        this.inputLeft.dispatchEvent(event);
        this.inputRight.dispatchEvent(event);

                         }

        setLeftValue() {
            let value = this.value;
            const min = parseInt(this.parent.min);
            const max = parseInt(this.parent.max);

            this.parent.inputLeft.value = Math.min(parseInt(value), parseInt(this.parent.inputRight.value) - 1);
            this.value = this.parent.inputLeft.value;
            const percent = ((this.value - min) / (max - min)) * 100;
            this.parent.sliderRange.style.left = percent + '%';
            this.parent.dotLeft.style.left = percent + '%';
            this.parent.titleMin.innerText = this.value; 
                        }          
                        
        setRightValue() {
            let value = this.value;
            const min = parseInt(this.parent.min);
            const max = parseInt(this.parent.max);
            
            this.parent.inputRight.value = Math.max(parseInt(value), parseInt(this.parent.inputLeft.value) + 1);
            this.value = this.parent.inputRight.value;
            const percent = ((this.value - min) / (max - min)) * 100;
            this.parent.sliderRange.style.right = (100 - percent) + '%';
            this.parent.dotRight.style.right = (100 - percent) + '%';
            this.parent.titleMax.innerText = this.value; 
                        }                        
                                  }
