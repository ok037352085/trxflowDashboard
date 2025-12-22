// 模擬資料
const orders = [
  // { id: "#00001", name: "方案A", pirce:"1,000", date: "2025/12/17", status: "運行中" },
  // { id: "#00002", name: "方案B", pirce:"500", date: "2025/12/16", status: "已結束" },
  // { id: "#00003", name: "方案C", pirce:"1,500", date: "2025/12/15", status: "申請退回中" },
];

const feedbackHistory = [
  // { date: "2025/12/17", state: "收到資源回饋", m: "+", price: "120" },
  // { date: "2025/12/16", state: "收到資源回饋", m: "+", price: "120" },
  // { date: "2025/12/15", state: "收到資源回饋", m: "+", price: "120" },
  // { date: "2025/12/15", state: "收到資源回饋", m: "+", price: "120" },
  // { date: "2025/12/15", state: "收到資源回饋", m: "+", price: "120" },
  // { date: "2025/12/15", state: "收到資源回饋", m: "+", price: "120" },
  // { date: "2025/12/15", state: "收到資源回饋", m: "+", price: "120" },
];

const resourcesList = [
    // {price: "1,000", date1: "2025/12/19", date2: "2025/12/20", state: "待生效"},
    // {price: "1,000", date1: "2025/12/19", date2: "2025/12/20", state: "待生效"},
    // {price: "1,000", date1: "2025/12/19", date2: "2025/12/20", state: "待生效"},
    // {price: "1,000", date1: "2025/12/19", date2: "2025/12/20", state: "待生效"},
    // {price: "1,000", date1: "2025/12/19", date2: "2025/12/20", state: "待生效"},
    // {price: "1,000", date1: "2025/12/19", date2: "2025/12/20", state: "待生效"},
    // {price: "1,000", date1: "2025/12/19", date2: "2025/12/20", state: "待生效"},
    // {price: "1,000", date1: "2025/12/19", date2: "2025/12/20", state: "待生效"},
    // {price: "1,000", date1: "2025/12/19", date2: "2025/12/20", state: "待生效"},
    // {price: "1,000", date1: "2025/12/19", date2: "2025/12/20", state: "待生效"},
    // {price: "1,000", date1: "2025/12/19", date2: "2025/12/20", state: "待生效"},
]

// 通用切換卡片顯示
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

// 渲染訂單
function renderOrderList(orders) {
  const listEl = document.getElementById('order-list');
  if (!listEl) return;

  listEl.innerHTML = '';
  orders.forEach(order => {
    const li = document.createElement('li');
    li.className = 'order-items d-flex mb-2';
    li.innerHTML = `
      <div class="order-item">
        <p>訂單編號: <span>${order.id}</span></p>
        <p>方案名稱: <span>${order.name}</span></p>
        <p>金額: <span>${order.pirce}</span></p>
            <div class="order-time">
                <p class="order-date">建立: <span>${order.date}</span></p>
                <p>-</p>
                <p class="order-date">建立: <span>${order.date}</span></p>
            </div>
        </div>
        <div class="feedback-btn order-info">
            <p class="order-status">狀態: <span>${order.status}</span></p>
            <button>查看詳情</button>
        </div>
    `;
    listEl.appendChild(li);
  });
}

// 渲染回饋表
function renderFeedbackList(feedbacks) {
  const listEl = document.getElementById('feedback-list');
  if (!listEl) return;

  listEl.innerHTML = '';
  feedbacks.slice(0, 5).forEach(fb => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="feedback-date">${fb.date}</span>
      <span class="feedback-state">${fb.state}</span>
      <div class="feedback-price">
        <span style="text-align: center; font-size: 16px; font-weight: bold;">${fb.m}</span>
        <span>${fb.price}</span>
      </div>
    `;
    listEl.appendChild(li);
  });
}

function renderResourceList(resources) {
  const listEl = document.getElementById('resource-list');
  if (!listEl) return;

  listEl.innerHTML = '';
  resources.slice(0, 5).forEach(re => {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="feedback-date">${re.price}</span>
        <span class="feedback-state">${re.date1}</span>
        <span class="feedback-state">${re.date2}</span>
        <span class="order-state">${re.state}</span>
    `;
    listEl.appendChild(li);
  });
}

