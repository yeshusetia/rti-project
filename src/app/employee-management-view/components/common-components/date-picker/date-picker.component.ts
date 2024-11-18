import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent {
  @Input() disablePastDates = false; // Disable past dates
  @Output() dateSelected = new EventEmitter<Date>(); // Emit selected date
  @Output() cancelSelection = new EventEmitter<void>(); // Emit cancel event

  selectedDate: any = new Date(); // Currently selected date
  visibleMonth: Date = new Date(); // Month currently visible in the calendar
  currentDay: Date = new Date(); // Today's date
  activeButton: string | null = 'Today'; // Tracks active button (predefined dates)

  currentMonthStart: Date; // Start of the current month

  constructor() {
  
    this.currentDay.setHours(0, 0, 0, 0);
    this.currentMonthStart = new Date(this.currentDay.getFullYear(), this.currentDay.getMonth(), 1);
  }


  // Generate 42 calendar days (6 rows x 7 columns)
  getCalendarDays(): Date[] {
    const days: Date[] = [];
    const firstDayOfMonth = new Date(this.visibleMonth.getFullYear(), this.visibleMonth.getMonth(), 1);
    const firstDayOfWeek = firstDayOfMonth.getDay();

    for (let i = 0; i < 42; i++) {
      const date = new Date(
        this.visibleMonth.getFullYear(),
        this.visibleMonth.getMonth(),
        i - firstDayOfWeek + 1
      );
      days.push(date);
    }

    return days;
  }

  // Check if a specific date should be disabled
  isDisabled(day: Date): boolean {
    return this.disablePastDates && day < this.currentDay;
  }

  // Determine if navigating to the previous month is allowed
  canNavigateToPreviousMonth(): boolean {
    if (!this.disablePastDates) return true;
    return this.visibleMonth > this.currentMonthStart;
  }

  setNoDate()
  {
    
  }

  // Set "Today" and update the visible month
  setToday() {
    this.selectedDate = new Date();
    this.visibleMonth = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), 1);
    this.activeButton = 'Today';
  }

  // Set "Next Monday" and update the visible month
  setNextMonday() {
    const today = new Date();
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + ((8 - today.getDay()) % 7 || 7));
    this.selectedDate = nextMonday;
    this.visibleMonth = new Date(nextMonday.getFullYear(), nextMonday.getMonth(), 1);
    this.activeButton = 'Next Monday';
  }

  // Set "Next Tuesday" and update the visible month
  setNextTuesday() {
    const today = new Date();
    const nextTuesday = new Date(today);
    nextTuesday.setDate(today.getDate() + ((9 - today.getDay()) % 7 || 7));
    this.selectedDate = nextTuesday;
    this.visibleMonth = new Date(nextTuesday.getFullYear(), nextTuesday.getMonth(), 1);
    this.activeButton = 'Next Tuesday';
  }

  // Set "After One Week" and update the visible month
  setAfterOneWeek() {
    const today = new Date();
    const afterOneWeek = new Date(today);
    afterOneWeek.setDate(today.getDate() + 7);
    this.selectedDate = afterOneWeek;
    this.visibleMonth = new Date(afterOneWeek.getFullYear(), afterOneWeek.getMonth(), 1);
    this.activeButton = 'After 1 Week';
  }

  // Change the visible month by an offset (e.g., -1 for previous, +1 for next)
  changeMonth(offset: number) {
    if (offset < 0 && !this.canNavigateToPreviousMonth()) return; // Prevent navigating to past months
    this.visibleMonth.setMonth(this.visibleMonth.getMonth() + offset);
    this.visibleMonth = new Date(this.visibleMonth); // Trigger change detection
  }

  // Select a specific date
  selectDate(day: number) {
    const selectedDay = new Date(this.visibleMonth.getFullYear(), this.visibleMonth.getMonth(), day);
    if (this.isDisabled(selectedDay)) return; // Prevent selecting disabled days
    this.selectedDate = selectedDay;
    this.activeButton = null; 
  //  this.dateSelected.emit(this.selectedDate); // Emit the selected date
  }

  // Cancel the date selection
  cancel() {
    this.cancelSelection.emit();
  }

  // Save the selected date
  saveSelection() {
    this.dateSelected.emit(this.selectedDate);
  }

  // Check if a specific day is today
  isToday(day: Date): boolean {
    return (
      day.getDate() === this.currentDay.getDate() &&
      day.getMonth() === this.currentDay.getMonth() &&
      day.getFullYear() === this.currentDay.getFullYear()
    );
  }
}
