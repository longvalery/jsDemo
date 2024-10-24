export default class Tooltip {
    constructor() {
        if (Tooltip._instance) { return Tooltip._instance }
        Tooltip._instance = this;
        this.message = "";
        let div = document.createElement('div');
        div.setAttribute("id", "toast");
        div.className = "toast";
//        let textBody = '<div class="toast"><div  class="toast-message"></div></div>'; 
        let textBody = '<div  class="toast-message"></div>' ;
        div.innerHTML = textBody;
        this.element = div;
        this.toastMessage = this.element.querySelector(".toast-message");
        document.body.append(div);
                  }

    show(message){
        this.message = message;
        this.element.hidden=false;
        this.toastMessage.innerText = message;
                 }

    move(x,y) {
        this.element.style.left = x + 'px';
        this.element.style.top  = y + 'px';
              };             

    hide(){
        this.element.hidden=true;
          }                           
                             }