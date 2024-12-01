import { LeftOutlined } from '@ant-design/icons';
import { Flex, Skeleton, Space, Button } from 'antd';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { MenuModel } from '../models/menu';

const menuApi = import.meta.env.VITE_PRODUCTS_API;

type Params = {
    id: string;
};

export default function MenuInfo() {
    const [item, setItem] = useState<MenuModel | null>(null);
    const { id } = useParams<Params>();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(menuApi + id)
            .then(res => res.json())
            .then(data => {
                setItem(data)
                console.log(data);
                
            });
    }, []);

    return (
        <div>
            <Button onClick={() => navigate(-1)} color="default" variant="text" icon={<LeftOutlined />}></Button>
            {
                item ?
                    <div>

                        <h2>{item.name}</h2>
                        <p>{item.date}</p>
                        <p>{item.dayWeek}</p>

                        <hr />
                        {/* <Image
                            width={200}
                            src={item.imageUrl}
                        /> */}
                        <p>Bread: {item.breadName}</p>
                        <p>Salad: {item.saladName}</p>
                        <p>FirstDishes: {item.firstDishesName}</p>
                        <p>Garnish: {item.garnishName}</p>
                        <p>MeatDishes: {item.meatDishesName}</p>
                        <p>Drinkc: {item.drinkcName}</p>
                        <p>Archived: {item.archived}</p>






                        {/* <p>Discount: {item.discount}%</p>
                        <p>Availability: {item.quantity > 0 ?
                            <Tag color="green">{item.quantity}</Tag>
                            :
                            <Tag color="volcano">Out of Stock</Tag>}</p>

                        <p>{item.description}</p> */}
                    </div>
                    :
                    <Flex gap="middle" vertical>
                        <Space>
                            <Skeleton.Input active />
                            <Skeleton.Input active />
                        </Space>
                        <Skeleton
                            paragraph={{
                                rows: 0,
                            }}
                        />
                        <Skeleton.Image />
                        <Skeleton active />
                    </Flex>
            }
        </div >
    )
}