function initClipboard() {
  let toastLock = false;

  document.addEventListener('click', e => {
    const btn = e.target.closest('.copy-btn');
    if (!btn || toastLock) return;

    toastLock = true;
    const input = document.querySelector('.clipboard');
    if(!input) return;

    navigator.clipboard.writeText(input.value).then(() => {
      showSuccessToast('已複製', '邀請連結已複製到剪貼簿');
      setTimeout(() => (toastLock = false), 1000);
    });
  });
}

function showSuccessToast(title, body) {
  $(document).Toasts('create', {
    class: 'bg-success',
    title,
    body,
    autohide: true,
    delay: 1200
  });
}
