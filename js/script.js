async function initApp() {
  await AppState.fetchUserData();

  // initHeaderServiceToggle();

  renderSidebar();
  bindSidebarEvents();
  initSidebarToggle();
  initClipboard();

  const defaultPage = getDefaultPage();
  await loadPage(defaultPage);


  initCardsAfterPageLoad();

  // 初始化進度條文字與寬度
  ProgressManager.initProgress();
}

document.addEventListener('DOMContentLoaded', initApp);











