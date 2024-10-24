import ColumnChart from './ColumnChart.js';
import getData     from './getURL.js';
export default class ColumnChartV2 extends ColumnChart {

       getDataFromURL(dateFrom, dateTo, cb, chart, id, className, element, cb1){
            const params = new URLSearchParams(this.baseURL.search);
            params.set("from", dateFrom.toString() + "T00:00:00.000Z");
            params.set("to",   dateTo.toString()   + "T23:59:59.999Z" );
            this.baseURL.search = params.toString();
            let res = getData(this.baseURL.href);
            let dateKey;
            res.then((data) => { 
               if (! data.isError) {
                  this.data = [];
                  this.dataKeys = [];
                  for (let [key, value] of Object.entries(data.data)) {
                      dateKey = key.toString();
                      dateKey = dateKey.slice(8,10) + "." + dateKey.slice(5,7) + "." + dateKey.slice(0,4);
                      this.dataKeys.push(dateKey);
                      this.data.push(value);
                                                                      }
                  cb(chart, id, className, element);
                  if (cb1 != null) {cb1();}
                                   }
               else { this.data = []; }
                               })
            res.catch((data) => { 
                  this.data = [];
                                });
                                       }
 
       setBaseURL(url) {
          this.baseURL = new URL(url);
                       }

       render(){
           this.updateSummaryValue();
           this.value = this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
           super.render();
               }

  getColumnBody(data) {
    const maxValue = Math.max(...data);
    let i = 0;
    return data
    .map(item => {
      const scale = this.chartHeight / maxValue;
      const percent = (item / maxValue * 100).toFixed(0);
      const key = this.dataKeys[i];
      i++;
       return `<div style="--value: ${Math.floor(item * scale)}; text-align: center; top: 50%; margin-top: -0.625em;" data-value="${item}"data-key="${key}" data-tooltip="${percent}%" class="column-chart__item"></div>`;
    })
    .join('');
  }

                                                      }
