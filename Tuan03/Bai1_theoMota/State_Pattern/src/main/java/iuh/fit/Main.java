package iuh.fit;

import iuh.fit.context.Order;
import iuh.fit.state.CancelledOrder;

public class Main {
    public static void main(String[] args) {
        System.out.println("--- MÔ PHỎNG LUỒNG ĐƠN HÀNG THÀNH CÔNG ---");
        Order myOrder = new Order(); // Bắt đầu là Mới tạo

        myOrder.applyAction(); // Thực hiện: Kiểm tra -> Chuyển sang Đang xử lý
        myOrder.applyAction(); // Thực hiện: Đóng gói -> Chuyển sang Đã giao
        myOrder.applyAction(); // Thực hiện: Cập nhật giao hàng thành công

        System.out.println("\n--- MÔ PHỎNG LUỒNG HỦY ĐƠN ---");
        Order cancelOrder = new Order();
        cancelOrder.setState(new CancelledOrder()); // Ép sang trạng thái Hủy
        cancelOrder.applyAction(); // Thực hiện: Hoàn tiền
    }
}