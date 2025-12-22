const UserStatusText = {
    beforeEnabled: "註冊會員",
    afterEnabled: "資源回饋已啟用"
}

function renderHeader() {
    const el = document.getElementById('userStatusText')
    if(!el) return
    
    const isEnabled = AppState.user.isServiceEnabled

    el.textContent = isEnabled
    ? UserStatusText.afterEnabled
    : UserStatusText.beforeEnabled

    el.classList.toggle('is-enabled', isEnabled)
}
