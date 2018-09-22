import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'propertyfilter'
})
export class PropertyFilterPipe implements PipeTransform {

    transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
        return it.propertyNumber.toLowerCase().includes(searchText) ||  it.subHolder.toLowerCase().includes(searchText) ||  it.area.toLowerCase().includes(searchText)  ||  it.city.toLowerCase().includes(searchText) ||  it.customUniqueId.toLowerCase().includes(searchText)   ||  it.samagraId.toLowerCase().includes(searchText);
        });
   }
}