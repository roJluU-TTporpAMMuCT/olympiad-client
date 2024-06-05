'use client'

import React, { useEffect, useState } from 'react';
import {apiService} from "@/api/api";
import Editor from '@monaco-editor/react';


export default function Solve({params}: any) {
    const [code, setCode] = useState('');
    const [lang, setLang] = useState(params.lang == 'js' ? 'javascript' : params.lang);
    const [testCode, setTestCode] = useState('');
    const data = apiService.getTranslation(params.name, params.lang);
    data.then((res) =>{
        setTestCode(res.visibleTestCode);
    })


    const handleSubmit = async (e) => {
        e.preventDefault();

        const solution = {
            code
        };

        const res = await apiService.solveQuest(params.name, params.lang, solution);

        if (res.ok) {
            alert('Quest Solved successfully!');
        } else {
            const bad = await res.json();
            alert(bad.text);
        }
    };

    return (
        <div className="min-h-screen items-center justify-between bg-gray-50 py-30 px-4 sm:px-6 lg:px-8">
            <div className="w-full space-y-6">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Submit a Solution for {params.name}</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="flex">
                        <div>
                            <Editor
                                id="code"
                                name="code"
                                height="70vh"
                                width="105vh"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                defaultLanguage={lang}
                                defaultValue="// your solution here"
                                value={code}
                                onChange={(e) => setCode(e)}
                            />
                        </div>
                        <div>
                            <Editor
                                id="code"
                                name="code"
                                height="70vh"
                                width="105vh"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                defaultLanguage={lang}
                                defaultValue={testCode}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Submit Solution
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};