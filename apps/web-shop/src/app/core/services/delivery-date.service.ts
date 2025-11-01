import { Injectable } from '@angular/core';

/**
 * Service for calculating delivery dates for Loja Africana Rosa
 * Deliveries are only available on Wednesdays (3) and Saturdays (6)
 * Business hours: 9:00 - 17:00
 */
@Injectable({
  providedIn: 'root'
})
export class DeliveryDateService {

  // Delivery days: Wednesday (3) and Saturday (6)
  private readonly DELIVERY_DAYS = [3, 6]; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  constructor() { }

  /**
   * Calculates the next available delivery date
   * Starting from today or tomorrow, returns the next Wed or Sat
   * 
   * @param fromDate - Date to start calculation from (default: today)
   * @returns Next available delivery date (Wed or Sat)
   */
  getNextDeliveryDate(fromDate: Date = new Date()): Date {
    const nextDate = new Date(fromDate);
    
    // Move to tomorrow to allow at least 1 business day
    nextDate.setDate(nextDate.getDate() + 1);
    
    // Keep advancing until we find a Wed or Sat
    let attempts = 0;
    while (!this.isDeliveryDay(nextDate) && attempts < 7) {
      nextDate.setDate(nextDate.getDate() + 1);
      attempts++;
    }

    return nextDate;
  }

  /**
   * Checks if a given date is a delivery day (Wed or Sat)
   * 
   * @param date - Date to check
   * @returns true if date is Wed (3) or Sat (6)
   */
  isDeliveryDay(date: Date): boolean {
    const dayOfWeek = date.getDay();
    return this.DELIVERY_DAYS.includes(dayOfWeek);
  }

  /**
   * Gets the day name for a delivery date
   * 
   * @param date - Date to get day name for
   * @returns Day name (e.g., "Quarta-feira", "Sábado")
   */
  getDeliveryDayName(date: Date): string {
    const dayOfWeek = date.getDay();
    const dayNames: {[key: number]: string} = {
      0: 'Domingo',
      1: 'Segunda-feira',
      2: 'Terça-feira',
      3: 'Quarta-feira',
      4: 'Quinta-feira',
      5: 'Sexta-feira',
      6: 'Sábado'
    };
    return dayNames[dayOfWeek] || 'Data Inválida';
  }

  /**
   * Gets formatted delivery date string in Portuguese
   * Format: "Quarta-feira, 15 de Janeiro de 2025"
   * 
   * @param date - Date to format
   * @returns Formatted date string
   */
  getFormattedDeliveryDate(date: Date): string {
    const dayName = this.getDeliveryDayName(date);
    const day = date.getDate();
    const monthName = this.getMonthName(date.getMonth());
    const year = date.getFullYear();

    return `${dayName}, ${day} de ${monthName} de ${year}`;
  }

  /**
   * Gets month name in Portuguese
   * 
   * @param monthIndex - Month index (0-11)
   * @returns Month name in Portuguese
   */
  private getMonthName(monthIndex: number): string {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return months[monthIndex] || 'Mês Inválido';
  }

  /**
   * Gets a user-friendly message about next delivery date
   * 
   * @param deliveryDate - The delivery date
   * @returns User message (e.g., "Entrega estimada: Quarta-feira, 15 de Janeiro")
   */
  getDeliveryMessage(deliveryDate: Date): string {
    const dayName = this.getDeliveryDayName(deliveryDate);
    const day = deliveryDate.getDate();
    const monthName = this.getMonthName(deliveryDate.getMonth());
    
    return `Entrega estimada: ${dayName}, ${day} de ${monthName}`;
  }

  /**
   * Gets all possible delivery dates for the next N weeks
   * Useful for showing customer options
   * 
   * @param numberOfDates - How many delivery dates to generate
   * @returns Array of upcoming delivery dates
   */
  getUpcomingDeliveryDates(numberOfDates: number = 5): Date[] {
    const dates: Date[] = [];
    let currentDate = this.getNextDeliveryDate();

    for (let i = 0; i < numberOfDates; i++) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
      
      // Skip to next delivery day
      while (!this.isDeliveryDay(currentDate)) {
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    return dates;
  }

  /**
   * Calculates delivery days until a specified date
   * 
   * @param untilDate - Date to calculate until
   * @returns Number of days until that date (negative if in past)
   */
  daysUntilDelivery(untilDate: Date): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const targetDate = new Date(untilDate);
    targetDate.setHours(0, 0, 0, 0);
    
    const timeDiff = targetDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  }

  /**
   * Checks if a delivery can be placed today
   * (Returns false if order placed after cutoff time on Wed/Sat)
   * Cutoff: 14:00 (2:00 PM) for next delivery, 18:00 for same-day
   * 
   * @returns true if delivery can be arranged
   */
  canDeliverToday(): boolean {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hours = now.getHours();

    // If today is Wed or Sat and before 14:00, can deliver today
    if (this.DELIVERY_DAYS.includes(dayOfWeek) && hours < 14) {
      return true;
    }

    return false;
  }
}