// 初始化卡片
function initDashboardCards() {
  toggleCard('order-card', 'order-content', 'order-empty', orders)
  if (orders.length > 0) renderOrderList(orders)

  toggleCard('feedback-card', 'feedback-content', 'feedback-empty', feedbackHistory)
  if (feedbackHistory.length > 0) renderFeedbackList(feedbackHistory)

}

function initResourceCenter () {
    toggleCard('resource-all-card', 'resource-content', 'resource-empty', resourcesList)
    if(resourcesList.length) renderResourceList(resourcesList);

    const modalEl = document.getElementById('createResourceModal')
    const modal = new bootstrap.Modal(modalEl)
    
    const createBtn = document.querySelectorAll('.create-resource-btn')
    createBtn.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.show()
      })
    })

    // 假設 modalEl 是 $('#createResourceModal')
    const $modalEl = $('#createResourceModal');

    // 顯示時自動 focus
    $modalEl.on('shown.bs.modal', function () {
      const input = $(this).find('#trx-amount');
      if(input.length) input.focus();
    });

    // 隱藏時清空 input
    $modalEl.on('hidden.bs.modal', function () {
      const input = $(this).find('#trx-amount');
      if(input.length) input.val('');  // jQuery 的 val() 方法
    });

    const confirmBtn = document.getElementById('confirm-create-btn')
    if(confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            const amount = document.getElementById('trx-amount').value
            if(!amount || amount <= 0) {
                alert('請輸入有效金額')
                return
            }

            resourcesList.push({
                price: amount,
                date1: new Date(). toISOString().split("T")[0],
                date2: new Date(). toISOString().split("T")[0],
                state: "待生效"
            })
            renderResourceList(resourcesList)
            toggleCard('resource-all-card', 'resource-content', 'resource-empty', resourcesList)

            modal.hide()
        })
    }

}

// SPA / fetch 頁面後呼叫
// 確保 order-card 與 feedback-card 都已經在 DOM 裡
function initCardsAfterPageLoad() {
  if (document.getElementById('order-card') || document.getElementById('feedback-card')) {
    initDashboardCards()
  }

  if(document.getElementById('resource-all-card')) {
    initResourceCenter()
    setupReturnResourceModal('normal')
  }
}


function setupReturnResourceModal(memberLevel = 'normal') {
  const $modal = $('#returnResourceModal');
  const $input = $modal.find('#return-amount');
  const $cancel = $modal.find('#return-cancel-btn, .btn-close');
  const $confirm = $modal.find('#return-confirm-btn');
  const $warning = $modal.find('#large-amount-warning');
  const $channel = $modal.find('#channel-info');
  const $records = $('#return-records');

  // 打開 modal
  $('#open-return-resource-btn').on('click', function () {
    $input.val('');
    $warning.hide();
    if (memberLevel === 'VIP') {
      $channel.text('你目前為 VIP 等級，系統會優先處理本次資源退回申請；如申請金額較大，部分金額仍可能採分批釋出與排程處理。');
    } else {
      $channel.text('本次申請將依「一般通道」與排程時間處理；達到 VIP 等級後，可享有較高的處理優先權。');
    }
    $modal.modal('show');
  });

  // 開啟後 focus input
  $modal.on('shown.bs.modal', function () {
    $input.focus();
  });

  // 關閉 modal
  $cancel.on('click', function () {
    $modal.modal('hide');
    $input.val('');
    $warning.hide();
  });

  // 監聽輸入金額顯示額外提示
  $input.on('input', function () {
    const value = Number($input.val());
    if (value > 3000) {
      $warning.show();
    } else {
      $warning.hide();
    }
  });

  // 確認申請
  $confirm.on('click', function () {
    const value = Number($input.val());
    if (!value || value < 300) {
      alert('請輸入有效金額（最低 300 USDT）');
      return;
    }

    // 新增申請紀錄
    const date = new Date().toISOString().split('T')[0];
    const li = $(`
      <li>
        ${date} - 申請退回金額: ${value} TRX - 狀態: 申請退回中
      </li>
    `);
    $records.prepend(li);

    // 更新 resourcesList（模擬處理）
    resourcesList.push({
      price: -value,
      date1: date,
      date2: date,
      state: '申請退回中'
    });
    renderResourceList(resourcesList);
    
    $modal.modal('hide');
    $input.val('');
    $warning.hide();
  });
}
