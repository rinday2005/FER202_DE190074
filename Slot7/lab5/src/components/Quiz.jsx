import React, { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { quizData } from '../data/quizData';
import Question from './Question';

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleNextQuestion = () => {
        if (selectedOption === quizData[currentQuestion].answer) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quizData.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedOption('');
        } else {
            setShowScore(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setSelectedOption('');
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Quiz Page</h2>
            {showScore ? (
                <Card className="text-center p-4 shadow-sm">
                    <Card.Body>
                        <h3>You scored {score} out of {quizData.length}</h3>
                        <Button variant="primary" onClick={resetQuiz} className="mt-3">
                            Play Again
                        </Button>
                    </Card.Body>
                </Card>
            ) : (
                <>
                    <Question
                        questionData={quizData[currentQuestion]}
                        selectedOption={selectedOption}
                        onOptionSelect={handleOptionSelect}
                    />
                    <div className="mt-3 text-center">
                        <Button
                            variant="primary"
                            onClick={handleNextQuestion}
                            disabled={!selectedOption}
                        >
                            {currentQuestion === quizData.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                        <div className="mt-2 text-muted">
                            Question {currentQuestion + 1} of {quizData.length}
                        </div>
                    </div>
                </>
            )}
        </Container>
    );
}

export default Quiz;
