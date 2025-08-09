import {Pipe, PipeTransform} from '@angular/core';
import Constants from '../http/urls';

@Pipe({
  name: 'imgUrl'
})
export class ImgUrlPipe implements PipeTransform {

  transform(value: string | null): string | null {
    if (!value) return null
    return Constants.BASE_PATH_API + '/' + value;
  }

}
