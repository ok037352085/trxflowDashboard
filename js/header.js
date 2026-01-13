const UserStatusText = {
    beforeEnabled: "一般用戶",
    afterEnabled: "進階用戶"
}

function renderUserStatus(elementId) {
    const el = document.getElementById(elementId)
    if(!el) return
    
    const isEnabled = AppState.user.isServiceEnabled

    el.textContent = isEnabled
    ? UserStatusText.afterEnabled
    : UserStatusText.beforeEnabled

    el.classList.toggle('is-enabled', isEnabled)
}
 
function renderHeader() {
  renderUserStatus('userStatusText')
  renderUserStatus('account_security_user_states')
}

function initMemberToggle() {
  const toggleBtn = document.getElementById('toggleMemberBtn')
  if (!toggleBtn) return

  toggleBtn.addEventListener('click', async () => {
    AppState.user.isServiceEnabled = !AppState.user.isServiceEnabled

    const newPage = getDefaultPage()
    AppState.currentPage = newPage

    renderSidebar()
    bindSidebarEvents()
    await loadPage(newPage)
    initCardsAfterPageLoad()
  })
}

