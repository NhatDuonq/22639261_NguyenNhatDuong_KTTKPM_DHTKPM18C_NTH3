package iuh.fit.context;

import iuh.fit.strategy.PaymentStrategy;

public class ShoppingCart {
    private int totalAmount = 0;

    public void addProduct(int price) {
        this.totalAmount += price;
    }

    // Đây là điểm mấu chốt: Truyền Strategy vào lúc thực thi (Runtime)
    public void checkout(PaymentStrategy paymentMethod) {
        paymentMethod.pay(totalAmount);
    }
}