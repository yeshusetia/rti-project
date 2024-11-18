import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent {
  @Output() dateSelected = new EventEmitter<Date>(); // Emit selected date
  @Output() cancelSelection = new EventEmitter<void>(); // Emit cancel event

  selectedDate: Date = new Date(); // Holds the selected date
  visibleMonth: Date = new Date(); // Current visible month
  currentDay: Date = new Date(); // Current system date
  activeButton: string | null = null; // Tracks the active predefined button

  // Get calendar days, including leading/trailing days
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

  // Predefined date button handlers
  setToday() {
    this.selectedDate = new Date();
    this.activeButton = 'Today';
  }

  setNextMonday() {
    const today = new Date();
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + ((8 - today.getDay()) % 7 || 7));
    this.selectedDate = nextMonday;
    this.activeButton = 'Next Monday';
  }

  setNextTuesday() {
    const today = new Date();
    const nextTuesday = new Date(today);
    nextTuesday.setDate(today.getDate() + ((9 - today.getDay()) % 7 || 7));
    this.selectedDate = nextTuesday;
    this.activeButton = 'Next Tuesday';
  }

  setAfterOneWeek() {
    const today = new Date();
    const afterOneWeek = new Date(today);
    afterOneWeek.setDate(today.getDate() + 7);
    this.selectedDate = afterOneWeek;
    this.activeButton = 'After 1 Week';
  }

  // Calendar navigation
  changeMonth(offset: number) {
    this.visibleMonth.setMonth(this.visibleMonth.getMonth() + offset);
    this.visibleMonth = new Date(this.visibleMonth); // Update visible month
  }

  // Select a date
  selectDate(day: number) {
    this.selectedDate = new Date(this.visibleMonth.getFullYear(), this.visibleMonth.getMonth(), day);
    this.activeButton = null; // Clear active button when manually selecting
   // this.dateSelected.emit(this.selectedDate);
  }

  // Footer actions
  cancel() {
    this.cancelSelection.emit();
  }

  saveSelection() {
    this.dateSelected.emit(this.selectedDate);
  }

  // Utility to check if a day is the current date
  isToday(day: Date): boolean {
    return (
      day.getDate() === this.currentDay.getDate() &&
      day.getMonth() === this.currentDay.getMonth() &&
      day.getFullYear() === this.currentDay.getFullYear()
    );
  }
}
