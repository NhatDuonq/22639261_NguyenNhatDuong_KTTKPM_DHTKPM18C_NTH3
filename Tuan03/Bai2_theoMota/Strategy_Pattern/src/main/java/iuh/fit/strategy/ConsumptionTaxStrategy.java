package iuh.fit.strategy;

public class ConsumptionTaxStrategy implements TaxStrategy {
    @Override
    public double calculateTax(double price) {
        return price * 0.05;
    }

    @Override
    public String getTaxType() { return "Thuế Tiêu thụ (5%)"; }
}