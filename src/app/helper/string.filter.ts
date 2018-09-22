import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'stringfilter'
})
export class StringFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( it => {
      // Object.entries(it).forEach(
      //   ([key, value]) => {
      //     //console.log(key, value);
      //   }
      // );
      //return it.name.toLowerCase().includes(searchText)
      return it.toLowerCase().includes(searchText)
    });
   }
}