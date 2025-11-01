import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';
import * as CheckoutActions from '../../../store/checkout/checkout.actions';
import * as CheckoutSelectors from '../../../store/checkout/checkout.selectors';
import * as CartSelectors from '../../../store/cart/cart.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { PostalCodeService } from '../../../core/services/postal-code.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-6xl mx-auto px-4">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ 'checkout.title' | translate }}</h1>
          <p class="text-gray-600">{{ 'checkout.subtitle' | translate }}</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <!-- Step Indicator -->
            <div class="mb-8 bg-white rounded-lg p-6 shadow-sm">
              <div class="flex items-center justify-between">
                <div *ngFor="let step of [1,2,3,4]; let last = last" 
                     class="flex items-center"
                     [class.flex-1]="!last">
                  <div class="flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg"
                       [class.bg-primary]="step <= ((currentStep$ | async) ?? 1)"
                       [class.text-white]="step <= ((currentStep$ | async) ?? 1)"
                       [class.bg-gray-200]="step > ((currentStep$ | async) ?? 1)"
                       [class.text-gray-600]="step > ((currentStep$ | async) ?? 1)">
                    {{ step }}
                  </div>
                  <div *ngIf="!last" class="flex-1 h-1 mx-2"
                       [class.bg-primary]="step < ((currentStep$ | async) ?? 1)"
                       [class.bg-gray-200]="step >= ((currentStep$ | async) ?? 1)"></div>
                </div>
              </div>
              <div class="mt-4 flex justify-between text-sm">
                <span class="font-medium">{{ 'checkout.address' | translate }}</span>
                <span class="font-medium">{{ 'checkout.delivery' | translate }}</span>
                <span class="font-medium">{{ 'checkout.payment' | translate }}</span>
                <span class="font-medium">{{ 'checkout.confirmation' | translate }}</span>
              </div>
            </div>

            <!-- Step 1: Delivery Address -->
            <div *ngIf="(currentStep$ | async) === 1" class="bg-white rounded-lg p-6 shadow-sm">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                {{ 'checkout.selectAddress' | translate }}
              </h2>

              <!-- Existing Addresses -->
              <div *ngIf="(addresses$ | async)?.length! > 0" class="mb-8">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">
                  {{ 'checkout.savedAddresses' | translate }}
                </h3>
                <div class="space-y-3">
                  <label *ngFor="let address of (addresses$ | async)"
                         class="block p-4 border-2 rounded-lg cursor-pointer transition-all"
                         [class.border-primary]="address.id === (selectedAddressId$ | async)"
                         [class.bg-primary-light]="address.id === (selectedAddressId$ | async)"
                         [class.border-gray-200]="address.id !== (selectedAddressId$ | async)"
                         [class.bg-white]="address.id !== (selectedAddressId$ | async)">
                    <input type="radio" 
                           name="address" 
                           [value]="address.id"
                           [checked]="address.id === (selectedAddressId$ | async)"
                           (change)="onSelectAddress(address.id)"
                           class="hidden">
                    <div class="flex justify-between items-start">
                      <div>
                        <h4 class="font-semibold text-gray-900">{{ address.name }}</h4>
                        <p class="text-gray-600 text-sm mt-1">
                          {{ address.street }}, {{ address.number }}
                          <span *ngIf="address.complement">, {{ address.complement }}</span>
                        </p>
                        <p class="text-gray-600 text-sm">
                          {{ address.postalCode }} {{ address.city }}, {{ address.country }}
                        </p>
                      </div>
                      <span *ngIf="address.isDefault" class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        {{ 'checkout.default' | translate }}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Add New Address Form -->
              <div class="border-t pt-8">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">
                  {{ 'checkout.addNewAddress' | translate }}
                </h3>
                <form [formGroup]="addressForm" (ngSubmit)="onAddAddress()" class="space-y-4">
                  <div class="grid grid-cols-2 gap-4">
                    <div class="col-span-2">
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        {{ 'checkout.addressName' | translate }}
                      </label>
                      <input type="text" 
                             formControlName="name"
                             placeholder="{{ 'checkout.addressNamePlaceholder' | translate }}"
                             class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        {{ 'checkout.street' | translate }}
                      </label>
                      <input type="text" 
                             formControlName="street"
                             placeholder="{{ 'checkout.streetPlaceholder' | translate }}"
                             class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        {{ 'checkout.number' | translate }}
                      </label>
                      <input type="text" 
                             formControlName="number"
                             placeholder="{{ 'checkout.numberPlaceholder' | translate }}"
                             class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                    </div>
                    <div class="col-span-2">
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        {{ 'checkout.complement' | translate }} ({{ 'checkout.optional' | translate }})
                      </label>
                      <input type="text" 
                             formControlName="complement"
                             placeholder="{{ 'checkout.complementPlaceholder' | translate }}"
                             class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        {{ 'checkout.city' | translate }}
                      </label>
                      <input type="text" 
                             formControlName="city"
                             placeholder="{{ 'checkout.cityPlaceholder' | translate }}"
                             class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        {{ 'checkout.postalCode' | translate }}
                      </label>
                      <input type="text" 
                             formControlName="postalCode"
                             placeholder="{{ 'checkout.postalCodePlaceholder' | translate }}"
                             class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                    </div>
                  </div>
                  <div class="flex items-center">
                    <input type="checkbox" 
                           formControlName="isDefault"
                           id="setDefault"
                           class="w-4 h-4 text-primary rounded focus:ring-primary">
                    <label for="setDefault" class="ml-2 text-sm text-gray-700">
                      {{ 'checkout.setAsDefault' | translate }}
                    </label>
                  </div>
                  <button type="submit" 
                          [disabled]="!addressForm.valid"
                          class="w-full bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {{ 'checkout.addAddress' | translate }}
                  </button>
                </form>
              </div>

              <!-- Navigation Buttons -->
              <div class="flex justify-between mt-8 pt-6 border-t">
                <button (click)="goBack()" 
                        class="px-6 py-3 text-gray-700 font-semibold hover:bg-gray-100 rounded-lg transition-colors">
                  {{ 'checkout.back' | translate }}
                </button>
                <button (click)="onNextStep()" 
                        [disabled]="!(canProceedToStep2$ | async)"
                        class="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {{ 'checkout.next' | translate }}
                </button>
              </div>
            </div>

            <!-- Step 2: Delivery Method -->
            <div *ngIf="(currentStep$ | async) === 2" class="bg-white rounded-lg p-6 shadow-sm">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                {{ 'checkout.selectDelivery' | translate }}
              </h2>
              <div class="space-y-4">
                <label *ngFor="let method of (deliveryMethods$ | async)"
                       class="block p-6 border-2 rounded-lg cursor-pointer transition-all"
                       [class.border-primary]="method.id === (selectedDeliveryMethodId$ | async)"
                       [class.bg-primary-light]="method.id === (selectedDeliveryMethodId$ | async)"
                       [class.border-gray-200]="method.id !== (selectedDeliveryMethodId$ | async)"
                       [class.bg-white]="method.id !== (selectedDeliveryMethodId$ | async)">
                  <input type="radio" 
                         name="delivery" 
                         [value]="method.id"
                         [checked]="method.id === (selectedDeliveryMethodId$ | async)"
                         (change)="onSelectDeliveryMethod(method.id)"
                         class="hidden">
                  <div class="flex justify-between items-start">
                    <div>
                      <h4 class="text-lg font-semibold text-gray-900">{{ method.name }}</h4>
                      <p class="text-gray-600 text-sm mt-1">{{ method.description }}</p>
                      <p class="text-gray-500 text-xs mt-2">{{ method.estimatedDays }}</p>
                    </div>
                    <div class="text-right">
                      <p class="text-2xl font-bold text-primary">
                        {{ method.cost === 0 ? ('checkout.free' | translate) : (method.cost | currency: 'EUR':'symbol':'1.2-2') }}
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              <!-- Navigation Buttons -->
              <div class="flex justify-between mt-8 pt-6 border-t">
                <button (click)="onPreviousStep()" 
                        class="px-6 py-3 text-gray-700 font-semibold hover:bg-gray-100 rounded-lg transition-colors">
                  {{ 'checkout.back' | translate }}
                </button>
                <button (click)="onNextStep()" 
                        [disabled]="!(canProceedToStep3$ | async)"
                        class="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {{ 'checkout.next' | translate }}
                </button>
              </div>
            </div>

            <!-- Step 3: Payment Method -->
            <div *ngIf="(currentStep$ | async) === 3" class="bg-white rounded-lg p-6 shadow-sm">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                {{ 'checkout.selectPayment' | translate }}
              </h2>
              <div class="space-y-4">
                <label *ngFor="let method of (paymentMethods$ | async)"
                       class="block p-6 border-2 rounded-lg cursor-pointer transition-all"
                       [class.border-primary]="method.id === (selectedPaymentMethodId$ | async)"
                       [class.bg-primary-light]="method.id === (selectedPaymentMethodId$ | async)"
                       [class.border-gray-200]="method.id !== (selectedPaymentMethodId$ | async)"
                       [class.bg-white]="method.id !== (selectedPaymentMethodId$ | async)">
                  <input type="radio" 
                         name="payment" 
                         [value]="method.id"
                         [checked]="method.id === (selectedPaymentMethodId$ | async)"
                         (change)="onSelectPaymentMethod(method.id)"
                         class="hidden">
                  <div class="flex items-start">
                    <div>
                      <h4 class="text-lg font-semibold text-gray-900">{{ method.name }}</h4>
                      <p class="text-gray-600 text-sm mt-1">{{ method.description }}</p>
                    </div>
                  </div>
                </label>
              </div>

              <!-- Navigation Buttons -->
              <div class="flex justify-between mt-8 pt-6 border-t">
                <button (click)="onPreviousStep()" 
                        class="px-6 py-3 text-gray-700 font-semibold hover:bg-gray-100 rounded-lg transition-colors">
                  {{ 'checkout.back' | translate }}
                </button>
                <button (click)="onCreateOrder()" 
                        [disabled]="!(canProceedToStep4$ | async) || (isLoading$ | async)"
                        class="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <span *ngIf="!(isLoading$ | async)">{{ 'checkout.placeOrder' | translate }}</span>
                  <span *ngIf="isLoading$ | async">{{ 'checkout.processing' | translate }}...</span>
                </button>
              </div>
            </div>

            <!-- Step 4: Order Confirmation -->
            <div *ngIf="(currentStep$ | async) === 4" class="bg-white rounded-lg p-6 shadow-sm">
              <div class="text-center mb-8">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 class="text-3xl font-bold text-gray-900">{{ 'checkout.orderConfirmed' | translate }}</h2>
                <p class="text-gray-600 mt-2">{{ 'checkout.confirmationMessage' | translate }}</p>
              </div>

              <!-- Order Summary -->
              <div *ngIf="(order$ | async) as order" class="bg-gray-50 rounded-lg p-6 space-y-6">
                <!-- Order Number -->
                <div class="border-b pb-4">
                  <p class="text-sm text-gray-600">{{ 'checkout.orderNumber' | translate }}</p>
                  <p class="text-2xl font-bold text-gray-900">{{ order.orderNumber }}</p>
                </div>

                <!-- Delivery Address -->
                <div class="border-b pb-4">
                  <h3 class="font-semibold text-gray-900 mb-2">{{ 'checkout.deliveryAddressLabel' | translate }}</h3>
                  <p class="text-gray-600">{{ order.address.name }}</p>
                  <p class="text-gray-600">{{ order.address.street }}, {{ order.address.number }}</p>
                  <p *ngIf="order.address.complement" class="text-gray-600">{{ order.address.complement }}</p>
                  <p class="text-gray-600">{{ order.address.postalCode }} {{ order.address.city }}</p>
                </div>

                <!-- Delivery Method -->
                <div class="border-b pb-4">
                  <h3 class="font-semibold text-gray-900 mb-2">{{ 'checkout.deliveryMethodLabel' | translate }}</h3>
                  <p class="text-gray-600">{{ order.deliveryMethod.name }}</p>
                  <p class="text-sm text-gray-500">{{ 'checkout.estimatedDelivery' | translate }}: {{ order.estimatedDelivery | date: 'dd MMMM yyyy' }}</p>
                </div>

                <!-- Payment Method -->
                <div class="border-b pb-4">
                  <h3 class="font-semibold text-gray-900 mb-2">{{ 'checkout.paymentMethodLabel' | translate }}</h3>
                  <p class="text-gray-600">{{ order.paymentMethod.name }}</p>
                </div>

                <!-- Order Total -->
                <div class="bg-white rounded-lg p-4 border-2 border-primary">
                  <div class="flex justify-between mb-2">
                    <span class="text-gray-700">{{ 'checkout.subtotalLabel' | translate }}</span>
                    <span class="text-gray-900">{{ order.subtotal | currency: 'EUR':'symbol':'1.2-2' }}</span>
                  </div>
                  <div class="flex justify-between mb-2">
                    <span class="text-gray-700">{{ 'checkout.taxLabel' | translate }}</span>
                    <span class="text-gray-900">{{ order.tax | currency: 'EUR':'symbol':'1.2-2' }}</span>
                  </div>
                  <div class="flex justify-between mb-2">
                    <span class="text-gray-700">{{ 'checkout.deliveryFeeLabel' | translate }}</span>
                    <span class="text-gray-900">{{ order.deliveryFee | currency: 'EUR':'symbol':'1.2-2' }}</span>
                  </div>
                  <div *ngIf="order.discount > 0" class="flex justify-between mb-2 text-green-600">
                    <span>{{ 'checkout.discountLabel' | translate }}</span>
                    <span>-{{ order.discount | currency: 'EUR':'symbol':'1.2-2' }}</span>
                  </div>
                  <div class="border-t-2 border-gray-200 pt-2 mt-2 flex justify-between font-bold text-lg">
                    <span class="text-gray-900">{{ 'checkout.totalLabel' | translate }}</span>
                    <span class="text-primary">{{ order.total | currency: 'EUR':'symbol':'1.2-2' }}</span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex justify-between mt-8 pt-6 border-t">
                <button (click)="continueShopping()" 
                        class="px-6 py-3 text-primary font-semibold border-2 border-primary hover:bg-primary hover:text-white rounded-lg transition-colors">
                  {{ 'checkout.continueShopping' | translate }}
                </button>
                <button (click)="confirmOrder()" 
                        [disabled]="isLoading$ | async"
                        class="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <span *ngIf="!(isLoading$ | async)">{{ 'checkout.confirmOrder' | translate }}</span>
                  <span *ngIf="isLoading$ | async">{{ 'checkout.processing' | translate }}...</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Order Summary Sidebar -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg p-6 shadow-sm sticky top-20 space-y-6">
              <h3 class="text-xl font-bold text-gray-900">{{ 'checkout.orderSummary' | translate }}</h3>

              <!-- Cart Items -->
              <div class="border-b pb-4 space-y-2 max-h-64 overflow-y-auto">
                <div *ngFor="let item of (cartItems$ | async); let i = index" 
                     class="flex justify-between items-start text-sm">
                  <div class="flex-1">
                    <p class="font-medium text-gray-900">{{ item.name }}</p>
                    <p class="text-gray-500">{{ item.quantity }}x</p>
                  </div>
                  <p class="font-medium text-gray-900">
                    {{ (item.price * item.quantity) | currency: 'EUR':'symbol':'1.2-2' }}
                  </p>
                </div>
              </div>

              <!-- Totals -->
              <div class="space-y-2 text-sm">
                <div class="flex justify-between text-gray-700">
                  <span>{{ 'checkout.subtotalLabel' | translate }}:</span>
                  <span class="font-semibold">{{ (cartSubtotal$ | async) | currency: 'EUR':'symbol':'1.2-2' }}</span>
                </div>
                <div class="flex justify-between text-gray-700">
                  <span>{{ 'checkout.taxLabel' | translate }} (13%):</span>
                  <span class="font-semibold">{{ (cartTax$ | async) | currency: 'EUR':'symbol':'1.2-2' }}</span>
                </div>
                <div class="flex justify-between text-gray-700">
                  <span>{{ 'checkout.deliveryFeeLabel' | translate }}:</span>
                  <span class="font-semibold">{{ (deliveryFee$ | async) | currency: 'EUR':'symbol':'1.2-2' }}</span>
                </div>
                <div *ngIf="(cartDiscount$ | async)! > 0" class="flex justify-between text-green-600">
                  <span>{{ 'checkout.discountLabel' | translate }}:</span>
                  <span class="font-semibold">-{{ (cartDiscount$ | async) | currency: 'EUR':'symbol':'1.2-2' }}</span>
                </div>
              </div>

              <!-- Total -->
              <div class="border-t pt-4 bg-gray-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
                <div class="flex justify-between items-center">
                  <span class="text-lg font-bold text-gray-900">{{ 'checkout.totalLabel' | translate }}:</span>
                  <span class="text-2xl font-bold text-primary">
                    {{ ((checkoutTotal$ | async) ?? 0) | currency: 'EUR':'symbol':'1.2-2' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  currentStep$ = this.store.select(CheckoutSelectors.selectCurrentStep);
  addresses$ = this.store.select(CheckoutSelectors.selectAllAddresses);
  selectedAddressId$ = this.store.select(CheckoutSelectors.selectSelectedAddressId);
  deliveryMethods$ = this.store.select(CheckoutSelectors.selectAllDeliveryMethods);
  selectedDeliveryMethodId$ = this.store.select(CheckoutSelectors.selectSelectedDeliveryMethodId);
  paymentMethods$ = this.store.select(CheckoutSelectors.selectAllPaymentMethods);
  selectedPaymentMethodId$ = this.store.select(CheckoutSelectors.selectSelectedPaymentMethodId);
  order$ = this.store.select(CheckoutSelectors.selectOrder);
  isLoading$ = this.store.select(CheckoutSelectors.selectIsLoading);
  error$ = this.store.select(CheckoutSelectors.selectError);
  
  canProceedToStep2$ = this.store.select(CheckoutSelectors.selectCanProceedToStep2);
  canProceedToStep3$ = this.store.select(CheckoutSelectors.selectCanProceedToStep3);
  canProceedToStep4$ = this.store.select(CheckoutSelectors.selectCanProceedToStep4);

  cartItems$ = this.store.select(CartSelectors.selectCartItemsWithDetails);
  cartSubtotal$ = this.store.select(CartSelectors.selectCartSubtotal);
  cartTax$ = this.store.select(CartSelectors.selectCartTax);
  cartDiscount$ = this.store.select(CartSelectors.selectCartDiscount);
  deliveryFee$ = this.store.select(CheckoutSelectors.selectDeliveryMethodCost);
  checkoutTotal$ = this.store.select(CartSelectors.selectCartTotal);

  addressForm: FormGroup;
  postalCodeError: string | null = null;

  constructor(
    private store: Store<any>,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private postalCodeService: PostalCodeService
  ) {
    this.addressForm = this.fb.group({
      name: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, this.almadaPostalCodeValidator.bind(this)]],
      isDefault: [false]
    });
  }

  /**
   * Custom validator for Almada postal codes
   */
  private almadaPostalCodeValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null; // Let required validator handle empty values
    }

    if (!this.postalCodeService.isValidAlmadaPostalCode(control.value)) {
      this.postalCodeError = this.postalCodeService.getErrorMessage(control.value);
      return { invalidAlmadaPostalCode: true };
    }

    this.postalCodeError = null;
    return null;
  }

  ngOnInit(): void {
    // Load initial data
    this.store.dispatch(CheckoutActions.loadAddresses());

    // Get step from route parameter
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        if (params['step']) {
          this.store.dispatch(CheckoutActions.setCurrentStep({ step: parseInt(params['step']) }));
        }
      });

    // Calculate checkout total
    this.store.select(state => ({
      subtotal: (state.cart as any).subtotal,
      tax: (state.cart as any).tax,
      discount: (state.cart as any).discount,
      deliveryFee: (state.checkout as any).selectedDeliveryMethodId 
        ? (state.checkout as any).deliveryMethods.find((m: any) => m.id === (state.checkout as any).selectedDeliveryMethodId)?.cost || 0
        : 0
    }))
    .pipe(takeUntil(this.destroy$))
    .subscribe(totals => {
      const total = (totals as any).subtotal + (totals as any).tax + (totals as any).deliveryFee - (totals as any).discount;
      this.checkoutTotal$ = new Promise(resolve => resolve(total)) as any;
    });
  }

  onSelectAddress(addressId: string): void {
    this.store.dispatch(CheckoutActions.selectAddress({ addressId }));
  }

  onAddAddress(): void {
    if (this.addressForm.valid) {
      this.store.dispatch(
        CheckoutActions.addAddress({
          address: {
            name: this.addressForm.value.name,
            street: this.addressForm.value.street,
            number: this.addressForm.value.number,
            complement: this.addressForm.value.complement || '',
            city: this.addressForm.value.city,
            postalCode: this.addressForm.value.postalCode,
            country: 'Portugal',
            isDefault: this.addressForm.value.isDefault
          }
        })
      );
      this.addressForm.reset();
    }
  }

  onSelectDeliveryMethod(methodId: string): void {
    this.store.dispatch(CheckoutActions.selectDeliveryMethod({ deliveryMethodId: methodId }));
  }

  onSelectPaymentMethod(methodId: string): void {
    this.store.dispatch(CheckoutActions.selectPaymentMethod({ paymentMethodId: methodId }));
  }

  onNextStep(): void {
    this.store.dispatch(CheckoutActions.nextStep());
  }

  onPreviousStep(): void {
    this.store.dispatch(CheckoutActions.previousStep());
  }

  onCreateOrder(): void {
    this.store.dispatch(CheckoutActions.createOrder());
  }

  confirmOrder(): void {
    this.order$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(order => {
        if (order) {
          this.store.dispatch(CheckoutActions.confirmOrder({ orderId: order.id }));
        }
      });
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }

  goBack(): void {
    this.router.navigate(['/cart']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
