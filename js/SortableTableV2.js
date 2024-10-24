import SortableTable from './SortableTable.js';
export default class SortableTableV2 extends SortableTable {

  setOnclickHandle(object){
      const items = this.element.getElementsByClassName("headerCell");
      for (let i = 0; i < (items.length ); i++ ) { 
          items[i].onclick = function(data) {
             const data_name = this.attributes["data-name"].value;
             let data_sort = this.attributes["data-sort"].value;
             if (data_sort == "asc") { data_sort = "desc"; }
             else {data_sort = "asc"}; 
             if (data_name != "images") {
                object.sort(data_name, data_sort);   
                                        }
                                            };
                                                }
                          }
   

  formHeader(sortColumn, sortDirection) {
      let header = '<div data-elem="header" class="sortable-table__header sortable-table__row_header bold sticky_class">';  
      let isSortable = "";
      for (let i = 0; i < (this.headerConfig.length ); i++ ) {
          isSortable = (sortColumn.toLowerCase() == this.headerConfig[i]["id"].toLowerCase()) ? sortDirection : "";  
          header += '<div class="sortable-table__cell headerCell" data-name="' +
                    this.headerConfig[i]["id"] + '" data-sort="' + isSortable + '"><span>' +
                    this.headerConfig[i]["title"] + '</span>';
          if (sortColumn.toLowerCase() == this.headerConfig[i]["id"].toLowerCase()) {
             header += '<span class="sortable-table__cell" data-order="'+sortDirection+'"><span class="sort-arrow "></span></span>'
                                                        }
          header += '</div>';
                                                             } 
      header += '<div class="sortable-table__cell"><a class="column-chart__link" href=#><img class="sortable-table-image" alt="?" src="../assets/icons8-up-50.png"></a></div>';
      header += '</div>';                                                          
      return header;                                                           
                                                              
                                        }


  sort(fieldValue, orderValue) {
      super.sort(fieldValue, orderValue);
      this.setOnclickHandle(this);
      return ; 
                               }                          

                                                          }

