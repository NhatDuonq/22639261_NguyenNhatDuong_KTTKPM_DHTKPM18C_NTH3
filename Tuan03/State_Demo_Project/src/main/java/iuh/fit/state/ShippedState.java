package iuh.fit.state;
import iuh.fit.context.Order;

public class ShippedState implements OrderState {
    @Override
    public void next(Order order) {
        System.out.println("Đơn hàng đã ở công đoạn cuối, không thể chuyển tiếp.");
    }
    @Override
    public void cancel(Order order) {
        System.out.println("Không thể hủy đơn hàng đã giao.");
    }
    @Override
    public void printStatus() {
        System.out.println("Trạng thái: ĐÃ GIAO HÀNG.");
    }
}