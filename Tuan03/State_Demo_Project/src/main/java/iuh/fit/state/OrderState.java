package iuh.fit.state;

import iuh.fit.context.Order;

public interface OrderState {
    void next(Order order);    // Chuyển sang trạng thái tiếp theo
    void cancel(Order order);  // Hủy đơn hàng
    void printStatus();        // In trạng thái hiện tại
}