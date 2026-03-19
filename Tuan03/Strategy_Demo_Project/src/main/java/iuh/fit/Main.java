package iuh.fit;

import iuh.fit.context.ShoppingCart;
import iuh.fit.strategy.CreditCardStrategy;
import iuh.fit.strategy.MomoStrategy;

public class Main {
    public static void main(String[] args) {
        ShoppingCart cart = new ShoppingCart();
        cart.addProduct(500000); // Thêm món đồ 500k
        cart.addProduct(200000); // Thêm món đồ 200k

        // Khách hàng chọn thanh toán bằng Thẻ
        System.out.println("--- Lần 1: Dùng Credit Card ---");
        cart.checkout(new CreditCardStrategy("NGUYEN VAN A", "1234-5678"));

        // Khách hàng đổi ý, muốn dùng Momo cho đơn tiếp theo
        System.out.println("\n--- Lần 2: Dùng Momo ---");
        cart.checkout(new MomoStrategy("0901234567"));
    }
}