package iuh.fit.strategy;

public class LuxuryTaxStrategy implements TaxStrategy {
    @Override
    public double calculateTax(double price) {
        return price * 0.2;
    }

    @Override
    public String getTaxType() { return "Thuế Xa xỉ (20%)"; }
}