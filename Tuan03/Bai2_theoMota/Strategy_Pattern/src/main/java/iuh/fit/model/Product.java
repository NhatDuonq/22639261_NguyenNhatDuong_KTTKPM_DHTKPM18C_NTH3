package iuh.fit.model;

import iuh.fit.strategy.TaxStrategy;

public class Product {
    private String name;
    private double price;
    private TaxStrategy taxStrategy;

    public Product(String name, double price, TaxStrategy taxStrategy) {
        this.name = name;
        this.price = price;
        this.taxStrategy = taxStrategy;
    }

    public void setTaxStrategy(TaxStrategy taxStrategy) {
        this.taxStrategy = taxStrategy;
    }

    public double calculateTotalPrice() {
        double tax = taxStrategy.calculateTax(price);
        System.out.println("Sản phẩm: " + name + " | Giá: " + price +
                " | Loại thuế: " + taxStrategy.getTaxType() + " | Thuế: " + tax);
        return price + tax;
    }
}