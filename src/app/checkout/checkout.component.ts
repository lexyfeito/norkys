import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {UUID} from 'angular2-uuid';
import {HttpClient} from '@angular/common/http';

declare let SqPaymentForm;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit {

  paymentForm;
  constructor(private el: ElementRef, private httpClient: HttpClient) { }

  ngOnInit() {
    this.el.nativeElement.ownerDocument.body.style.backgroundColor = '#f6f6f6';
  }

  ngAfterViewInit(): void {
    this.paymentForm = new SqPaymentForm({
      applicationId: 'sandbox-sq0idb-U0un15oS0VKjs0EvjkzrAg',
      inputClass: 'sq-input',
      autoBuild: false,
      // Customize the CSS for SqPaymentForm iframe elements
      inputStyles: [{
        fontSize: '14px',
        padding: '11px',
        placeholderColor: '#a0a0a0',
        backgroundColor: 'transparent',
      }],
      // Initialize the credit card placeholders
      cardNumber: {
        elementId: 'sq-card-number',
        placeholder: 'SQ Card Number'
      },
      cvv: {
        elementId: 'sq-cvv',
        placeholder: 'CVV'
      },
      expirationDate: {
        elementId: 'sq-expiration-date',
        placeholder: 'MM/YY'
      },
      postalCode: {
        elementId: 'sq-postal-code',
        placeholder: 'Postal'
      },
      // SqPaymentForm callback functions
      callbacks: {
        /*
        * callback function: cardNonceResponseReceived
        * Triggered when: SqPaymentForm completes a card nonce request
        */
        cardNonceResponseReceived: (errors, nonce, cardData) => {
          if (errors) {
            // Log errors from nonce generation to the browser developer console.
            console.error('Encountered errors:');
            errors.forEach((error) => {
              console.error('  ' + error.message);
            });
            alert('Encountered errors, check browser developer console for more details');
            return;
          }

          const uuid = UUID.UUID();
          const body = {
            amount_money: {
              amount: 200, // TODO set amount
              currency: 'USD'
            },
            source_id: nonce
          };

          this.httpClient.post('http://localhost:3000/process-payment', body)
            .subscribe(res => console.log(res), error => {
              console.log(error);
            });
        }
      }
    });
    this.paymentForm.build();
  }

  pay() {
    this.paymentForm.requestCardNonce();
  }
}
