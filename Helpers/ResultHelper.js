export function checkQuestion(data) {
    const expected = data.question_result.trim().toLowerCase();
    const provided = data.answer_result.trim().toLowerCase();

    const isCorrect = expected === provided;

    const timeParts = data.remaining_time.split(":");
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);
    const remainingSeconds = minutes * 60 + seconds;

    return {
        isCorrect,
        remainingTimeSeconds: remainingSeconds
    };
}