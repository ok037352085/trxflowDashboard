window.ProgressManager = (() => {
  let usageBar, progressText

  function init() {
    usageBar = document.getElementById('usageBar');
    progressText = document.getElementById('progress-text');
  }

  function update(value, max = window.AppState.user?.maxProgress || 3) {
    if(!usageBar) usageBar = document.getElementById('usageBar')
    if(!progressText) progressText = document.getElementById('progress-text')
    if(!usageBar || !progressText) return

    const percent = (value / max) * 100;
    usageBar.style.width = `${percent}%`;
    usageBar.setAttribute('aria-valuenow', value);
    progressText.textContent = `${value} / ${max}`;
  }
  function initProgress() {
    init()
    update(0)
  }
  
  return { init, update, initProgress }
})()


