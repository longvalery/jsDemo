export default class NotificationMessage {
    static _instance; 
    message = "";
    options = {};
    duration = 0;
    type = "";
    element = null;

    constructor(message = "", options = {duration: 1000, type: 'success' }) {
      this.message = message;
      this.duration = options["duration"] || 1000 ;
      this.type = options["type"] || "success";
      this.element = this.createTemplate();
    }

    createTemplate() {
      const div = document.createElement('div');
      div.setAttribute("id", "messageDiv");
      div.className = "notification " + this.type;
      const textBody = '<div class="timer"></div><div class="inner-wrapper"><div class="notification-header">' +
                        this.type +
                        '</div><div class="notification-body">' +
                        this.message +
                        '</div></div>';
      div.innerHTML = textBody;
      return div;
    }
    
    createTimer() {
      this.timer = setTimeout(() => { this.destroy();}, this.duration);
    }
    
    remove() {
      this.element.remove();
    }
    
    removeTimer() {
      clearTimeout(this.timer);
    } 

    destroy() {
      NotificationMessage._instance = undefined;
      this.removeTimer();
      this.remove();
    }

    hide() {
      this.element.style.display = 'none';
           }
   
    show(item) {
      if (item != undefined) { this.element = item; } // !!!! No SOLID
      this.createTimer();
      if (NotificationMessage._instance) { this.hide(); NotificationMessage._instance.destroy(); return;}
      NotificationMessage._instance = this;
      document.body.append(this.element); 
     
    }                                                                        

}
