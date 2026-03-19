package iuh.fit;

import iuh.fit.payment.CreditCardPayment;
import iuh.fit.payment.Payment;
import iuh.fit.payment.PayPalPayment;
import iuh.fit.decorator.DiscountDecorator;
import iuh.fit.decorator.ProcessingFeeDecorator;

public class Main {
    public static void main(String[] args) {
        // 1. Khởi tạo thanh toán gốc qua Thẻ (1.000.000)
        Payment order1 = new CreditCardPayment(1000000);

        // 2. Thêm phí xử lý
        order1 = new ProcessingFeeDecorator(order1);

        // 3. Thêm mã giảm giá
        order1 = new DiscountDecorator(order1, 50000);

        System.out.println("CHI TIẾT ĐƠN HÀNG 1:");
        System.out.println(order1.getDescription());
        System.out.println("Tổng tiền cuối cùng: " + order1.getAmount() + " VND");

        System.out.println("\n----------------------------\n");

        // Đơn hàng khác thanh toán qua PayPal và chỉ có phí xử lý
        Payment order2 = new PayPalPayment(500000);
        order2 = new ProcessingFeeDecorator(order2);

        System.out.println("CHI TIẾT ĐƠN HÀNG 2:");
        System.out.println(order2.getDescription());
        System.out.println("Tổng tiền cuối cùng: " + order2.getAmount() + " VND");
    }
}