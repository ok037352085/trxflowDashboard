async function initApp() {
  await AppState.fetchUserData();

  const defaultPage = getDefaultPage();
  AppState.currentPage = defaultPage
  renderSidebar()
  bindSidebarEvents()
  initSidebarToggle()
  initClipboard()
  initMemberToggle()

  await loadPage(defaultPage)
  initCardsAfterPageLoad();

  // 初始化進度條文字與寬度
  ProgressManager.initProgress();
}

document.addEventListener('DOMContentLoaded', initApp);

// 全局儲存協作視窗 reference
let collabWindow = null;

// 初始化操作區按鈕
function initOperationArea() {
  const collabBtn = document.getElementById('collabMainBtn')
  const collabHint = document.getElementById('collabHint')

  if (collabBtn) {
    collabBtn.addEventListener('click', async () => {
      console.log('collabMinBtn clicked')
      // 防呆：檢查是否已有協作 session
      if (collabWindow && !collabWindow.closed) {
        collabWindow.focus()       // 聚焦既有視窗
        collabHint.classList.remove('d-none')
        collabHint.textContent = "協作視窗已開啟，請勿重複啟動"
        return
      }

      // 呼叫後端建立協作 session
      try {
        const res = await fetch('/api/collab/start', { method: 'POST' })
        const data = await res.json()

        if (!res.ok || !data.sessionUrl) {
          alert('無法啟動協作，請稍後再試')
          return
        }

        const sessionUrl = data.sessionUrl

        // 嘗試開啟彈窗
        collabWindow = window.open(sessionUrl, '_blank', 'width=1024,height=768')
        
        if (!collabWindow) {
          // 彈窗被阻擋 → 用新分頁開啟
          window.open(sessionUrl, '_blank')
          collabHint.classList.remove('d-none')
          collabHint.textContent = "彈窗被阻擋，已在新分頁開啟協作"
        } else {
          collabHint.classList.remove('d-none')
          collabHint.textContent = "協作視窗已啟動"
        }

        collabBtn.classList.add('active')
        
      } catch (err) {
        console.error(err)
        alert('啟動協作發生錯誤')
      }
    })
  }

  // 前往提領按鈕
  document.querySelectorAll('.operation-buttons [data-page]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      const page = btn.dataset.page
      if (page) goToPage(page)
    })
  })
}

// 監聽頁面 unload，關閉協作視窗 reference
window.addEventListener('beforeunload', () => {
  if (collabWindow && !collabWindow.closed) {
    collabWindow = null
  }
})












