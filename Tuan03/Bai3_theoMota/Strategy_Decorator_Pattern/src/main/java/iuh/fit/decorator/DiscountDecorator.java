package iuh.fit.decorator;
import iuh.fit.payment.Payment;

public class DiscountDecorator extends PaymentDecorator {
    private double discountAmount;
    public DiscountDecorator(Payment payment, double discount) {
        super(payment);
        this.discountAmount = discount;
    }

    @Override
    public double getAmount() {
        return super.getAmount() - discountAmount;
    }

    @Override
    public String getDescription() {
        return super.getDescription() + " - Mã giảm giá (" + discountAmount + ")";
    }
}