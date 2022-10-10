export const fetchQuiz = () => {
  return fetch('/api/quiz').then((res) => res.json());
};
