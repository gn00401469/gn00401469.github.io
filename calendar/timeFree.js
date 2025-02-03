
  const app = Vue.createApp({
    data() {
      return {
        currentDate: new Date(),
        isModalOpen: false,
        selectedDate: "",
        newTaskContent: "",
        taskTime: "", // 時間選擇
        tasks: JSON.parse(localStorage.getItem("tasks")) || {},  // 儲存所有代辦事項
      };
    },
    computed: {
      formattedDate() {
        return (
          this.currentDate.getFullYear() + "年 " + (this.currentDate.getMonth() + 1) + "月"
        );
      },
      calendarDays() {
        let year = this.currentDate.getFullYear();
        let month = this.currentDate.getMonth();
        let firstDay = new Date(year, month, 1).getDay();
        firstDay = firstDay === 0 ? 7 : firstDay;
        let daysInMonth = new Date(year, month + 1, 0).getDate();
      
        let days = [];
        let week = [];
      
        for (let i = 1; i < firstDay; i++) {
          week.push({ day: "", inMonth: false });
        }
      
        for (let day = 1; day <= daysInMonth; day++) {
          let dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          week.push({
            day,
            date: dateStr,
            inMonth: true,
            tasks: this.tasks[dateStr] || [] // 確保 tasks 是陣列
          });
      
          if (week.length === 7) {
            days.push(week);
            week = [];
          }
        }
      
        while (week.length < 7) {
          week.push({ day: "", inMonth: false });
        }
        days.push(week);
      
        return days;
      },      
    },
    methods: {
      changeMonth(offset) {
        this.currentDate.setMonth(this.currentDate.getMonth() + offset);
        this.currentDate = new Date(this.currentDate);
      },
      resetToToday() {
        this.currentDate = new Date();
      },
      openModal(date) {
        this.selectedDate = date;
        this.newTaskContent = "";
        this.taskTime = "";
        this.isModalOpen = true;
      },
      saveTask() {
        if (this.selectedDate) {
          if (!this.tasks[this.selectedDate]) {
            this.tasks[this.selectedDate] = []; // 若當天沒有資料，初始化為陣列
          }
          if (this.newTaskContent.trim()) {
            this.tasks[this.selectedDate].push({
              content: this.newTaskContent.trim(),
              time: this.taskTime || "全天"
            });
          }
          localStorage.setItem("tasks", JSON.stringify(this.tasks)); // 更新 localStorage
        }
        this.newTaskContent = ""; // 清空輸入框
        this.taskTime = "";
        this.isModalOpen = false;
      },      
      deleteTask(index) {
        if (this.selectedDate && this.tasks[this.selectedDate]) {
          this.tasks[this.selectedDate].splice(index, 1);
          if (this.tasks[this.selectedDate].length === 0) {
            delete this.tasks[this.selectedDate]; // 如果當天所有事項都刪光了，從記錄中移除
          }
          localStorage.setItem("tasks", JSON.stringify(this.tasks));
        }
      },      
    }
  });
  
  app.mount("#app");
  