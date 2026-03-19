package iuh.fit.strategy;

public class VATTaxStrategy implements TaxStrategy {
    @Override
    public double calculateTax(double price) {
        return price * 0.1;
    }

    @Override
    public String getTaxType() { return "Thuế VAT (10%)"; }
}