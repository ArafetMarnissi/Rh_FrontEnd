import { NgModule } from '@angular/core';

import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { DatePickerComponent } from './date-picker/date-picker.component';


@NgModule({
imports:[
  DatePickerComponent
],

  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
   
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    
   ],
  providers: []
})
export class SharedModule { }
