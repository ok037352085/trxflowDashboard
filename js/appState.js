window.AppState = {
  user: {
    id: 'user001',
    isServiceEnabled: true,
    progress: 0,
    maxProgress: 3,
    orders: [],
    feedbacks: [],
    resources: [],
  },

  async fetchUserData() {
    const data = await Promise.resolve({
      enabled: this.user.isServiceEnabled,
      progress: this.user.progress,
      orders: this.user.orders,
      feedbacks: this.user.feedbacks,
      resources: this.user.resources
    })

    this.user.isServiceEnabled = data.enabled;
    this.user.progress = data.progress || 0
    this.user.orders = data.orders || []
    this.user.feedbacks = data.feedbacks || []
    this.user.resources = data.resources || []
  },

  async completeTask() {
    if(this.user.progress >= this.user.maxProgress) return

    try {
      const data = await Promise.resolve({success: true})
      if (data.success) {
        this.user.progress ++
        ProgressManager.update(this.user.progress)
      }
    } catch (err) {
      console.log("更新進度條失敗", err)
    }
  },
  
  initProgress() {
    if(window.ProgressManager){
      ProgressManager.update(this.user.progress)
    }
  }
};

