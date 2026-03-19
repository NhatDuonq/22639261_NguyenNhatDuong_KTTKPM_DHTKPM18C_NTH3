package iuh.fit.state;
import iuh.fit.context.Order;

public class PaidState implements OrderState {
    @Override
    public void next(Order order) {
        order.setState(new ShippedState());
        System.out.println("Đơn hàng đã được giao cho đơn vị vận chuyển.");
    }
    @Override
    public void cancel(Order order) {
        System.out.println("Đã thanh toán! Đang hoàn tiền và hủy đơn.");
    }
    @Override
    public void printStatus() {
        System.out.println("Trạng thái: ĐÃ THANH TOÁN.");
    }
}