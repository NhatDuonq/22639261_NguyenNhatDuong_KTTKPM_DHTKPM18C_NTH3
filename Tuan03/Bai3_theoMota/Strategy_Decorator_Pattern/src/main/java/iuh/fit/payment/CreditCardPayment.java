package iuh.fit.payment;

public class CreditCardPayment implements Payment {
    private double amount;
    public CreditCardPayment(double amount) { this.amount = amount; }

    @Override
    public double getAmount() { return amount; }

    @Override
    public String getDescription() { return "Thanh toán qua Thẻ tín dụng (" + amount + ")"; }
}