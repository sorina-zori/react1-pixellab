const notificationBar = document.querySelector('.notification-bar');

export const addMessage = (messageElement) => {
  notificationBar.append(messageElement);
  setTimeout(() => {
    clearMessages();
  }, 10000);
};

export const clearMessages = () => {
  notificationBar.innerHTML = '';
};

export default notificationBar;
