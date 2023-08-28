import {Component, ElementRef, OnInit} from '@angular/core';
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
export class DatePickerComponent implements ControlValueAccessor, OnInit{

  initialDate = new Date();
  finalDate = new Date();
  touched = false;
  onChange = (date: Date) => {};
  onTouch = () => {};
  disabled = false;
  dateIsOpen = false;
  daysOfTheMonth: number[] = [];

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

  ngOnInit() {
    this.populateNumberOfDaysArray();
  }



  get month(){
    return Month[this.finalDate.getMonth()];
  }

  get year(){
    return this.finalDate.getFullYear();
  }

  get numberOfDays(){
    this.finalDate.setDate(0)
    return this.finalDate.getDate();
  }

  get numberofDays(){
    const nextMonth = this.finalDate.getMonth() + 1;
    const thisYear = this.finalDate.getFullYear();
    const tempDate = new Date();
    tempDate.setFullYear(thisYear, nextMonth);
    tempDate.setDate(0);
    return tempDate.getDate();
  }

  isCorrectDate(day: number){
    return this.initialDate.getFullYear() === this.finalDate.getFullYear()
      && this.initialDate.getMonth() === this.finalDate.getMonth()
      && this.initialDate.getDate() === day;
  }

  isNextMonth(index: number){
    let temp = this.finalDate.getMonth();
    temp++;
    const tempDate = new Date();
    tempDate.setFullYear(this.finalDate.getFullYear(), temp, 1);
    tempDate.setDate(0);
    return index + 1 > tempDate.getDate();
  }

  populateNumberOfDaysArray(){
    this.daysOfTheMonth = [];
    const daysInMonth = this.numberofDays;
    for(let i = 1; i <= 35; i++){
      if(i <= daysInMonth){
        this.daysOfTheMonth.push(i);
      }
      else{
        this.daysOfTheMonth.push(i - daysInMonth);
      }
    }
  }

  dayClicked(day: number){
    this.finalDate.setDate(day);
    this.onChange(this.finalDate);
    this.initialDate = new Date(this.finalDate.getFullYear(), this.finalDate.getMonth(), day);
    this.dateIsOpen = false;
  }

  previousMonth(){
    let currentMonth = this.finalDate.getMonth();
    let currentYear = this.finalDate.getFullYear();
    currentMonth--;
    if(currentMonth === -1){
      currentMonth = 11;
      currentYear--;
    }
    this.finalDate.setFullYear(currentYear, currentMonth, 1);
    this.populateNumberOfDaysArray()
  }

  nextMonth(){
    let currentMonth = this.finalDate.getMonth();
    let currentYear = this.finalDate.getFullYear();
    currentMonth++;
    if(currentMonth === 12){
      currentMonth = 0;
      currentYear++;
    }
    this.finalDate.setFullYear(currentYear, currentMonth, 1);
    this.populateNumberOfDaysArray();
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouch: any): void {
    this.onTouch = onTouch;
  }

  writeValue(date: Date): void {
    this.initialDate = new Date(date);
    this.finalDate = new Date(date);
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
    if(!this.disabled){
      this.dateIsOpen = !this.dateIsOpen;
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
