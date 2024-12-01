import { useEffect, useState } from 'react';
import { Button, DatePicker, message, Popconfirm, Space, Table, TableProps, Tag } from 'antd';
import { AppstoreAddOutlined, DeleteFilled, EditFilled, InfoCircleFilled, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { DatePickerType } from 'antd/es/date-picker';
import { MenuModel } from '../models/menu';

const menuApi = import.meta.env.VITE_PRODUCTS_API;
const menuApii = import.meta.env.VITE_PRODUCTS_APII;

// const api = "https://localhost:7293/api/Menu/";
// interface MenuModel {
//     [x: string]: any;
//     id: number;
//     name: string;
//     date: Date;
//     dayWeek: string;
//     breadName: string;
//     saladName: string;
//     firstDishesName: string;
//     garnishName : string;
//     meatDishesName: string;
//     drinkcName : string;
//     archived : boolean;
// }
const MenuTable = () => {
    const [menu, setMenu] = useState<MenuModel[]>([]);
    const columns: TableProps<MenuModel>['columns'] = [
        // {
        //     title: 'Image',
        //     dataIndex: 'imageUrl',
        //     key: 'image',
        //     render: (_, item) => <img height={50} src={item.imageUrl} alt={item.title}></img>,
        // },
        {
            title: 'Menu',
            dataIndex: 'menu',
            key: 'menu',
            render: (text, item) => <Link to={`/Menu/${item.id}`}>{text}</Link>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => <span>{date}</span>,
        },
        {
            title: 'DayWeek',
            dataIndex: 'dayWeek',
            key: 'dayWeek',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Bread',
            dataIndex: 'breadName',
            key: 'breadName',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Salad',
            dataIndex: 'saladName',
            key: 'saladName',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'FirstDishes',
            dataIndex: 'firstDishesName',
            key: 'firstDishesName',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Garnish',
            dataIndex: 'garnishName',
            key: 'garnishName',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'MeatDishes',
            dataIndex: 'meatDishesName',
            key: 'meatDishesName',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Drinkc',
            dataIndex: 'drinkcName',
            key: 'drinkcName',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Archived',
            dataIndex: 'archived',
            key: 'archived',
            render: (text) => <span>{text}</span>,
        },




        // {
        //     title: 'Stock',
        //     dataIndex: 'quantity',
        //     key: 'stock',
        //     render: (text) =>
        //         text > 0 ?
        //             <Tag color="green">Available</Tag>
        //             :
        //             <Tag color="volcano">Out of Stock</Tag>
        // },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/Menu/${record.id}`}>
                        <Button color="default" variant="outlined" icon={<InfoCircleFilled />} />
                    </Link>
                    <Button style={{ color: '#61916e' }} variant="outlined" icon={<LikeOutlined />} />
                    <Link to={`/edit/${record.id}`}>
                        <Button style={{ color: '#faad14' }} variant="outlined" icon={<EditFilled />} />
                    </Link>
                    <Popconfirm
                        title="Delete the menu"
                        description={`Are you sure to delete ${record.title}?`}
                        onConfirm={() => deleteItem(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button color="danger" variant="outlined" icon={<DeleteFilled />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    // load data from server
    useEffect(() => {
        // fetch(api + "all")
        fetch(menuApi + "all")
            .then(res => res.json())
            .then((data: MenuModel[]) => {
                setMenu(data.sort((x, y) => y.id - x.id));
            });
    }, []);
    const deleteItem = (id: number) => {
        // fetch(api + id, {
            fetch(menuApii + "?id=" + id, {
                method: "DELETE"
            }).then(res => {
                console.log(menuApii);
                if (res.status === 200) {
                    setMenu(menu.filter(x => x.id !== id));
                message.success('Menu deleted successfuly!');
            }
            else
                message.error("Something went wrong!");
        });
    }
    return (
        <>
            <div>
                <Link to="/create">
                    <Button type="primary" icon={<AppstoreAddOutlined />} style={{ marginBottom: '16px' }}>
                        Create New Menu
                    </Button>
                </Link>
            </div>
            <Table columns={columns} dataSource={menu} rowKey="id" />
        </>
    )
}
export default MenuTable;