package iuh.fit;

import iuh.fit.context.Order;

public class Main {
    public static void main(String[] args) {
        Order myOrder = new Order();

        myOrder.showStatus(); // Đơn hàng mới tạo

        myOrder.nextStep();   // Chuyển sang Paid
        myOrder.showStatus();

        myOrder.nextStep();   // Chuyển sang Shipped
        myOrder.showStatus();

        myOrder.cancelOrder(); // Thử hủy khi đã giao (Sẽ báo không thể hủy)
    }
}