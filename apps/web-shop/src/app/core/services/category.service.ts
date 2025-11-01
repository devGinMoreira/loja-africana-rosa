import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Subcategory {
  id: string;
  name: string;
  icon: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: Subcategory[];
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/categories`;
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  public categories$ = this.categoriesSubject.asObservable();

  private mockCategories: Category[] = [
    {
      id: 'mercearia',
      name: 'Mercearia',
      icon: '🛒',
      subcategories: [
        { id: 'cereaisgraos', name: 'Cereais e Grãos', icon: '🌾' },
        { id: 'oleostemperos', name: 'Óleos e Temperos', icon: '🫙' },
        { id: 'frutasvegetais', name: 'Frutas e Vegetais', icon: '🥬' }
      ]
    },
    {
      id: 'talho',
      name: 'Talho',
      icon: '🥩',
      subcategories: [
        { id: 'carnesvermelhas', name: 'Carnes Vermelhas', icon: '🍖' },
        { id: 'aves', name: 'Aves', icon: '🍗' },
        { id: 'embutidos', name: 'Embutidos', icon: '🥓' }
      ]
    },
    {
      id: 'peixaria',
      name: 'Peixaria',
      icon: '🐟',
      subcategories: [
        { id: 'peixefresco', name: 'Peixe Fresco', icon: '🐠' },
        { id: 'peixeseco', name: 'Peixe Seco', icon: '🐟' },
        { id: 'marisco', name: 'Marisco', icon: '🦐' }
      ]
    },
    {
      id: 'cosmeticos',
      name: 'Cosméticos',
      icon: '💄',
      subcategories: [
        { id: 'oleosmanteigas', name: 'Óleos e Manteigas Naturais', icon: '💅' },
        { id: 'cremeslocoes', name: 'Cremes e Loções', icon: '🧴' },
        { id: 'higienepessoal', name: 'Higiene Pessoal', icon: '🧼' }
      ]
    }
  ];

  constructor(private http: HttpClient) {
    this.loadCategories();
  }

  /**
   * Load categories from API or use mock data
   */
  loadCategories(): void {
    this.http
      .get<Category[]>(this.apiUrl)
      .pipe(
        tap(categories => this.categoriesSubject.next(categories)),
        catchError(() => {
          this.categoriesSubject.next(this.mockCategories);
          return of(this.mockCategories);
        })
      )
      .subscribe();
  }

  /**
   * Get all categories
   */
  getCategories(): Observable<Category[]> {
    return this.categories$;
  }

  /**
   * Get category by ID
   */
  getCategoryById(id: string): Observable<Category | undefined> {
    return this.http
      .get<Category>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(() => {
          const category = this.mockCategories.find(c => c.id === id);
          return of(category);
        })
      );
  }

  /**
   * Get subcategories for a category
   */
  getSubcategories(categoryId: string): Observable<Subcategory[]> {
    return this.http
      .get<Subcategory[]>(`${this.apiUrl}/${categoryId}/subcategories`)
      .pipe(
        catchError(() => {
          const category = this.mockCategories.find(c => c.id === categoryId);
          return of(category?.subcategories || []);
        })
      );
  }

  /**
   * Create new category (Admin)
   */
  createCategory(category: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category).pipe(
      tap(() => this.loadCategories())
    );
  }

  /**
   * Update category (Admin)
   */
  updateCategory(id: string, category: Partial<Category>): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, category).pipe(
      tap(() => this.loadCategories())
    );
  }

  /**
   * Delete category (Admin)
   */
  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadCategories())
    );
  }

  /**
   * Add subcategory to category (Admin)
   */
  addSubcategory(categoryId: string, subcategory: Subcategory): Observable<Category> {
    return this.http
      .post<Category>(`${this.apiUrl}/${categoryId}/subcategories`, subcategory)
      .pipe(
        tap(() => this.loadCategories())
      );
  }

  /**
   * Remove subcategory from category (Admin)
   */
  removeSubcategory(categoryId: string, subcategoryId: string): Observable<Category> {
    return this.http
      .delete<Category>(`${this.apiUrl}/${categoryId}/subcategories/${subcategoryId}`)
      .pipe(
        tap(() => this.loadCategories())
      );
  }

  /**
   * Get all stored categories (synchronously for offline support)
   */
  getCategoriesSync(): Category[] {
    return this.categoriesSubject.value;
  }

  /**
   * Get subcategories for a category (synchronously)
   */
  getSubcategoriesSync(categoryId: string): Subcategory[] {
    const category = this.mockCategories.find(c => c.id === categoryId);
    return category?.subcategories || [];
  }
}
