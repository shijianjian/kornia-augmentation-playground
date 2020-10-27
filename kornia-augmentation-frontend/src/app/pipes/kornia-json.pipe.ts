import { Pipe, PipeTransform } from '@angular/core';

import { object_remove_suffix } from "src/app/data/utils";

@Pipe({
    name: 'korniajson'
  })
export class KorniaJsonPipe implements PipeTransform {
    transform(val) {
        let obj = object_remove_suffix(val)
        let json = JSON.stringify(obj, null, 1)
        return json.substring(1, json.length - 1).replace(/["']/g, "")
    }
}