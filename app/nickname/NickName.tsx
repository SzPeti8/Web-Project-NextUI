'use client';
import {
    Button,
    Input,
} from "@nextui-org/react";
import React, { useState, useEffect } from 'react';
import pb from '../authentication/PocketBaseClient';

import { RecordModel as PocketBaseRecordModel } from "pocketbase";


interface RecordModel extends PocketBaseRecordModel {
    id: string;
    user_id: string;
    user_nickname: string;
}


export default function NickName(userid: { string: any }) {
    const [items, setItems] = useState<RecordModel[]>([]);


    const [isSecondInputVisible, setisSecondInputVisible] = useState(true)
    const [inputValue, setInputValue] = useState("");
    const [Button1_DefaultValue, setButton1_DefaultValue] = useState("");
    const [Button2_DefaultValue, setButton2_DefaultValue] = useState("");
    const [isExist, setIsexist] = useState(false)
    const [isDeleteAllVisible, setisDeleteAllVisible] = useState(true)
    const [isSaveVisible, setisSaveVisible] = useState(true)
    const [isDeleteOneVisible, setisDeleteOneVisible] = useState(true)

    async function fetchData() {
        try {

            let page = 1;
            const perPage = 50; // Maximum limit per page
            let allItems: any[] = [];
            let hasMore = true;

            while (hasMore) {
                const result = await pb.collection("nickNames").getList(page, perPage, {
                    filter: `user_id = "${userid.string}"`,
                    fields: "id,user_id,user_nickname1,user_nickname2",
                });

                allItems = allItems.concat(result.items);

                if (result.items.length < perPage) {
                    hasMore = false; // No more items to fetch
                } else {
                    page++;
                }
            }



            setItems(allItems as RecordModel[]);
            if (allItems.length > 0) {
                setIsexist(true)
                setisDeleteAllVisible(false)
                if(allItems[0].user_nickname1.toString()!=""){
                    setButton1_DefaultValue(allItems[0].user_nickname1.toString())
                    setisSecondInputVisible(false)
                    
                }
                
                if(allItems[0].user_nickname2.toString()!=""){
                    setButton2_DefaultValue(allItems[0].user_nickname2.toString())
                    setisDeleteOneVisible(false)
                }
               
            }
            else{
                setisSecondInputVisible(true)
            }
            
        } catch (error) {
            console.error("Error fetching data: for Nickname", error);
        }
    }

    useEffect(() => {
        

        fetchData();
    }, []);

    const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setButton1_DefaultValue(

            value
        );
        if(value == ""){
            setisSaveVisible(true);
            setisSecondInputVisible(true)
        }
        else{setisSaveVisible(false);setisSecondInputVisible(false) }
    }
    const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setButton2_DefaultValue(

            value
        );
        if(value == ""){
            setisDeleteOneVisible(true)
        }
        else{
            setisDeleteOneVisible(false)
            setisSaveVisible(false)
        }
    }
    const handleSubmitNick = async () => {
        
        try {
            const data = {
                "user_id": userid.string,
                "user_nickname1": Button1_DefaultValue,
                "user_nickname2": Button2_DefaultValue
            };
            if (isExist) {
                
                const record = await pb.collection('nickNames').update(items[0].id, data);
                console.log("Record UPDATED:", record); // Sikeres update után a válasz
                
            } else {
                const record = await pb.collection('nickNames').create(data);
                console.log("Record created:", record); // Sikeres mentés után a válasz
                setIsexist(true)
                fetchData();
            }

        } catch (error) {
            console.error("Error creating record:", error); // Hiba kezelése
        }
    };

    async function handleDelete() {
        
        await pb.collection('nickNames').delete(items[0].id);
        setButton1_DefaultValue("")
        setButton2_DefaultValue("")
        setisDeleteAllVisible(true)
        fetchData
        setIsexist(false)
        setisSaveVisible(true)
        setisDeleteOneVisible(true)
        setisSecondInputVisible(true)

    }

    async function handleDelete2() {
        setButton2_DefaultValue("")
        const data = {
            "user_id": userid.string,
            "user_nickname1": Button1_DefaultValue,
            "user_nickname2": ""
        };
        if (isExist) {
                
            const record = await pb.collection('nickNames').update(items[0].id, data);
            console.log("Record UPDATED:", record); // Sikeres update után a válasz
            
        }
        setisDeleteOneVisible(true)
        


    }

    return (
        <form >
            <div className="w-full flex flex-col gap-4">

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-default-500 text-small">Becenevek: </h3>
                        <div>
                        <Input value={Button1_DefaultValue} onChange={handleInputChange1} placeholder="Becenév 1" />
                        <Button isDisabled ={isDeleteAllVisible} size="sm" color="danger" onPress={() => { handleDelete() }} >
                            Összes törlése
                        </Button>
                        </div>
                        <div>
                        <Input isDisabled={isSecondInputVisible} value={Button2_DefaultValue} onChange={handleInputChange2} placeholder="Becenév 2" />
                        <Button isDisabled ={isDeleteOneVisible} size="sm" color="danger" onPress={() => { handleDelete2() }} >
                            Törlés
                        </Button>
                        </div>
                        <Button isDisabled ={isSaveVisible} size="sm" color="success" onPress={() => {  handleSubmitNick() }} >
                            Mentés
                        </Button>
                    </div >

                </div>

            </div>
        </form>
    )
}