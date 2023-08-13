import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: DatePickerComponent
  }]
})
export class DatePickerComponent implements ControlValueAccessor{

  initialDate = new Date();
  touched = false;
  onChange = (date: Date) => {};
  onTouch = () => {};
  disabled = false;
  dateIsOpen = false;


  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouch: any): void {
    this.onTouch = onTouch;
  }

  writeValue(date: Date): void {
    this.initialDate = date;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  isDisabled(){
    if(this.disabled){
      return "disabled"
    }
    return null;
  }

  onClick(){
    this.dateIsOpen = !this.dateIsOpen;
    if(!this.disabled){
      if(!this.touched){
        this.onTouch();
        this.touched = true;
      }
    }
  }

  clickedOutsideOverlay(event: Event, elementRef: ElementRef){
    if(!elementRef.nativeElement.contains(event.target)){
      this.dateIsOpen = !this.dateIsOpen;
    }
  }
}
