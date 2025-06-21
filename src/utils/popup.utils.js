export class PopupUtils {
  static popup(message, type = 'info', duration = 6000) {
    const popup = document.createElement('div');
    popup.className = `notification notification-${type}`;
    popup.textContent = message;

    document.body.appendChild(popup);

    setTimeout(() => {
      popup.remove();
    }, duration);
  }
}