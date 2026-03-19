package iuh.fit.state;
import iuh.fit.context.Order;

public class ProcessingOrder implements OrderState {
    @Override
    public void handleRequest(Order order) {
        System.out.println("[Hành vi]: Đang đóng gói và vận chuyển hàng...");
        order.setState(new ShippedOrder());
    }

    @Override
    public String getStatusName() { return "ĐANG XỬ LÝ"; }
}