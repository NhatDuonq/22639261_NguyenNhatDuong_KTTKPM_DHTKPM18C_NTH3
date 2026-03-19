package iuh.fit.decorator;
import iuh.fit.payment.Payment;

public abstract class PaymentDecorator implements Payment {
    protected Payment decoratedPayment;

    public PaymentDecorator(Payment payment) {
        this.decoratedPayment = payment;
    }

    @Override
    public double getAmount() { return decoratedPayment.getAmount(); }

    @Override
    public String getDescription() { return decoratedPayment.getDescription(); }
}