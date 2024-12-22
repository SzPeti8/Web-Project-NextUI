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
                if(allItems[0].user_nickname1.toString()!=""){
                    setButton1_DefaultValue(allItems[0].user_nickname1.toString())
                    setisSecondInputVisible(false)
                }
                
                if(allItems[0].user_nickname2.toString()!=""){
                    setButton2_DefaultValue(allItems[0].user_nickname2.toString())
                }
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
    }
    const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setButton2_DefaultValue(

            value
        );
    }
    const handleSubmitNick = async () => {
        console.log(items)
        console.log("Sunmitt")
        console.log(Button1_DefaultValue)

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


    return (
        <form >
            <div className="w-full flex flex-col gap-4">

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-default-500 text-small">Becenevek: </h3>
                        <Input value={Button1_DefaultValue} onChange={handleInputChange1} placeholder="Becenév 1" />
                        <Button size="sm" color="danger" onPress={() => { console.log(items); handleSubmitNick() }} >
                            Törlés
                        </Button>
                        <Input isDisabled={isSecondInputVisible} value={Button2_DefaultValue} onChange={handleInputChange2} placeholder="Becenév 2" />
                    </div >

                </div>

            </div>
        </form>
    )
}