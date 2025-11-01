import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  costPrice: number;
  originalPrice?: number;
  discount?: number;
  isPromotion?: boolean;
  image: string;
  categoryId: string;
  subcategoryId: string;
  stock: number;
  inStock: boolean;
  rating: number;
  reviews: number;
  isFeatured: boolean;
  ivaRate: number;
}

export interface ProductFilter {
  search?: string;
  category?: string;
  subcategory?: string;
  priceMin?: number;
  priceMax?: number;
  sortBy?: string;
  inStockOnly?: boolean;
  onPromotion?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$ = this.productsSubject.asObservable();

  // Mock products for fallback
  private mockProducts: Product[] = [
    {
      id: '1',
      name: 'Arroz Africano Premium',
      categoryId: 'mercearia',
      subcategoryId: 'cereaisgraos',
      price: 12.99,
      costPrice: 9.09,
      originalPrice: 15.99,
      discount: 18,
      isPromotion: true,
      image: 'https://via.placeholder.com/300x300?text=Arroz&bg=FFD700',
      description: 'Arroz de alta qualidade proveniente de Moçambique',
      stock: 50,
      inStock: true,
      rating: 4.5,
      reviews: 23,
      isFeatured: true,
      ivaRate: 23
    },
    {
      id: '2',
      name: 'Peixe Fresco Salgado',
      categoryId: 'peixaria',
      subcategoryId: 'peixefresco',
      price: 18.50,
      costPrice: 12.95,
      image: 'https://via.placeholder.com/300x300?text=Peixe&bg=87CEEB',
      description: 'Peixe fresco salgado, importado diariamente',
      stock: 30,
      inStock: true,
      rating: 4.8,
      reviews: 45,
      isFeatured: true,
      ivaRate: 23
    },
    {
      id: '3',
      name: 'Carne de Cabra Premium',
      categoryId: 'talho',
      subcategoryId: 'carnesvermelhas',
      price: 22.99,
      costPrice: 16.09,
      originalPrice: 24.99,
      discount: 8,
      isPromotion: true,
      image: 'https://via.placeholder.com/300x300?text=Carne&bg=FF6347',
      description: 'Carne de cabra de primeira qualidade',
      stock: 20,
      inStock: true,
      rating: 4.7,
      reviews: 34,
      isFeatured: false,
      ivaRate: 23
    },
    {
      id: '4',
      name: 'Óleo de Palma Orgânico',
      categoryId: 'mercearia',
      subcategoryId: 'oleostemperos',
      price: 16.75,
      costPrice: 11.73,
      image: 'https://via.placeholder.com/300x300?text=Óleo&bg=FFA500',
      description: 'Óleo de palma orgânico, essencial na gastronomia',
      stock: 40,
      inStock: true,
      rating: 4.6,
      reviews: 28,
      isFeatured: true,
      ivaRate: 23
    },
    {
      id: '5',
      name: 'Manteiga de Karité',
      categoryId: 'cosmeticos',
      subcategoryId: 'oleosmanteigas',
      price: 14.99,
      costPrice: 10.49,
      originalPrice: 18.99,
      discount: 21,
      isPromotion: true,
      image: 'https://via.placeholder.com/300x300?text=Manteiga&bg=DEB887',
      description: 'Manteiga de Karité pura, 100% natural',
      stock: 35,
      inStock: true,
      rating: 4.9,
      reviews: 56,
      isFeatured: true,
      ivaRate: 23
    },
    {
      id: '6',
      name: 'Sal Tradicional Africano',
      categoryId: 'mercearia',
      subcategoryId: 'oleostemperos',
      price: 8.99,
      costPrice: 6.29,
      image: 'https://via.placeholder.com/300x300?text=Sal&bg=FFFFFF',
      description: 'Sal tradicional africano para temperos',
      stock: 60,
      inStock: true,
      rating: 4.4,
      reviews: 18,
      isFeatured: false,
      ivaRate: 23
    }
  ];

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  /**
   * Load all products from API or mock data
   */
  loadProducts(): void {
    this.http
      .get<Product[]>(this.apiUrl)
      .pipe(
        tap(products => this.productsSubject.next(products)),
        catchError(() => {
          // Fallback to mock products if API fails
          this.productsSubject.next(this.mockProducts);
          return of(this.mockProducts);
        })
      )
      .subscribe();
  }

  /**
   * Get all products
   */
  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  /**
   * Get products with filters
   */
  getProductsWithFilters(filters: ProductFilter): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.apiUrl, {
        params: this.buildParams(filters)
      })
      .pipe(
        catchError(() => of(this.applyFiltersLocal(this.mockProducts, filters)))
      );
  }

  /**
   * Get single product by ID
   */
  getProductById(id: string): Observable<Product> {
    const product = this.mockProducts.find(p => p.id === id);
    if (product) {
      return of(product);
    }
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create new product (Admin)
   */
  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      tap(() => this.loadProducts())
    );
  }

  /**
   * Update product (Admin)
   */
  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product).pipe(
      tap(() => this.loadProducts())
    );
  }

  /**
   * Delete product (Admin)
   */
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadProducts())
    );
  }

  /**
   * Get featured products
   */
  getFeaturedProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.apiUrl}?isFeatured=true`)
      .pipe(
        catchError(() =>
          of(this.mockProducts.filter(p => p.isFeatured))
        )
      );
  }

  /**
   * Search products
   */
  searchProducts(query: string): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.apiUrl}?searchQuery=${query}`)
      .pipe(
        catchError(() =>
          of(
            this.mockProducts.filter(p =>
              p.name.toLowerCase().includes(query.toLowerCase())
            )
          )
        )
      );
  }

  /**
   * Build query params from filters
   */
  private buildParams(filters: ProductFilter): HttpParams {
    let params = new HttpParams();

    if (filters.search) {
      params = params.set('searchQuery', filters.search);
    }
    if (filters.category) {
      params = params.set('categories', filters.category);
    }
    if (filters.subcategory) {
      params = params.set('subcategory', filters.subcategory);
    }
    if (filters.priceMin !== undefined) {
      params = params.set('minPrice', filters.priceMin.toString());
    }
    if (filters.priceMax !== undefined) {
      params = params.set('maxPrice', filters.priceMax.toString());
    }
    if (filters.sortBy) {
      params = params.set('sortBy', filters.sortBy);
    }
    if (filters.inStockOnly) {
      params = params.set('inStockOnly', 'true');
    }
    if (filters.onPromotion) {
      params = params.set('onPromotion', 'true');
    }

    return params;
  }

  /**
   * Apply filters locally on mock data
   */
  private applyFiltersLocal(products: Product[], filters: ProductFilter): Product[] {
    return products.filter(product => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (!product.name.toLowerCase().includes(searchLower) &&
            !product.description.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Category filter
      if (filters.category && product.categoryId !== filters.category) {
        return false;
      }

      // Subcategory filter
      if (filters.subcategory && product.subcategoryId !== filters.subcategory) {
        return false;
      }

      // Price range
      if (filters.priceMin !== undefined && product.price < filters.priceMin) {
        return false;
      }
      if (filters.priceMax !== undefined && product.price > filters.priceMax) {
        return false;
      }

      // Stock filter
      if (filters.inStockOnly && !product.inStock) {
        return false;
      }

      // Promotion filter
      if (filters.onPromotion && !product.isPromotion) {
        return false;
      }

      return true;
    });
  }
}
