import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taxfilter'
})
export class TaxFilterPipe implements PipeTransform {

    transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( it => {
      if(it.lastTaxPaidOn==null){
        return it.amount.toString().toLowerCase().includes(searchText) ||  it.currentTaxPaymentStatus.toLowerCase().includes(searchText);
      }else{
        return it.lastTaxPaidOn.toLowerCase().includes(searchText) ||  it.amount.toString().toLowerCase().includes(searchText) ||  it.currentTaxPaymentStatus.toLowerCase().includes(searchText);
      }
    });
   }
}