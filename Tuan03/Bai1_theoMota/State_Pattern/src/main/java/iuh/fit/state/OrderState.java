package iuh.fit.state;

import iuh.fit.context.Order;

public interface OrderState {
    void handleRequest(Order order); // Hành vi chính của mỗi trạng thái
    String getStatusName();          // Trả về tên trạng thái để hiển thị
}