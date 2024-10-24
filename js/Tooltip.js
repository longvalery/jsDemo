class Tooltip {
    message = "";
    element = {};


    constructor() {
        if (Tooltip._instance) { return Tooltip._instance }
        Tooltip._instance = this;
        this.message = "";
        this.element = this.createTemplate();
                  }

    createTemplate() {
        const div = document.createElement('div');
        div.innerHTML = '<div"></div>' ;
        div.setAttribute("id", "toast");
        // div.className = "tooltip";
        div.className = "toast";
        return div; 
                     }
    show(message){
        this.message = message;
        this.element.hidden=false;
        this.element.innerText = message;
                 }

    move(x,y) {
        this.element.style.left = x + 'px';
        this.element.style.top  = y + 'px';
              };             

    hide(){
        this.element.hidden=true;
          }                           


    render() {
        this.element.hidden=false;
             } 

    destroy() {
       this.element.remove();
       this.message = "";
       this.element = {};
              }

    initialize () {
        document.body.append(this.element);
        const items = document.querySelectorAll("[data-tooltip]");
        for (let item of items) {
           item.addEventListener("mouseover", (event)=>this.show(event.target.getAttribute("data-tooltip")));
           item.addEventListener("mousemove", (event)=>this.move(event.clientX, event.clientY));
           item.addEventListener("mouseout",  (event)=>this.hide());
                                }
                  }
}

export default Tooltip;
