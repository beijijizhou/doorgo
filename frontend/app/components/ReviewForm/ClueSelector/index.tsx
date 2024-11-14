/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState } from 'react';
import { predefinedClues } from '../interfaces';
import { sendReview } from '@/app/api/review/reviewAPI';
import useStore from '@/app/store';
import { ReviewData } from '@/app/store/interfaces';
export default function ClueSelector() {
    const { destinationData } = useStore.getState();
    const [selectedClues, setSelectedClues] = useState<string[]>([]);
    const [additionalDescriptions, setAdditionalDescriptions] = useState<{ [key: string]: string }>({});
    const [review, setReview] = useState<string>("");

    // Handle checkbox change
    const handleCheckboxChange = (clue: string): void => {
        setSelectedClues((prevSelected) =>
            prevSelected.includes(clue)
                ? prevSelected.filter(item => item !== clue)
                : [...prevSelected, clue]
        );

        // Initialize the additional description for the clue if it is selected
        if (!selectedClues.includes(clue)) {
            setAdditionalDescriptions((prev) => ({ ...prev, [clue]: '' }));
        } else {
            // Remove the additional description if the clue is unselected
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [clue]: _, ...rest } = additionalDescriptions; // Destructure to remove the clue
            setAdditionalDescriptions(rest);
        }
    };

    // Handle input change for each clue
    const handleInputChange = (clue: string, event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        setAdditionalDescriptions((prev) => ({
            ...prev,
            [clue]: value
        }));
    };
    const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        console.log(value)
        setReview(value);
    };
    // Handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();


        // Prepare the data to send to the backend
        const newReview: ReviewData = {
            clueDescriptions: additionalDescriptions,
            review,
            likes:0,
        };
        destinationData!.reviewData = newReview
        // console.log(dataToSend)
        await sendReview(destinationData!);
        // Send the data to the backend
    };


    return (
        <div >
            <form onSubmit={handleSubmit}>
                <h1 className="text-5xl font-bold">Review Form</h1>
                <h2>Select Clues</h2>
                {predefinedClues.map((clue, index) => (
                    <div key={index}>
                        <label>
                            <input
                                type="checkbox"
                                value={clue}
                                checked={selectedClues.includes(clue)}
                                onChange={() => handleCheckboxChange(clue)}
                            />
                            {clue}
                        </label>
                        {selectedClues.includes(clue) && (
                            <div>
                                <label className="block font-bold mb-2">
                                    Additional Description:
                                    <input
                                        type="text"
                                        value={additionalDescriptions[clue] || ''}
                                        onChange={(event) => handleInputChange(clue, event)}
                                        className="w-full p-1 mt-1 border border-gray-300 rounded bg-gray-50 text-sm focus:border-blue-500 focus:outline-none"
                                    />
                                </label>
                            </div>
                        )}
                    </div>
                ))}
                <div>
                    <label className="block font-bold mb-2">
                        Review:
                        <input
                            type="text"
                            value={review}
                            onChange={(event) => handleReviewChange(event)}
                            className="w-full p-1 mt-1 border border-gray-300 rounded bg-gray-50 text-sm focus:border-blue-500 focus:outline-none"
                        />
                    </label>
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white font-semibold">
                        Submit
                    </button>

                </div>

            </form >

        </div >

    );
};

