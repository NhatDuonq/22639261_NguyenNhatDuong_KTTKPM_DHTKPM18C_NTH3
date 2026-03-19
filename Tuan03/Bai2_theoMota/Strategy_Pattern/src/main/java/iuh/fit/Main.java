package iuh.fit;

import iuh.fit.model.Product;
import iuh.fit.strategy.ConsumptionTaxStrategy;
import iuh.fit.strategy.LuxuryTaxStrategy;
import iuh.fit.strategy.VATTaxStrategy;

public class Main {
    public static void main(String[] args) {
        // Sản phẩm gia dụng áp thuế VAT
        Product milk = new Product("Sữa tươi", 20000, new VATTaxStrategy());
        System.out.println("Tổng cộng: " + milk.calculateTotalPrice() + " VND\n");

        // Sản phẩm xa xỉ áp thuế Luxury
        Product iphone = new Product("iPhone 15 Pro", 30000000, new LuxuryTaxStrategy());
        System.out.println("Tổng cộng: " + iphone.calculateTotalPrice() + " VND\n");

        // Một sản phẩm thay đổi loại thuế tại thời điểm thực thi (Runtime)
        Product wine = new Product("Rượu vang", 500000, new ConsumptionTaxStrategy());
        wine.calculateTotalPrice();

        System.out.println("--- Cập nhật: Áp thêm thuế xa xỉ cho rượu cao cấp ---");
        wine.setTaxStrategy(new LuxuryTaxStrategy());
        wine.calculateTotalPrice();
    }
}