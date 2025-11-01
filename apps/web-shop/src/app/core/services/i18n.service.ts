import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private currentLanguageSubject = new BehaviorSubject<string>(this.getStoredLanguage());
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor(private translate: TranslateService) {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    const storedLanguage = this.getStoredLanguage();
    this.setLanguage(storedLanguage);
  }

  /**
   * Initialize translation service with default language
   */
  init(): void {
    this.translate.addLangs(environment.supportedLanguages);
    this.translate.setDefaultLang(environment.defaultLanguage);
    const language = this.getStoredLanguage();
    this.translate.use(language);
    this.currentLanguageSubject.next(language);
  }

  /**
   * Set the active language
   */
  setLanguage(language: string): void {
    if (environment.supportedLanguages.includes(language)) {
      this.translate.use(language);
      localStorage.setItem('language', language);
      this.currentLanguageSubject.next(language);
    }
  }

  /**
   * Get current active language
   */
  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  /**
   * Get supported languages
   */
  getSupportedLanguages(): string[] {
    return environment.supportedLanguages;
  }

  /**
   * Get language display name
   */
  getLanguageName(language: string): string {
    const names: { [key: string]: string } = {
      'pt-PT': 'Português',
      'en-US': 'English'
    };
    return names[language] || language;
  }

  /**
   * Get stored language from localStorage or default
   */
  private getStoredLanguage(): string {
    const stored = localStorage.getItem('language');
    if (stored && environment.supportedLanguages.includes(stored)) {
      return stored;
    }
    return environment.defaultLanguage;
  }

  /**
   * Translate a key
   */
  get(key: string, params?: any): Observable<any> {
    return this.translate.get(key, params);
  }

  /**
   * Translate instantly (synchronous)
   */
  instant(key: string, params?: any): string {
    return this.translate.instant(key, params);
  }
}
