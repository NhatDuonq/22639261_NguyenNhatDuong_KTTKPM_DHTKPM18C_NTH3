package iuh.fit.state;
import iuh.fit.context.Order;

public class ShippedOrder implements OrderState {
    @Override
    public void handleRequest(Order order) {
        System.out.println("[Hành vi]: Cập nhật trạng thái: Khách đã nhận hàng thành công.");
    }

    @Override
    public String getStatusName() { return "ĐÃ GIAO"; }
}