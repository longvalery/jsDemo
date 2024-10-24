import getData     from './getURL.js';
export default class ProductForm {
  element;
  id_element;
  id_product; // for request Base
  id_name;
  id_decription;
  id_price;
  id_count;
  id_discount;
  id_status;
  id_categories;
  id_photos;
  id_form;
  id_preloder; 
  item_name;
  item_decription;
  item_price;
  item_count;
  item_discount;
  item_status;
  item_categories;  
  item_photos;
  item_form; 
  data;
  categories;


  PRODUCT_URL = "https://course-js.javascript.ru/api/rest/products"; 
  CATEGORIES_URL = "https://course-js.javascript.ru/api/rest/categories?_sort=weight&_refs=subcategory";
  
  constructor(id = null) {
      this.id_preloder = "preloader";    
      this.startPreloder();
      this.id_product = id;
      this.id_element = "idProductForm" + Date.now();
      this.id_name = "idProductFormName" + Date.now();
      this.id_decription = "idProductFormDescription" + Date.now();
      this.id_price = "idProductFormPrice" + Date.now();
      this.id_count = "idProductForm" + Date.now();
      this.id_discount = "idProductFormDiscount" + Date.now();
      this.id_status = "idProductFormStatus" + Date.now();
      this.id_categories = "idProductFormCategories" + Date.now();
      this.id_photos = "idPhotosList" + Date.now();   
      this.id_form = "idMainGoodForm" + Date.now();   
      this.element = this.createTemplate();
      document.body.append(this.element);
      this.setItems();
      this.createListeners();
      this.render();
      this.setListeners();
      if (this.id_product == null) { this.hidePreload() };
                         }

  startPreloder(){
    const div = document.createElement('div');
    div.setAttribute("id", this.id_preloder);
    div.innerHTML = `<img src="../assets/preloader.gif" alt="preloader">`;
    document.body.append(div);
                 }

  hidePreload(){
    const preloader = document.getElementById(this.id_preloder);
    preloader.classList.add('hide-preloader');
    setInterval(function() { preloader.classList.add('preloader-hidden'); preloader.remove(); }, 990);
               }

  setItems() {
    this.item_name       = this.element.querySelector("#"+this.id_name);
    this.item_decription = this.element.querySelector("#"+this.id_decription);
    this.item_price      = this.element.querySelector("#"+this.id_price);
    this.item_count      = this.element.querySelector("#"+this.id_count);
    this.item_discount   = this.element.querySelector("#"+this.id_discount);
    this.item_status     = this.element.querySelector("#"+this.id_status);
    this.item_categories = this.element.querySelector("#"+this.id_categories);  
    this.item_photos     = this.element.querySelector("#"+this.id_photos);
    this.item_form       = this.element.querySelector("#"+this.id_form);
             }                       

  validateData(){
    const items = this.element.querySelectorAll(".field-need-check");
    let errors = false;
    for (let i = 0; i < items.length; i++ ) {
        if (items[i].value == undefined || items[i].value == "" ) {
          errors = true;
          items[i].classList.add("error_notifaction");
                                                                  }
        else {
           items[i].classList.remove("error_notifaction"); 
             }                                                          
                                            }
    return errors
                }           

  getCurrentValues(){
    const result = {};
    let images = [];
    let image = [];
    result.item_name       = this.item_name.value;
    result.item_decription = this.item_decription.value;
    result.item_price      = this.item_price.value;
    result.item_count      = this.item_count.value;
    result.item_discount   = this.item_discount.value;
    result.item_status     = this.item_status.value;
    result.item_category   = this.item_categories.value;
    [].forEach.call(this.item_photos.children, function(element) {
       image = {};
       image.url = element.querySelector('[name="url"]').value; 
       image.source = element.querySelector('[name="source"]').value; 
       images.push(image);
                                                                 });
    result.images = images;                                                             
    return result;
                    }           

  createListeners() {
    this.buttonSave = (event) => {
      event.preventDefault();
      event.stopPropagation();
      let newEvent; 
      if (this.id_product == null || this.id_product == undefined) { newEvent = new Event("product-saved"); } 
      else                                                         { newEvent = new Event("product-updated"); }   
      newEvent.currentValues = this.getCurrentValues();
      if (! this.validateData()) { 
        this.item_form.submit();
        document.body.dispatchEvent(newEvent); 
                                 }
                                 }
    
    this.buttonLoadPhoto = (event) => {
      event.stopPropagation();
      const newEvent = new Event("needLoadPhoto");
      document.body.dispatchEvent(newEvent);
                                      }
    this.movePhotoItem = (event) => {
      event.stopPropagation();
      const newEvent = new Event("movePhotoItem");
      newEvent.who = event;
      document.body.dispatchEvent(newEvent);
                                     }
    this.deletePhotoItem = (event) => {
      event.stopPropagation();
      const newEvent = new Event("deletePhotoItem");
      newEvent.who = event;
      document.body.dispatchEvent(newEvent);
                                      }
                   }

 
  createTemplate() {
      const section = document.createElement('section');
      section.setAttribute("id", this.id_element);
      section.className = "content";
      section.innerHTML = this.createBody();
      return section;
    }


