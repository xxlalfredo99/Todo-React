'use client'

import styles from './page.module.css'
import Link from 'next/link'
import  React, { useState, useEffect } from 'react';

import { AddItemForm } from "../components/AddItemForm/AddItemForm"
import { Items } from "../components/Items/Items"

import { deleteItem, addItem, getItems } from "../api/api.mjs";

export default function Home() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getItems().then(setItems);
    }, [])
    
    return (
      <>
        <AddItemForm addItem={(content)=>addItem(content).then(setItems)}/>
        <Items items={items} deleteItem={(id) => deleteItem(id).then(setItems)}/>
      </>
    );
}
