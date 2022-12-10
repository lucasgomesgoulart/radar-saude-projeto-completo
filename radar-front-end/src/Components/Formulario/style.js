import { Input, Form, Table, Button, Modal, DatePicker, Select } from 'antd';
import styled from 'styled-components'

export const ContainerForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 120px;
`

export const TableAntd = styled(Table)`
    /* display: flex; */
    width: 50%;
    `
export const InputCustom = styled(Input)`
    width: 220px;
    margin-top: 15px;
    margin-right: 15px;
    `

export const Picker = styled(DatePicker)`
    width: 315px;
    margin-top: 15px;
    `

export const Selectantd = styled(Select)`
    margin-top: 13px;
    margin-right: 15px;
    size: ;
`

export const ButtonCustom = styled(Button)`
    width: 200px;
`

export const ContainerBotoes = styled.div`
    display: flex;
    flex-direction: row;
    gap: 50px;
`
