import { useEffect, useState } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    FormProps,
    Input,
    InputNumber,
    message,
    Select,
    Space,
    DatePicker
} from 'antd';
import { useNavigate } from 'react-router-dom';
import type { DatePickerProps } from 'antd';
//import { DatePicker, Space } from 'antd';
// import { CategoryModel, CategoryOption } from '../models/categories';
import { SelectItemModel, SelectOption } from '../models/bread';
import { MenuFormField } from '../models/menu';
//import { DatePicker } from '../../node_modules/antd/es/index';

const { TextArea } = Input;

// const normFile = (e: any) => {
//     if (Array.isArray(e)) {
//         return e[0];
//     }
//     return e?.file;
// };

const menuApi = import.meta.env.VITE_API_URL;

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
};

const CreateaMenu = () => {

    const navigate = useNavigate();
    const [bread, setBreads] = useState<SelectOption[]>([]);
    const [salads, setSalads] = useState<SelectOption[]>([]);
    const [firstDishess, setFirstDishes] = useState<SelectOption[]>([]);
    const [meatDishess, setMeatDishess] = useState<SelectOption[]>([]);
    const [garnishs, setGarnishs] = useState<SelectOption[]>([]);
    const [drinkcs, setDrinkcs] = useState<SelectOption[]>([]);




    useEffect(() => {
        fetch(menuApi + '/Bread/all').then(res => res.json()).then(data => {
            const items = data as SelectItemModel[];
            setBreads(items.map(x => { return { label: x.name, value: x.id } }));
        });
        fetch(menuApi + '/Salad/all').then(res => res.json()).then(data => {
            const items = data as SelectItemModel[];
            setSalads(items.map(x => { return { label: x.name, value: x.id } }));
        });
        fetch(menuApi + '/FirstDishes/all').then(res => res.json()).then(data => {
            const items = data as SelectItemModel[];
            setFirstDishes(items.map(x => { return { label: x.name, value: x.id } }));
        });
        fetch(menuApi + '/MeatDishes/all').then(res => res.json()).then(data => {
            const items = data as SelectItemModel[];
            setMeatDishess(items.map(x => { return { label: x.name, value: x.id } }));
        });
        fetch(menuApi + '/Garnish/all').then(res => res.json()).then(data => {
            const items = data as SelectItemModel[];
            setGarnishs(items.map(x => { return { label: x.name, value: x.id } }));
        });

        fetch(menuApi + '/Drinkc/all').then(res => res.json()).then(data => {
            const items = data as SelectItemModel[];
            setDrinkcs(items.map(x => { return { label: x.name, value: x.id } }));
        });
    }, []);

    const onSubmit: FormProps<MenuFormField>['onFinish'] = (item) => {
        console.log(item);

        // TODO: upload to server
        fetch(menuApi + "/Menu", {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res => {
            if (res.status === 200) {
                message.success("Menu created successfuly!");
                navigate(-1);
            }
            else {
                res.json().then(res => {
                    const msg = res.errors[Object.keys(res.errors)[0]][0];
                    message.error(msg);
                })
            }
        })

    }
    return (
        <>
            <Button onClick={() => navigate(-1)} color="default" variant="text" icon={<LeftOutlined />}></Button>
            <h2>Create New Menu</h2>

            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"

                style={{
                    maxWidth: 600,
                }}
                onFinish={onSubmit}
            >
                <Form.Item<MenuFormField> label="Title" name="name"
                    rules={[
                        {
                            required: true,
                            // message: 'Please input!',
                        },
                    ]}>

                
                    <Input />
                </Form.Item>
                <Form.Item<MenuFormField> label="Name" name="name">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<MenuFormField> label="Date" name="date">
                    <DatePicker onChange={onChange} />
                </Form.Item>
                <Form.Item<MenuFormField> label="DayWeek" name="dayWeek">
                    <TextArea rows={1} />
                </Form.Item>
                {/* <Form.Item<MenuFormField> label="DayWeek" name="dayWeek">
                <TextArea rows={4} />
                </Form.Item> */}
                <Form.Item<MenuFormField> label="Bread" name="breadId">
                    <Select options={bread}></Select>
                </Form.Item>
                <Form.Item<MenuFormField> label="Salad" name="saladId">
                    <Select options={salads}></Select>
                </Form.Item>
                <Form.Item<MenuFormField> label="FirstDishes" name="firstDishesId">
                    <Select options={firstDishess}></Select>
                </Form.Item>
                <Form.Item<MenuFormField> label="Garnish" name="garnishId">
                    <Select options={garnishs}></Select>
                </Form.Item>
                <Form.Item<MenuFormField> label="MeatDishes" name="meatDishesId">
                    <Select options={meatDishess}></Select>
                </Form.Item>
                <Form.Item<MenuFormField> label="Drinkc" name="drinkcId">
                    <Select options={drinkcs}></Select>
                </Form.Item>
                {/* <Form.Item<MenuFormField> label="Drinkc" name="drinkcName">
                <Select options={category}></Select>
                </Form.Item> */}
                {/* <Form.Item label="Image" name="image" valuePropName="file" getValueFromEvent={normFile}>
                    <Upload maxCount={1}>
                        <Button icon={<UpCircleOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item> */}
                {/* <Form.Item<MenuFormField> label="Image" name="imageUrl">
                    <Input /> */}
                {/* </Form.Item> */}
                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                >
                    <Space>
                        <Button type="default" htmlType="reset">
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    );
};
export default CreateaMenu;