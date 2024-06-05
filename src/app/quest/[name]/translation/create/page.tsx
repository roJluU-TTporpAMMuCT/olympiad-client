'use client'

import React, { useEffect, useState } from 'react';
import {apiService} from "@/api/api";
import Editor from '@monaco-editor/react';


export default function CreateTranslation({params}: any) {
    const [lang, setLang] = useState('');
    const [className, setClassName] = useState('');
    const [timelimit, setTimelimit] = useState('');
    const [sample_solution, setSampleSolution] = useState('');
    const [visibleTestCode, setVisibleTestCode] = useState('');
    const [hiddenTestCode, setHiddenTestCode] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const translation = {
            lang,
            className,
            timelimit,
            sample_solution,
            visibleTestCode,
            hiddenTestCode,
        };

        const res = await apiService.createTranslation(params.name, translation);

        if (res.ok) {
            alert('Translation submitted successfully!');
        } else {
            const bad = await res.json();
            alert(bad.text);
        }
    };

    return (
        <div className="min-h-screen items-center justify-between bg-gray-50 py-30 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">

                <form onSubmit={handleSubmit}>

                    <div className="rounded-md shadow-sm -space-y-px">

                        <div>
                            <label htmlFor="lang" className="sr-only">Programming Language</label>
                            <input
                                id="lang"
                                name="lang"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Programming Language"
                                value={lang}
                                onChange={(e) => setLang(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="className" className="sr-only">Main classname</label>
                            <input
                                id="className"
                                name="className"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Main classname"
                                value={className}
                                onChange={(e) => setClassName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="timelimit" className="sr-only">Execution Time Limit</label>
                            <input
                                id="timelimit"
                                name="timelimit"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Execution Time Limit"
                                value={timelimit}
                                onChange={(e) => setTimelimit(e.target.value)}
                            />
                        </div>
                        <div className="flex">
                            <div>
                                <Editor
                                    id="sample_solution"
                                    name="sample_solution"
                                    height="70vh"
                                    width="105vh"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    defaultLanguage={lang}
                                    defaultValue="// sample solution here"
                                    value={sample_solution}
                                    onChange={(e) => setSampleSolution(e)}
                                />
                            </div>
                            <div>
                                <Editor
                                    id="visibleTestCode"
                                    name="visibleTestCode"
                                    height="70vh"
                                    width="105vh"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    defaultLanguage={lang}
                                    defaultValue="// test code here"
                                    value={visibleTestCode}
                                    onChange={(e) => setVisibleTestCode(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Submit Translation
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};