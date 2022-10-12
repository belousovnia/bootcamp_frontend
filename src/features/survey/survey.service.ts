export const fetchSurvey = () => {
  return fetch('/api/survey').then((res) => res.json());
};
