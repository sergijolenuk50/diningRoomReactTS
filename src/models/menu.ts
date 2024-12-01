export interface MenuModel {
        // [x: string]: any;
        id: number;
        name: string;
        date: Date;
        dayWeek: string;
        breadName: string;
        saladName: string;
        firstDishesName: string;
        garnishName : string;
        meatDishesName: string;
        drinkcName : string;
        archived : boolean;
    }

    export type MenuFormField ={
        // [x: string]: any;
        id?: number;
        name?: string;
        date?: Date;
        dayWeek?: string;
        breadId?: number;
        saladId?: number;
        firstDishesId?: number;
        garnishId?: number;
        meatDishesId?: number;
        drinkcId?: number;
        archived?: boolean;
    }

    