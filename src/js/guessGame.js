
import React, { useState } from "react";
import '../index.css';
import Words from "./words"; // Assuming Words is an array

export default function GuessArea() {
    const [form, setForm] = useState({
        rightAnswer: Words, // Assuming Words is an array and you want the first word as the answer
        answers: Array(6).fill("").map(() => Array(6).fill("")) // Initialize answers as a 2D array
    });
    const [hintCount, setHintCount] = useState(3); // Use state for hint count
    const [usedHints, setUsedHints] = useState([]); // Array to keep track of used hints
    const [currentTry, setCurrentTry] = useState(0); // Track the current try
    const [rowColors, setRowColors] = useState(Array(6).fill(Array(6).fill(""))); // Colors for each row
    const [isGameOver, setIsGameOver] = useState(false); // Track if the game is over
    const [successMessage, setSuccessMessage] = useState(""); // Message for success

    const handleChange = (event, rowIndex, colIndex) => {
        const value = event.target.value;
        const newAnswers = [...form.answers];
        newAnswers[rowIndex][colIndex] = value; // Update the specific index in the answers array

        setForm(prev => ({
            ...prev,
            answers: newAnswers
        }));
    };

    const handleCheck = () => {
        if (isGameOver) return; // Prevent checks after the game is over

        const userAnswer = form.answers[currentTry].join(""); // Join the current row to form the complete answer
        const rightAnswerArray = form.rightAnswer.split("");
        const newColors = Array(6).fill("red"); // Default color is red

        // Check for correct positions (green)
        for (let i = 0; i < userAnswer.length; i++) {
            if (userAnswer[i] === rightAnswerArray[i]) {
                newColors[i] = "green"; // Correct letter in the correct position
                rightAnswerArray[i] = null; // Mark this letter as used
            }
        }

        // Check for correct letters in wrong positions (yellow)
        for (let i = 0; i < userAnswer.length; i++) {
            if (newColors[i] !== "green" && rightAnswerArray.includes(userAnswer[i])) {
                newColors[i] = "yellow"; // Correct letter but wrong position
                rightAnswerArray[rightAnswerArray.indexOf(userAnswer[i])] = null; // Mark this letter as used
            }
        }

        // Update colors for the current row only
        setRowColors(prev => {
            const newRowColors = [...prev];
            newRowColors[currentTry] = newColors;
            return newRowColors;
        });

        if (userAnswer === form.rightAnswer) {
            setSuccessMessage("تهانينا! لقد ربحت اللعبة!"); // Set success message
            setIsGameOver(true); // Mark the game as over
        } else if (currentTry < 5) {
            setCurrentTry(prev => prev + 1); // Move to the next try if the answer is incorrect
        } else {
            setIsGameOver(true); // End the game after 6 tries
        }
    };

    const handleHint = () => {
        if (hintCount > 0) {
            let hintCheck;
            do {
                hintCheck = Math.floor(Math.random() * form.rightAnswer.length); // Get a random index based on rightAnswer length
            } while (usedHints.includes(hintCheck)); // Ensure we don't repeat used hints
            
            const newAnswers = [...form.answers];
            newAnswers[currentTry][hintCheck] = form.rightAnswer[hintCheck]; // Set the hint in the answer array
            
            setForm(prev => ({
                ...prev,
                answers: newAnswers
            }));
            setUsedHints(prev => [...prev, hintCheck]); // Add the used hint index to the array
            setHintCount(prevCount => prevCount - 1); // Decrement hint count
        } else {
            console.log("لا توجد تلميحات متاحة.");
        }
    };

    const handleKeyDown = (event, rowIndex, colIndex) => {
        if (event.key === 'Enter' || event.key === 'Tab') {
            event.preventDefault();
            const nextColIndex = colIndex + 1;
            if (nextColIndex < 6) {
                document.getElementById(`input-${rowIndex}-${nextColIndex}`).focus(); // Focus on the next input field
            }
        }
    };

    const tries = form.answers.map((answerRow, rowIndex) => (
        <div className='inputRow' key={rowIndex} style={{ backgroundColor: currentTry === rowIndex ? '#e0f7fa' : '#f0f0f0',
            display:"flex",
            justifyContent:"space-around"
        }}>
            <h2>Try {rowIndex + 1}</h2>
            {answerRow.map((value, colIndex) => (
                <input
                    id={`input-${rowIndex}-${colIndex}`} // Unique ID for each input
                    key={colIndex}
                    name="answer"
                    type="text"
                    maxLength={1}
                    value={value} // Bind input value to state
                    onChange={(event) => handleChange(event, rowIndex, colIndex)} // Pass row and column index to handleChange
                    onKeyDown={(event) => handleKeyDown(event, rowIndex, colIndex)} // Handle key down event
                    disabled={currentTry !== rowIndex || isGameOver} // Disable inputs based on currentTry or game status
                    style={{
                        backgroundColor: rowColors[rowIndex][colIndex], // Set background color based on state for current row
                        opacity: currentTry !== rowIndex ? 0.5 : 1 // Set opacity for disabled rows
                    }}
                />
            ))}
        </div>
    ));

    return (
        <div className='game-area'>
            <div className='inputs'
                style={{
                    display:"flex",
                    justifyContent:"space-around"
                }}
            >
                {tries}
            </div>
            <button className='button checkWord' onClick={handleCheck} disabled={isGameOver}>
                Check Word
            </button>
            <button className='button hint' onClick={handleHint} disabled={hintCount === 0 || isGameOver}>
                Hint ({hintCount})
            </button>
            {successMessage && <div style={{ fontSize: "2em", color: "green", marginTop: "20px" }}>{successMessage}</div>}
        </div>
    );
    
}
