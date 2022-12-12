export const pluralize = (count, { one, many }) => {
  return `${count} ${count > 1 ? many : one}`;
};

//homework
export const clearStage = () => {
  const stage = document.querySelector('.stage');
  stage.innerHTML = '';
};
