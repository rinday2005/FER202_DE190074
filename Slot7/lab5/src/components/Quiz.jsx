import React, { useReducer } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { quizData } from '../data/quizData';
import Question from './Question';

const initialState = {
    currentQuestion: 0,
    score: 0,
    showScore: false,
    selectedOption: ''
};

const quizReducer = (state, action) => {
    switch (action.type) {
        case 'SELECT_OPTION':
            return {
                ...state,
                selectedOption: action.payload
            };
        case 'NEXT_QUESTION':
            const isCorrect = state.selectedOption === quizData[state.currentQuestion].answer;
            const nextQuestion = state.currentQuestion + 1;

            if (nextQuestion < quizData.length) {
                return {
                    ...state,
                    score: isCorrect ? state.score + 1 : state.score,
                    currentQuestion: nextQuestion,
                    selectedOption: ''
                };
            } else {
                return {
                    ...state,
                    score: isCorrect ? state.score + 1 : state.score,
                    showScore: true
                };
            }
        case 'RESET_QUIZ':
            return initialState;
        default:
            return state;
    }
};

function Quiz() {
    const [state, dispatch] = useReducer(quizReducer, initialState);

    const handleOptionSelect = (option) => {
        dispatch({ type: 'SELECT_OPTION', payload: option });
    };

    const handleNextQuestion = () => {
        dispatch({ type: 'NEXT_QUESTION' });
    };

    const resetQuiz = () => {
        dispatch({ type: 'RESET_QUIZ' });
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Quiz Page</h2>
            {state.showScore ? (
                <Card className="text-center p-4 shadow-sm">
                    <Card.Body>
                        <h3>You scored {state.score} out of {quizData.length}</h3>
                        <Button variant="primary" onClick={resetQuiz} className="mt-3">
                            Play Again
                        </Button>
                    </Card.Body>
                </Card>
            ) : (
                <>
                    <Question
                        questionData={quizData[state.currentQuestion]}
                        selectedOption={state.selectedOption}
                        onOptionSelect={handleOptionSelect}
                    />
                    <div className="mt-3 text-center">
                        <Button
                            variant="primary"
                            onClick={handleNextQuestion}
                            disabled={!state.selectedOption}
                        >
                            {state.currentQuestion === quizData.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                        <div className="mt-2 text-muted">
                            Question {state.currentQuestion + 1} of {quizData.length}
                        </div>
                    </div>
                </>
            )}
        </Container>
    );
}

export default Quiz;
