package iuh.fit.state;
import iuh.fit.context.Order;

public class CancelledOrder implements OrderState {
    @Override
    public void handleRequest(Order order) {
        System.out.println("[Hành vi]: Đơn hàng đã bị hủy. Đang thực hiện hoàn tiền...");
    }

    @Override
    public String getStatusName() { return "ĐÃ HỦY"; }
}