export default (message = '', type = 'success') => {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('alert', `alert-${type}`);

  messageContainer.innerText = message;

  return messageContainer;
};
