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

document.addEventListener('DOMContentLoaded', () => {
  // 你原本的初始化程式
  const defaultPage = getDefaultPage()
  AppState.currentPage = defaultPage
  renderSidebar()
  bindSidebarEvents()
  loadPage(defaultPage)

  // -----------------------------
  // 會員狀態切換按鈕
  const toggleBtn = document.getElementById('toggleMemberBtn')
  if(toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      AppState.user.isServiceEnabled = !AppState.user.isServiceEnabled

      // 重算預設頁
      const newPage = getDefaultPage()
      AppState.currentPage = newPage

      // 重新渲染 sidebar + 重新載入頁面
      renderSidebar()
      bindSidebarEvents()
      loadPage(newPage)

      // 可選提示
      alert(`會員狀態已切換為: ${AppState.user.isServiceEnabled ? "啟用" : "未啟用"}`)
    })
  }
})












