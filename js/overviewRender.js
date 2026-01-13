window.renderRewardOverview = function (containerId) {
  const container = document.getElementById(containerId)
  if (!container) return

  container.innerHTML = `

          <div class="active-content">

            <!-- 一般會員 -->
            <div class="active-data general-user">
              ${getGeneralOverviewHTML()}
            </div>

            <!-- 進階會員 -->
            <div class="active-data advanced-user">
              ${getAdvancedOverviewHTML()}
            </div>

  `

  syncOverviewByUserState()
}

function getGeneralOverviewHTML() {
  return `
    <!-- 協作回饋 -->
    ${getCoopBlockHTML()}
    <!-- 推薦回饋 -->
    ${getReferralBlockHTML()}
    <!-- 資源回饋（鎖定） -->
    ${getResourceLockedBlockHTML()}
  `
}

function getAdvancedOverviewHTML() {
  return `
    ${getCoopBlockHTML()}
    ${getReferralBlockHTML()}
    ${getResourceUnlockedBlockHTML()}
  `
}

function getCoopBlockHTML() {
  return `
  <div class="data overview-row">
    <div class="overview-left">
      <div class="dashboard-section01-data-title">
        <h3>協作回饋</h3>
        <span>（WEB 在線協作）</span>
      </div>
      <span class="text-muted">預估僅供參考，實際以已入帳為準</span>
    </div>
    <div class="overview-right">
      <div class="value-row">
        <span class="label">當前預估回饋：</span>
        <span class="value">10,000.00 USDT <small>≈ 10,000.00 TRX</small></span>
      </div>
      <div class="value-row">
        <span class="label">實際已計入：</span>
        <span class="value">8,500.00 USDT <small>≈ 8,500.00 TRX</small></span>
      </div>
    </div>
  </div>
  `
}
function getReferralBlockHTML() {
  return `
  <div class="data overview-row">
    <div class="overview-left">
      <div class="dashboard-section01-data-title">
        <h3>推薦回饋</h3>
        <span>（將於次月 1 號結算）</span>
      </div>
      <span class="text-muted">預估僅供參考，實際以已入帳為準</span>
    </div>
    <div class="overview-right">
      <div class="value-row">
        <span class="label">當前預估回饋：</span>
        <span class="value">10,000.00 USDT <small>≈ 10,000.00 TRX</small></span>
      </div>
      <div class="value-row">
        <span class="label">實際已計入：</span>
        <span class="value">8,500.00 USDT <small>≈ 8,500.00 TRX</small></span>
      </div>
    </div>
  </div>
  `
}

function getResourceLockedBlockHTML() {
  return `
  <div class="data overview-row">
    <div class="overview-left">
      <div class="dashboard-section01-data-title">
        <h3>資源回饋</h3>
        <span>（進階用戶 | 質押）</span>
      </div>
      <span class="text-muted">預估僅供參考，實際以已入帳為準</span>
    </div>
    <div class="overview-right">
      <div class="value-row">
        <span class="label">當前預估回饋：</span>
        <span class="value">_____ USDT <small>≈_____ TRX</small></span>
      </div>
      <div class="value-row">
        <span class="label">實際已計入：</span>
        <span class="value">_____ USDT <small>≈ _____ TRX</small></span>
      </div>
    </div>
  </div>
  `
}

function getResourceUnlockedBlockHTML() {
  return `
  <div class="data overview-row">
    <div class="overview-left">
      <div class="dashboard-section01-data-title">
        <h3>資源回饋</h3>
        <span>（進階用戶 | 質押）</span>
      </div>
      <span class="text-muted">預估僅供參考，實際以已入帳為準</span>
    </div>
    <div class="overview-right">
      <div class="value-row">
        <span class="label">當前預估回饋：</span>
        <span class="value">10,000.00 USDT <small>≈ 10,000.00 TRX</small></span>
      </div>
      <div class="value-row">
        <span class="label">實際已計入：</span>
        <span class="value">8,500.00 USDT <small>≈ 8,500.00 TRX</small></span>
      </div>
    </div>
  </div>
  `
}


window.renderOverview = function (containerId) {
  const isAdvanced = AppState.user.isServiceEnabled
  const el = document.getElementById(containerId)
  if (!el) return

  el.innerHTML = isAdvanced
    ? getAdvancedOverviewHTML()
    : getGeneralOverviewHTML()
}

