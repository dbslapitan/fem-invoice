import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ConnectedPosition} from "@angular/cdk/overlay";
import {Month} from "../../models/enums";

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
  finalDate = new Date();
  touched = false;
  onChange = (date: Date) => {};
  onTouch = () => {};
  disabled = false;
  dateIsOpen = false;

  connectedPositions: ConnectedPosition[] = [
    {
      overlayX: 'center',
      overlayY: "top",
      originY: 'bottom',
      originX: 'center',
      offsetY: 8
    },
    {
      overlayX: 'center',
      overlayY: "bottom",
      originY: 'top',
      originX: 'center',
      offsetY: -8
    }
  ];

  get month(){
    return Month[this.finalDate.getMonth()];
  }

  get year(){
    return this.finalDate.getFullYear();
  }

  get numberOfDays(){
    this.finalDate.setDate(-1)
    return this.finalDate.getDate();
  }

  previousMonth(){
    let currentMonth = this.finalDate.getMonth();
    let currentYear = this.finalDate.getFullYear();
    currentMonth--;
    if(currentMonth === -1){
      currentMonth = 11;
      currentYear--;
    }
    this.finalDate.setFullYear(currentYear, currentMonth);
  }

  nextMonth(){
    let currentMonth = this.finalDate.getMonth();
    let currentYear = this.finalDate.getFullYear();
    currentMonth++;
    if(currentMonth === 12){
      currentMonth = 0;
      currentYear++;
    }
    this.finalDate.setFullYear(currentYear, currentMonth);
  }

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
    if(!elementRef.nativeElement.contains(event.target)
      && !(event.target as HTMLElement).classList.contains('theme')){
      this.dateIsOpen = !this.dateIsOpen;
    }
  }
}
