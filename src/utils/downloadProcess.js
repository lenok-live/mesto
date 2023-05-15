export default function downloadProcess (isDownload, button) {
  if (isDownload) {
    if (button.textContent.length >= 9) {
      button.textContent = 'Сохранение...';
      
    } else {
      button.textContent = 'Создание...';
    }
  } else {
    if (button.textContent.length >= 11) {
      button.textContent = 'Сохранить';
    } else {
      button.textContent = 'Создать';
    }
  }
}