  setListeners(){
    let item;
    item = this.element.querySelector('[name="uploadImage"]');
    if ((item != undefined) && (item != null)) { item.addEventListener("click", this.buttonLoadPhoto); }
    item = this.element.querySelector('[name="save"]');
    if ((item != undefined) && (item != null)) { 
        item.addEventListener("click", this.buttonSave); 
                                               }
    let items = this.element.querySelectorAll('.photo_button');
    for (let i = 0; i < items.length; i++) { items[i].addEventListener("click", this.movePhotoItem); }  
    items = this.element.querySelectorAll('.photo_button_delete');
    for (let i = 0; i < items.length; i++) { items[i].addEventListener("click", this.deletePhotoItem); }  
                }  

  removeListeners(){
    let item; 
    item = this.element.querySelector('[name="uploadImage"]');
    if ((item != undefined) && (item != null)) { item.removeEventListener("click", this.buttonLoadPhoto);}
    item = this.element.querySelector('[name="save"]');
    if ((item != undefined) && (item != null)) { item.removeEventListener("click", this.buttonSave); }
    let items = this.element.querySelectorAll('.photo_button');
    for (let i = 0; i < items.length; i++) {
        items[i].removeEventListener("click", this.movePhotoItem);
                                           }  
    items = this.element.querySelectorAll('.photo_button_delete');
      for (let i = 0; i < items.length; i++) {
          items[i].removeEventListener("click", this.deletePhotoItem);
                                            }  
                                       
                   }  
                   
  setData(){
    this.item_name.setAttribute("value", this.data.name);
    this.item_decription.innerText =  this.data.description;
    this.item_price.setAttribute("value", this.data.price);
    this.item_count.setAttribute("value", this.data.count);
    this.item_discount.setAttribute("value", this.data.discount);   
    this.item_status.setAttribute("value", this.data.status); 
           } 

  getProductData(){
    this.data = {name: "", description: "", price: 100, discount: 3, count: 1, status: 1, images:[], category :""};    
    if (this.id_product != null) {
      let res = getData(this.PRODUCT_URL + "?id=" + this.id_product);
      let image;
      this.data.images = [];
      res.then((data) => { 
        if (! data.isError) {
          if (data.data.length > 0) {
             const item = data.data[0];
             this.data.name = item.title;
             this.data.description = item.description;
             this.data.price = item.price;
             this.data.discount = item.quantity;
             this.data.status = 1;
             this.data.category = item.subcategory;
             for (let i = 0; i < item.images.length; i++) {
                 image = new Object();
                 image.url    = item.images[i].url;
                 image.source = item.images[i].source;
                 this.data.images.push(image);
                                                          }
             this.setImages();     
             this.setListeners();                                        
             this.setCategory(this.data.category);                                             
                                    }                                   
            this.setData();
            this.hidePreload();
           // this.element.innerHTML = this.createBody(); 
                            }
        else { console.log("getProductData. else", data);}
       
                        })
     res.catch((data) => { 
      console.log(data); 
                         });
                                 }
    return ;                             
                  }

  destroy() {
     this.data = {};
     this.categories = {};
     this.element.remove(); 
            } 
  
  createListItem(url, source, number){
    return `  <input type="hidden"  name="url" id="buttonImageURL${number}" value="${url}">
    <input type="hidden" name="source" id="buttonSourceURL${number}" value="${source}">
    <span class="photo_button" id="spanImage${number}" >
      <img src="../assets/grab.svg" data-grab-handle="" alt="grab">
      <img class="sortable-table__cell-img" alt="Image" src="${url}">
      <span>${source}</span>
    </span>
    <button type="button" class="photo_button_delete" id="buttonImageDelete${number}" >
       <img src="../assets/trash.svg" data-delete-handle="" alt="delete">
     </button>
  `;
                                     }

  setImages(){
    for (let i = 0; i < this.data.images.length; i++) {
      const li = document.createElement('li');
      li.className = "products-edit__imagelist-item sortable-list__item";
      li.innerHTML = this.createListItem(this.data.images[i].url, this.data.images[i].source, i);
      this.item_photos.appendChild(li);                     
                                                      }
             }          

