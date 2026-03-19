package iuh.fit.decorator;
import iuh.fit.component.MilkTea;

public class BubbleDecorator extends MilkTeaDecorator {
    public BubbleDecorator(MilkTea milkTea) {
        super(milkTea);
    }

    @Override
    public double getCost() {
        return super.getCost() + 5000; // Thêm 5k trân châu
    }

    @Override
    public String getDescription() {
        return super.getDescription() + " + Trân châu";
    }
}