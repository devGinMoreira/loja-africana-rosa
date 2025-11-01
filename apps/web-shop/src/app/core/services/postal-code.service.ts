import { Injectable } from '@angular/core';

/**
 * Service for validating postal codes in Almada municipality, Portugal.
 * Almada postal codes range from 2700 to 2839 (approximate ranges).
 * 
 * Reference: https://www.ctt.pt/ (CTT - Portuguese postal service)
 */
@Injectable({
  providedIn: 'root'
})
export class PostalCodeService {
  
  // Valid Almada postal code ranges
  // Almada covers postal codes approximately from 2700 to 2839
  private readonly ALMADA_POSTAL_CODE_RANGES = [
    { start: 2700, end: 2729 }, // Almada central area
    { start: 2730, end: 2759 }, // Caparica area
    { start: 2760, end: 2789 }, // Costa area
    { start: 2790, end: 2839 }  // Extended Almada area
  ];

  constructor() { }

  /**
   * Validates if a postal code belongs to Almada municipality
   * Postal code format: XXXX-XXX (4 digits, dash, 3 digits)
   * 
   * @param postalCode - The postal code to validate (format: 1234-567)
   * @returns true if valid Almada postal code, false otherwise
   */
  isValidAlmadaPostalCode(postalCode: string): boolean {
    if (!postalCode) {
      return false;
    }

    // Remove spaces and normalize
    const normalized = postalCode.trim().replace(/\s/g, '');

    // Check format: XXXX-XXX or XXXXXXX
    const postalCodeRegex = /^(\d{4})-?(\d{3})$/;
    const match = normalized.match(postalCodeRegex);

    if (!match) {
      return false;
    }

    // Extract the 4-digit prefix (most important for municipality validation)
    const prefix = parseInt(match[1], 10);

    // Check if prefix falls within Almada ranges
    return this.ALMADA_POSTAL_CODE_RANGES.some(
      range => prefix >= range.start && prefix <= range.end
    );
  }

  /**
   * Formats a postal code to the standard Portuguese format: XXXX-XXX
   * 
   * @param postalCode - The postal code to format
   * @returns Formatted postal code or original if invalid format
   */
  formatPostalCode(postalCode: string): string {
    if (!postalCode) {
      return '';
    }

    // Remove all non-digits
    const digits = postalCode.replace(/\D/g, '');

    // Format as XXXX-XXX
    if (digits.length === 7) {
      return `${digits.substring(0, 4)}-${digits.substring(4)}`;
    }

    return postalCode;
  }

  /**
   * Gets a user-friendly error message for invalid postal codes
   * 
   * @param postalCode - The invalid postal code
   * @returns Error message
   */
  getErrorMessage(postalCode: string): string {
    if (!postalCode) {
      return 'Código postal é obrigatório';
    }

    const postalCodeRegex = /^(\d{4})-?(\d{3})$/;
    const match = postalCode.trim().replace(/\s/g, '').match(postalCodeRegex);

    if (!match) {
      return 'Formato de código postal inválido. Use o formato: 1234-567';
    }

    if (!this.isValidAlmadaPostalCode(postalCode)) {
      return 'Infelizmente entregamos apenas em Almada. Código postal fora da área de serviço.';
    }

    return 'Código postal inválido';
  }

  /**
   * Gets valid postal code ranges for documentation/help
   * 
   * @returns Array of valid postal code ranges
   */
  getValidRanges(): Array<{start: number, end: number}> {
    return this.ALMADA_POSTAL_CODE_RANGES;
  }

  /**
   * Gets example postal codes for Almada
   * 
   * @returns Array of example postal codes
   */
  getExamplePostalCodes(): string[] {
    return [
      '2700-000', // Almada
      '2710-000', // Caparica
      '2730-000', // Costa
      '2790-000'  // Extended area
    ];
  }
}
