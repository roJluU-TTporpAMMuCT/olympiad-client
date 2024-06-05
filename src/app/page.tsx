'use client'

import React, { useEffect, useState } from 'react';
import {apiService} from "@/api/api";
import Link from "next/link";


export default function Home() {

  const [quests, setQuests] = useState([]);
    const fetchQuests = async () => {
        const data = await apiService.getQuests();
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
        <h1 className="text-center text-2xl font-bold my-4">Available Quests</h1>
        <ul className="list-disc list-inside">
          {quests.map((quest) => (
              <li className="my-2">
                <span className="font-semibold">{quest.name} </span>
                  {quest.translations.map((t) =>(
                      <span className="font-extrabold">
                          <Link href={`/quest/${quest.name}/${t.lang}`}>
                              {t.lang}
                          </Link>
                      </span>
                  ))} - {quest.description}
              </li>
          ))}
        </ul>
      </div>
  );
};
