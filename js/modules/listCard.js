// 模擬資料
const feedbackHistory = [
  { date: "2025/12/17", state: "收到資源回饋", m: "+", price: "120" },
  { date: "2025/12/16", state: "收到資源回饋", m: "+", price: "120" },
  { date: "2025/12/15", state: "收到資源回饋", m: "+", price: "120" },
];

const resourcesList = [
  // { price:'333', date1: "2025/12/15", date2: "2025/12/15", state: "審核中"},
  // { price:'333', date1: "2025/12/15", date2: "2025/12/15", state: "審核中"},
]; // 建立資源清單
const returnResourceList = []; // 退回資源清單

// -------------------- 通用函數 -------------------- //
// 切換卡片空狀態
function toggleCard(cardId, contentId, emptyId, data) {
  const card = document.getElementById(cardId);
  const contentEl = document.getElementById(contentId);
  const emptyEl = document.getElementById(emptyId);
  if (!card || !contentEl || !emptyEl) return;

  card.classList.remove('d-none');
  if (!data || data.length === 0) {
    emptyEl.classList.remove('d-none');
    contentEl.classList.add('d-none');
  } else {
    emptyEl.classList.add('d-none');
    contentEl.classList.remove('d-none');
  }
}

// -------------------- 首頁建立清單 -------------------- //
function renderHomeResourceList(resources) {
  const listEl = document.getElementById('order-list');
  const emptyEl = document.getElementById('order-empty');
  const contentEl = document.getElementById('order-content');
  if (!listEl || !emptyEl || !contentEl) return;

  if (!resources || resources.length === 0) {
    emptyEl.classList.remove('d-none');
    contentEl.classList.add('d-none');
  } else {
    emptyEl.classList.add('d-none');
    contentEl.classList.remove('d-none');

    listEl.innerHTML = '';
    resources.slice(0, 5).forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="order-price">金額: ${item.price}</span>
        <div class="order-time">
          <span>建立時間: ${item.date1}</span>
          <span>生效時間: ${item.date2}</span>
        </div>
        <span class="order-info">狀態: ${item.state}</span>
      `;
      listEl.appendChild(li);
    });
  }
}

// -------------------- 回饋中心建立清單 -------------------- //
function renderResourceList(resources) {
  const listEl = document.getElementById('resource-list');
  if (!listEl) return;

  toggleCard('resource-all-card', 'resource-content', 'resource-empty', resources);

  listEl.innerHTML = '';
  resources.slice(0, 5).forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.price}</span>
      <span>${item.date1}</span>
      <span>${item.date2}</span>
      <span>${item.state}</span>
    `;
    listEl.appendChild(li);
  });
}

// -------------------- 回饋中心退回清單 -------------------- //
function renderReturnResourceList(returns) {
  const listEl = document.getElementById('return-resource-list');
  const emptyEl = document.getElementById('return-resource-empty');
  const contentEl = document.getElementById('return-resource-content')
  if (!listEl || !emptyEl || !contentEl) return;

  toggleCard('return-resource-card', 'return-resource-content', 'return-resource-empty', returns)

  if (!returns || returns.length === 0) return

  listEl.innerHTML = '';
  returns.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.date}</span>
      <span>${item.amount} TRX（約 ${item.usdt} USDT）</span>
      <span>${item.channel}</span>
      <span>${item.status}</span>
    `;
    listEl.appendChild(li);
  });
}

// -------------------- 初始化首頁 -------------------- //
function initHomeCards() {
  renderHomeResourceList(resourcesList);
}

// -------------------- 初始化回饋中心 -------------------- //
function initResourceCenter() {
  renderResourceList(resourcesList);
  renderReturnResourceList(returnResourceList);

  // 建立資源 Modal
  const modalEl = document.getElementById('createResourceModal');
  const modal = new bootstrap.Modal(modalEl);
  const createBtn = document.querySelectorAll('.create-resource-btn');
  createBtn.forEach(btn => btn.addEventListener('click', () => modal.show()));

  $('#createResourceModal').on('shown.bs.modal', function () {
    $(this).find('#trx-amount').focus();
  }).on('hidden.bs.modal', function () {
    $(this).find('#trx-amount').val('');
  });

  document.getElementById('confirm-create-btn').addEventListener('click', () => {
    const amount = document.getElementById('trx-amount').value;
    if (!amount || amount <= 0) return alert('請輸入有效金額');

    const date = new Date().toISOString().split('T')[0];
    resourcesList.push({ price: amount, date1: date, date2: date, state: "待生效" });

    // 更新首頁 & 回饋中心
    renderHomeResourceList(resourcesList);
    renderResourceList(resourcesList);
    modal.hide();
  });

  // 退回資源 Modal
  setupReturnResourceModal();
}

// -------------------- 退回資源 Modal -------------------- //
function setupReturnResourceModal() {
  const $modal = $('#returnResourceModal');
  const $input = $modal.find('#return-amount');
  const $cancel = $modal.find('#return-cancel-btn, .btn-close');
  const $confirm = $modal.find('#return-confirm-btn');
  const $warning = $modal.find('#large-amount-warning');
  const $channel = $modal.find('#channel-info');

  $('.open-return-resource-btn').on('click', function () {
    $input.val('');
    $warning.hide();

    const isAdvanced = AppState.user.isServiceEnabled === true;

    if(isAdvanced) {
      $channel.text(
        '你目前享有較高的處理優先權；如金額較大，部分金額仍可能分批釋出與排程處理。'
      );
    }else {
      $channel.text(
        '本次申請將依「一般通道」與排程時間處理；達到較高等級後，可享更高的處理優先權。'
      )
    }

    $modal.modal('show');
  });

  $modal.on('shown.bs.modal', () => $input.focus());
  $cancel.on('click', () => { $modal.modal('hide'); $input.val(''); $warning.hide(); });

  $input.on('input', () => { Number($input.val()) > 3000 ? $warning.show() : $warning.hide(); });

  $confirm.on('click', () => {
    const value = Number($input.val());
    if (!value || value < 300) return alert('請輸入有效金額（最低 300 USDT）');

    const date = new Date().toISOString().split('T')[0];
    returnResourceList.unshift({
      date,
      amount: value,
      usdt: Math.round(value / 10), // 模擬換算
      channel: AppState.user.isServiceEnabled ? '優先通道' : '一般通道',
      status: '審核中'
    });

    renderReturnResourceList(returnResourceList);
    $modal.modal('hide');
    $input.val('');
    $warning.hide();
  });
}

// -------------------- SPA / 頁面初始化 -------------------- //
function initCardsAfterPageLoad() {
  if (document.getElementById('order-card')) initHomeCards();
  if (document.getElementById('resource-all-card')) initResourceCenter();
}
