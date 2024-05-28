
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export default class StripeService {
    private stripe: Stripe;
    
    constructor(
        private configService: ConfigService
    ) {
        this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
            apiVersion: '2024-04-10',
        });
    }
    public async createCustomer(name: string, email: string) {
        return this.stripe.customers.create({
            name,
            email
        });
    }
    public async payment (){ 
            const paymentIntent = await this.stripe.paymentIntents.create({
              currency: "EUR",
              amount: 1999,
              automatic_payment_methods: { enabled: true },
            });
        
            // Send publishable key and PaymentIntent details to client
            return{
                clientSecret: paymentIntent.client_secret,
            }; 
    }
    public async charge(amount: number, paymentMethodId: string, customerId: string) { 
        return this.stripe.paymentIntents.create({
            amount,
            customer: customerId,
            payment_method: paymentMethodId,
            currency: this.configService.get('STRIPE_CURRENCY'),
            confirm: true,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never',
            },
        })
    }
}