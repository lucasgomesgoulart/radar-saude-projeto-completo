import React, { useCallback, useEffect } from 'react';
import { Input, Form, Table, Button, Modal, DatePicker, Select, Space, Spin } from 'antd';
import { useState } from 'react';
import api from '../../api'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { ContainerBotoes, ButtonCustom, Selectantd, Picker, InputCustom, TableAntd, ContainerForm } from './/style.js'



const Formulario = () => {
    const { Option } = Select;
    const [dataSource, setDataSource] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [datebirthday, setDatebirthday] = useState('')
    const [phone, setPhone] = useState('')
    const [sex, setSex] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false)
    const [id, setId] = useState('')

    //MODAL
    const showModal = (editing, record) => {
        setIsModalOpen(true)
        setEditMode(editing)
        if (record) {
            setName(record.name)
            setEmail(record.email)
            setDatebirthday(dayjs(record.datebirthday))
            setPhone(record.phone)
            setSex(record.sex)
            setId(record.user_id)
        } else {
            setName('')
            setEmail('')
            setDatebirthday('')
            setPhone('')
            setSex('')
            setId('')
        }
    };

    const handleOk = () => {
        if (editMode) {
            updateUser()
        } else {

            onRegisterPressed()
        }
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // FIM MODAL

    // SELECT ANTD
    const selectChange = (value) => {
        setSex(value)
    }

    // DatePicker ANTD
    function onChangePicker(dateString) {
        setDatebirthday(dateString)
    }


    // listando usuarios
    const findUsers = useCallback((filter = '') => {
        api.get(`/select?name=${filter}`).then((response) => {
            setDataSource(response.data)
        })
            .catch(() => {
                console.log('erro')
            })
    }, [])

    useEffect(() => {
        findUsers()
    }, [findUsers])

    const onRegisterPressed = async () => {
        try {
            await api.post('/insert', {
                name: name,
                sex: sex,
                datebirthday: datebirthday,
                phone: phone,
                email: email
            }).then(response => {
                if (response.status == 200) {
                    findUsers()
                }
            })
        } catch {
            return


        }
    }

    // TABLE ANTD
    const columns = [
        {
            key: 'name',
            title: 'Full name',
            dataIndex: 'name'
        },
        {
            key: 'email',
            title: 'Email',
            dataIndex: 'email'
        },
        {
            key: 'datebirthday',
            title: 'Date birthday',
            dataIndex: 'datebirthday'
        },
        {
            key: 'phone',
            title: 'Phone',
            dataIndex: 'phone'
        },
        {
            key: 'sex',
            title: 'Sex',
            dataIndex: 'sex'
        },
        {
            key: 'action',
            title: 'Actions',
            render: (record) => {
                return <>
                    <EditOutlined onClick={() => showModal(true, record)} style={{ color: 'blue', marginRight: '25px', fontSize: 20 }} />
                    <DeleteOutlined onClick={() => onDelete(record)} style={{ color: 'red', fontSize: 20 }} />
                </>
            }
        }
    ]

    const onDelete = async (record) => {
        Modal.confirm({
            title: 'Are you sure you want to delete it?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                api.delete(`deletar/${record.user_id}`).then(() => {
                    findUsers()
                })
            }
        })
    }

    const updateUser = async () => {
        const data = await api.put(`update/${id}`, {
            name,
            email,
            sex,
            phone,
            datebirthday
        })

        if (data.status === 200) {
            findUsers()
        }
    }




    return (
        <ContainerForm>
            <Modal open={isModalOpen} closable={true} okText={editMode ? 'Edit' : 'Add'} onOk={handleOk} onCancel={handleCancel}>
                <Form labelcol={{ span: 8 }} wrapperCol={{ span: 14 }}>
                    <Form.Item name="name" rules={[
                        {
                            required: true,
                            message: 'Please enter your name',
                            type: 'string',
                            min: 3
                        }
                    ]}>
                        <InputCustom value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} />
                    </Form.Item>

                    <Form.Item name="email" rules={[
                        {
                            required: true,
                            message: 'Please put a valid email',
                            type: 'email'
                        }
                    ]}>
                        <InputCustom value={email} placeholder='Ex: person@gmail.com' onChange={(e) => setEmail(e.target.value)} />
                    </Form.Item>

                    <Form.Item name="sex" rules={[
                        {
                            required: true,
                            message: 'Please choose your sex',
                            type: 'string'
                        }
                    ]}>
                        <Selectantd value={sex} placeholder='Your sex' onChange={selectChange}>
                            <Option value="m">Masculine</Option>
                            <Option value="f">Feminine</Option>
                        </Selectantd>
                    </Form.Item>

                    <Form.Item name="phone" rules={[
                        {
                            required: true,
                            min: 11,
                        }
                    ]}>
                        <InputCustom value={phone} placeholder='Ex: 48 984849980' onChange={(e) => setPhone(e.target.value)} />
                    </Form.Item>

                    <Form.Item name="datebirthday" on rules={[
                        {
                            required: true,
                            message: 'Ops, you miss here!',
                            type: 'date'
                        }
                    ]}>
                        <Picker placeholder='Your Birthday' format={"DD/MM/YYYY"} value={datebirthday} onChange={onChangePicker} />
                    </Form.Item>

                </Form>
            </Modal>
            <TableAntd
                columns={columns}
                dataSource={dataSource}
                pagination={true}
            >
            </TableAntd>
            <ContainerBotoes>
                <ButtonCustom
                    type='primary'
                    onClick={() => showModal(false, undefined)}
                >
                    Add New
                </ButtonCustom>

                <Input placeholder='Search user by name' onChange={e => {
                    const text = e.target.value
                    findUsers(text)
                }}
                />
            </ContainerBotoes>
        </ContainerForm >
    )
}

export default Formulario
