package iuh.fit.payment;

public class PayPalPayment implements Payment {
    private double amount;
    public PayPalPayment(double amount) { this.amount = amount; }

    @Override
    public double getAmount() { return amount; }

    @Override
    public String getDescription() { return "Thanh toán qua PayPal (" + amount + ")"; }
}