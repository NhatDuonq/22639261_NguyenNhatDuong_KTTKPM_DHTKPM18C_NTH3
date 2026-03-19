package iuh.fit.context;

import iuh.fit.state.NewOrder;
import iuh.fit.state.OrderState;

public class Order {
    private OrderState currentState;

    public Order() {
        // Trạng thái mặc định khi khởi tạo
        this.currentState = new NewOrder();
    }

    public void setState(OrderState state) {
        this.currentState = state;
        System.out.println("--> Chuyển sang trạng thái: " + state.getStatusName());
    }

    public void applyAction() {
        currentState.handleRequest(this);
    }
}