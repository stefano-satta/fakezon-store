import {Component, computed, inject, OnDestroy, OnInit} from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {CartService} from '../../services/cart-service';
import {FormsModule} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';
import {InputNumber, InputNumberInputEvent} from 'primeng/inputnumber';
import {Icon} from '../../components/common/icon/icon';
import {ICON} from '../../../utils/icon';
import {Button} from 'primeng/button';
import {ProductService} from '../../services/product-service';
import {PaymentMethod} from '../../components/common/payment-method/payment-method';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {GratefulPaymentModal} from '../../components/common/modals/grateful-payment-modal/grateful-payment-modal';

@Component({
  selector: 'app-cart-page',
  imports: [
    TranslatePipe,
    FormsModule,
    CurrencyPipe,
    InputNumber,
    Icon,
    Button,
    PaymentMethod,
  ],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss'
})
export class CartPage implements OnInit, OnDestroy {
  private readonly cartService = inject(CartService);
  private readonly productService = inject(ProductService);
  private readonly dialogService = inject(DialogService);
  private readonly translateService = inject(TranslateService);
  protected currentCart = computed(() => this.cartService.cart());
  protected getTotal = computed(() => this.cartService.totalToPayCart());
  protected readonly ICON = ICON;
  private refDialog: DynamicDialogRef | undefined;

  ngOnInit(): void {
    console.log('close ', this.refDialog?.close());
  }

  remove(idProduct: number) {
    this.cartService.removeProduct(idProduct);
  }

  onChangeProdQuantity(idProduct: number, qty: InputNumberInputEvent) {
    console.log('change qty ', qty)
    this.cartService.changeQuantityProductById(idProduct, Number(qty.value));
  }

  showModalPayment() {
    this.refDialog = this.dialogService.open(GratefulPaymentModal, {
      header: this.translateService.instant('modal.grateful_payment.title'),
      modal: true,
      closable: true,
      width: '50%',
      baseZIndex: 10000,
      inputValues: {
        message: 'Sei sicuro di voler eliminare questo elemento dal carrello?',
      },
    });

    this.refDialog?.onClose.subscribe((result) => {
      console.log('onClose !', result);
    });
  }

  ngOnDestroy() {
    if (this.refDialog) {
      this.refDialog.close();
    }
  }
}
