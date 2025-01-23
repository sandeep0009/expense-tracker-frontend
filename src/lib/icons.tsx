import { CircleDollarSign, Menu, Banknote, TrainFront, UtensilsCrossed } from "lucide-react";

export const iconsIdentify = (name: string) => {
    switch (name) {
        case "Salary":
            return <CircleDollarSign />;
        case "Grocery":
            return <Menu />;
        case "Shopping":
            return <Banknote />;
        case "Transportation":
            return <TrainFront />;
        case "Dinning":
            return <UtensilsCrossed />;
        default:
            return null;
    }
};