    getCategories(){
    this.categories = [];   
    let res = getData(this.CATEGORIES_URL);
    let name = "";
    let fullName = "";
    let id = "";
    res.then((data) => { 
      if (! data.isError) {
          for (let i = 0; i < data.data.length; i++ ) {
              name = data.data[i].title;
              for (let j = 0; j < data.data[i].subcategories.length; j++) {
                  id = data.data[i].subcategories[j].id;
                  fullName =  name + " => " + data.data[i].subcategories[j].title;
                  this.categories.push({id, fullName});
                                                                          }
                                                      }
          this.addSubCategories();
          this.setCategory(this.data.category);
                          }
      else { console.log("getCategories.else", data)}
      
                       })
    res.catch((data) => { console.log("getCategories.catch", data) });
                     }

  getSubCategories(){
      let result = "";
      if (this.categories != undefined) {
         for (let i = 0; i < this.categories.length; i++) {
             result =  result + `<option value="${this.categories[i].id}">${this.categories[i].fullName}</option>`;
                                                          }
                                        }
      return result;                                                 
                    }

  setCategory(category){
    if (this.categories == undefined) { return; }
    for (let i = 0; i < this.categories.length; i++ ){
      if (this.categories[i].id == category) {
          this.item_categories.value = this.categories[i].id; break;
                                             }
                                                     }
                       }
                    
  addSubCategories(){
    if (this.categories == undefined) { return; }
    this.item_categories.innerHTML = '';  
    for (let i = 0; i < this.categories.length; i++ ){
        const opt = document.createElement('option');
        opt.value = this.categories[i].id;
        opt.innerHTML = this.categories[i].fullName;
        this.item_categories.appendChild(opt);
                                                     }
                    }

  sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
                      }

    render(){
    try {
      this.removeListeners();
        this.getCategories(); 
        this.update();
        }
    catch(error) {console.log(" render(). error ", error)}          
        }
                  
    update(){
    try {
         this.getProductData();
        }
    catch (error) {console.log("update.error", error)}
          }       

 createBody() {
    const categories = this.getSubCategories();
    const buttonName = ((this.id_product == null) || (this.id_product == undefined)) ?  "Добавить" : "Изменить" ;
    return `
    <div class="products-edit">
    <div class="content__top-panel">
      <h1 class="page-title">
        <a href="/products" class="link">Товары</a> / ${buttonName}
      </h1>
    </div>
    <div class="content-box"><div class="product-form">
      <form data-elem="productForm" class="form-grid" id="${this.id_form}">
      <div class="form-group form-group__half_left">
        <fieldset>
          <label class="form-label">Название товара</label>
          <input required="" type="text" name="title" class="form-control field-need-check" placeholder="Название товара" id="${this.id_name}">
        </fieldset>
      </div>
      <div class="form-group form-group__wide">
        <label class="form-label">Описание</label>
        <textarea required="" class="form-control field-need-check" name="description" placeholder="Описание товара" id="${this.id_decription}"></textarea>
      </div>
      <div class="form-group form-group__wide" data-elem="sortable-list-container">
        <label class="form-label">Фото</label>
        <div data-elem="imageListContainer">
           <ul class="sortable-list" id="${this.id_photos}">
           </ul>
        </div>
        <button type="button" name="uploadImage" class="button-primary-outline fit-content"><span>Загрузить</span></button>
      </div>
      <div class="form-group form-group__half_left">
        <label class="form-label">Категория</label>
        <select class="form-control" name="category"  id="${this.id_categories}">
        ${categories}
        </select>
      </div>
      <div class="form-group form-group__half_left form-group__two-col">
        <fieldset>
          <label class="form-label">Цена ($)</label>
          <input required="" type="number" name="price" class="form-control field-need-check" placeholder="100"  id="${this.id_price}">
        </fieldset>
        <fieldset>
          <label class="form-label">Скидка ($)</label>
          <input required="" type="number" name="discount" class="form-control field-need-check" placeholder="0"  id="${this.id_discount}">
        </fieldset>
      </div>
      <div class="form-group form-group__part-half">
        <label class="form-label">Количество</label>
        <input required="" type="number" class="form-control field-need-check" name="quantity" placeholder="1"  id="${this.id_count}">
      </div>
      <div class="form-group form-group__part-half">
        <label class="form-label">Статус</label>
        <select class="form-control" name="status"  id="${this.id_status}">
          <option value="1">Активен</option>
          <option value="0">Неактивен</option>
        </select>
      </div>
      <div class="form-buttons">
        <button type="submit" name="save" class="button-primary-outline">${buttonName} товар</button>
      </div>
    </form>
    </div></div>
  </div>

    `;
  }
  
                                } /// ProductForm 

  function delay(ms) {   wait(ms); }

function wait(time) { return new Promise(resolve => { setTimeout(resolve, time);});
}
          
