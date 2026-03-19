package iuh.fit.state;
import iuh.fit.context.Order;

public class NewState implements OrderState {
    @Override
    public void next(Order order) {
        order.setState(new PaidState());
        System.out.println("Đơn hàng đã được thanh toán thành công.");
    }
    @Override
    public void cancel(Order order) {
        System.out.println("Đơn hàng đã bị hủy.");
    }
    @Override
    public void printStatus() {
        System.out.println("Trạng thái: Đơn hàng MỚI TẠO.");
    }
}