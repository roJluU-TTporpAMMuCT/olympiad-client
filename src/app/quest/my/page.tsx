'use client'

import React, { useEffect, useState } from 'react';
import {apiService} from "@/api/api";
import Link from "next/link";


export default function MyQuests({params}: any) {

    const [quests, setQuests] = useState([]);
    const fetchQuests = async () => {
        const data = await apiService.getUsersQuests();
        setQuests(data);
    };
    useEffect(() => {
        void fetchQuests();
    }, []);

    return (
        <main>
            <div>
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="w-full max-w-2xl p-4 bg-white rounded shadow-md">
                        <QuestList quests={quests} />
                    </div>
                </div>
            </div>
        </main>
    );
}


const QuestList = ({ quests }) => {
    return (
        <div className="quest-list">
            <h1 className="text-center text-2xl font-bold my-4">My Quests</h1>
            <ul className="list-disc list-inside">
                {quests.map((quest) => (
                    <li className="my-2">
                        <span className="font-semibold">{quest.name}</span> - Description: {quest.description}
                        <Link href={`/quest/${quest.name}/translation/create`} className="text-gray-300 hover:text-white">
                            -Add Translation
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};