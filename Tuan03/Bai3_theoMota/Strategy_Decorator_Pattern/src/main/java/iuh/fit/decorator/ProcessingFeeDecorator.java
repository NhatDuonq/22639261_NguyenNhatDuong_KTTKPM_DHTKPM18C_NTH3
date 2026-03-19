package iuh.fit.decorator;
import iuh.fit.payment.Payment;

public class ProcessingFeeDecorator extends PaymentDecorator {
    public ProcessingFeeDecorator(Payment payment) { super(payment); }

    @Override
    public double getAmount() {
        return super.getAmount() + 5000; // Cộng thêm phí 5k
    }

    @Override
    public String getDescription() {
        return super.getDescription() + " + Phí xử lý (5.000)";
    }
}