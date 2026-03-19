package iuh.fit.strategy;

public class MomoStrategy implements PaymentStrategy {
    private String phoneNumber;

    public MomoStrategy(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Override
    public void pay(int amount) {
        System.out.println(amount + " VND đã thanh toán qua ví Momo (SĐT: " + phoneNumber + ")");
    }
}