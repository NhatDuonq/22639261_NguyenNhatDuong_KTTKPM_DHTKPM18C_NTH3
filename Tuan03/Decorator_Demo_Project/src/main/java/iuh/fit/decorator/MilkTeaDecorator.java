package iuh.fit.decorator;

import iuh.fit.component.MilkTea;

public abstract class MilkTeaDecorator implements MilkTea {
    protected MilkTea decoratedMilkTea; // Đối tượng được bọc

    public MilkTeaDecorator(MilkTea milkTea) {
        this.decoratedMilkTea = milkTea;
    }

    @Override
    public double getCost() {
        return decoratedMilkTea.getCost();
    }

    @Override
    public String getDescription() {
        return decoratedMilkTea.getDescription();
    }
}