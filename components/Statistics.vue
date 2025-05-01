<template>
  <span class="statistics text-2xl leading-none ml-6 cursor-pointer relative">
    <i @click="statisticsActive = !statisticsActive" class="inline-block align-top transition-all duration-300">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
        <path
          d="M21 21H4.6C4.03995 21 3.75992 21 3.54601 20.891C3.35785 20.7951 3.20487 20.6422 3.10899 20.454C3 20.2401 3 19.9601 3 19.4V3"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M7 14.5V17.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M11.5 11.5V17.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" />
        <path d="M16 8.5V17.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </i>

    <Transition name="drawer">
      <div class="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm" v-if="statisticsActive"
        @click.self="statisticsActive = false">
        <div
          class="drawer fixed top-0 right-0 bottom-0 w-full max-w-md md:max-w-xl bg-gradient-to-b from-[#1c1c2e] to-[#0f172a] shadow-2xl overflow-y-auto pb-10 transform transition-all duration-300 ease-in-out z-50 border-l border-white/5">
          <div class="p-5 border-b border-white/10 flex items-center justify-between">
            <h2 class="text-xl font-medium tracking-wide">Meditation Statistics</h2>
            <div class="flex items-center">
              <button @click="statisticsActive = false" class="text-white/60 hover:text-white transition-colors p-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div class="p-5">
            <div v-if="!hasData" class="flex flex-col items-center justify-center py-16 text-center">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="mb-4 text-white/30">
                <path
                  d="M21 21H4.6C4.03995 21 3.75992 21 3.54601 20.891C3.35785 20.7951 3.20487 20.6422 3.10899 20.454C3 20.2401 3 19.9601 3 19.4V3"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M7 14.5V17.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M11.5 11.5V17.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M16 8.5V17.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
              <p class="text-lg font-light text-white/60 mb-2">No meditation data yet</p>
              <p class="text-sm text-white/40">Complete a meditation session to start tracking your progress</p>
            </div>

            <div v-else>
              <!-- Summary Statistics -->
              <div class="grid grid-cols-2 gap-4 mb-8">
                <div
                  class="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all">
                  <h3 class="text-sm uppercase tracking-wider text-white/50 mb-1">Total Sessions</h3>
                  <p class="text-3xl font-light">{{ totalSessions }}</p>
                </div>
                <div
                  class="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all">
                  <h3 class="text-sm uppercase tracking-wider text-white/50 mb-1">Total Time</h3>
                  <p class="text-3xl font-light">{{ formatTotalTime }}</p>
                </div>
                <div
                  class="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all">
                  <h3 class="text-sm uppercase tracking-wider text-white/50 mb-1">Avg. Duration</h3>
                  <p class="text-3xl font-light">{{ formatAvgDuration }}</p>
                </div>
                <div
                  class="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all">
                  <h3 class="text-sm uppercase tracking-wider text-white/50 mb-1">Current Streak</h3>
                  <p class="text-3xl font-light">{{ currentStreak }} {{ currentStreak === 1 ? 'day' : 'days' }}</p>
                </div>
              </div>

              <!-- Weekly Activity Chart -->
              <div class="mb-8 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 class="text-base font-medium mb-4 text-white/80">Weekly Activity</h3>
                <div class="h-40 flex items-end justify-between">
                  <div v-for="(day, index) in weeklyActivity" :key="index" class="flex flex-col items-center flex-1">
                    <div
                      class="relative w-full max-w-[40px] mx-auto bg-white/10 rounded-t-md transition-all hover:bg-white/15"
                      :style="{ height: `${calculateBarHeight(day.minutes)}px` }"
                      :class="{ 'bg-gradient-to-t from-[#43e97b]/30 to-[#43e97b]/60 hover:from-[#43e97b]/40 hover:to-[#43e97b]/80': day.minutes > 0 }">
                      <span class="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-white/70"
                        v-if="day.minutes > 0">
                        {{ formatMinutes(day.minutes) }}
                      </span>
                    </div>
                    <span class="text-xs mt-2 text-white/60">{{ day.label }}</span>
                  </div>
                </div>
              </div>

              <!-- Time of Day Chart -->
              <div class="mb-8 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 class="text-base font-medium mb-4 text-white/80">Meditation by Time of Day</h3>
                <div class="grid grid-cols-4 gap-2">
                  <div v-for="(time, index) in timeOfDayData" :key="index"
                    class="bg-white/5 p-3 rounded-lg text-center">
                    <div class="w-full h-2 bg-white/10 rounded-full mb-2 overflow-hidden">
                      <div class="h-2 bg-gradient-to-r from-[#43e97b]/60 to-[#43e97b]/80 rounded-full transition-all"
                        :style="{ width: `${time.percentage}%` }"></div>
                    </div>
                    <p class="text-2xl font-light">{{ time.count }}</p>
                    <p class="text-xs text-white/60 mt-1">{{ time.label }}</p>
                  </div>
                </div>
              </div>

              <!-- Recent History -->
              <div class="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 class="text-base font-medium mb-4 text-white/80">Recent Sessions</h3>
                <div class="space-y-3">
                  <div v-for="(session, index) in recentSessions" :key="index"
                    class="flex items-center p-3 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all">
                    <div
                      class="w-12 h-12 rounded-full bg-gradient-to-br from-[#43e97b]/20 to-[#43e97b]/40 flex items-center justify-center mr-4">
                      <span class="text-lg font-light">{{ formatDuration(session.duration) }}</span>
                    </div>
                    <div class="flex-1">
                      <p class="text-sm font-medium">{{ formatDate(session.date) }}</p>
                      <p class="text-xs text-white/60">{{ formatTime(session.date) }}</p>
                    </div>
                    <div class="text-white/40 text-xs">
                      {{ getTimeAgo(session.date) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Data Management Buttons -->
          <div class="border-t border-white/10 mt-5 p-5">
            <div class="grid grid-cols-3 gap-2">
              <button @click="exportData"
                class="bg-white/10 hover:bg-white/15 rounded-lg py-3 px-4 text-sm font-medium transition-colors">
                Export Data
              </button>
              <label for="import-file"
                class="bg-white/10 hover:bg-white/15 rounded-lg py-3 px-4 text-sm font-medium transition-colors text-center cursor-pointer">
                Import Data
              </label>
              <button @click="clearAllData"
                class="bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg py-3 px-4 text-sm font-medium transition-colors">
                Clear Data
              </button>
              <input type="file" id="import-file" @change="importData" class="hidden" accept=".json">
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </span>
</template>

<script>
export default {
  data() {
    return {
      statisticsActive: false,
      meditationData: [],
      confirmClearActive: false
    };
  },
  computed: {
    hasData() {
      return this.meditationData && this.meditationData.length > 0;
    },
    totalSessions() {
      return this.meditationData.length;
    },
    totalMinutes() {
      return this.meditationData.reduce((total, session) => total + session.duration, 0);
    },
    formatTotalTime() {
      const hours = Math.floor(this.totalMinutes / 60);
      const minutes = this.totalMinutes % 60;
      return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    },
    formatAvgDuration() {
      if (this.totalSessions === 0) return '0m';
      const avg = Math.round(this.totalMinutes / this.totalSessions);
      return `${avg}m`;
    },
    currentStreak() {
      if (!this.hasData) return 0;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let streak = 0;
      let currentDate = new Date(today);

      // Check backwards from today
      while (true) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const hasMeditatedOnDate = this.meditationData.some(session => {
          const sessionDate = new Date(session.date);
          return sessionDate.toISOString().split('T')[0] === dateStr;
        });

        if (hasMeditatedOnDate) {
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }

      return streak;
    },
    weeklyActivity() {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday

      return days.map((label, index) => {
        // Calculate the date for this day of the week
        const date = new Date(today);
        date.setDate(today.getDate() - (dayOfWeek - index + 7) % 7);
        date.setHours(0, 0, 0, 0);

        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);

        // Filter sessions for this day
        const dayMinutes = this.meditationData
          .filter(session => {
            const sessionDate = new Date(session.date);
            return sessionDate >= date && sessionDate < nextDay;
          })
          .reduce((total, session) => total + session.duration, 0);

        return {
          label,
          date,
          minutes: dayMinutes
        };
      });
    },
    timeOfDayData() {
      const timeSlots = [
        { label: 'Morning', start: 5, end: 12, count: 0 },
        { label: 'Afternoon', start: 12, end: 17, count: 0 },
        { label: 'Evening', start: 17, end: 21, count: 0 },
        { label: 'Night', start: 21, end: 5, count: 0 }
      ];

      // Count sessions in each time slot
      this.meditationData.forEach(session => {
        const date = new Date(session.date);
        const hour = date.getHours();

        for (const slot of timeSlots) {
          if (slot.start < slot.end) {
            // Normal time range (e.g., 5-12)
            if (hour >= slot.start && hour < slot.end) {
              slot.count++;
              break;
            }
          } else {
            // Overnight time range (e.g., 21-5)
            if (hour >= slot.start || hour < slot.end) {
              slot.count++;
              break;
            }
          }
        }
      });

      // Calculate percentages
      const maxCount = Math.max(...timeSlots.map(slot => slot.count), 1);
      timeSlots.forEach(slot => {
        slot.percentage = maxCount > 0 ? (slot.count / maxCount) * 100 : 0;
      });

      return timeSlots;
    },
    recentSessions() {
      return [...this.meditationData]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
    }
  },
  methods: {
    loadData() {
      const data = localStorage.getItem('meditationData');
      if (data) {
        this.meditationData = JSON.parse(data);
      }
    },
    saveSession(duration) {
      // Add new session
      const newSession = {
        id: Date.now(), // Unique ID
        date: new Date().toISOString(),
        duration: duration
      };

      this.meditationData.push(newSession);

      // Save to localStorage
      localStorage.setItem('meditationData', JSON.stringify(this.meditationData));
    },
    clearAllData() {
      if (confirm('Are you sure you want to delete all meditation data? This cannot be undone.')) {
        localStorage.removeItem('meditationData');
        this.meditationData = [];
      }
    },
    exportData() {
      // Create a JSON file with meditation data
      const dataStr = JSON.stringify(this.meditationData);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

      // Create a download link and trigger download
      const exportFileName = `meditation-data-${new Date().toISOString().split('T')[0]}.json`;
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileName);
      linkElement.click();
    },
    importData(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);

          // Validate data structure
          if (!Array.isArray(importedData)) {
            alert('Invalid data format. Import failed.');
            return;
          }

          // Confirm before replacing or merging data
          if (this.meditationData.length > 0) {
            if (confirm('Do you want to merge with existing data? Click Cancel to replace all data.')) {
              // Merge data, avoiding duplicates by ID
              const existingIds = new Set(this.meditationData.map(item => item.id));
              const newData = importedData.filter(item => !existingIds.has(item.id));
              this.meditationData = [...this.meditationData, ...newData];
            } else {
              // Replace all data
              this.meditationData = importedData;
            }
          } else {
            // No existing data, just import
            this.meditationData = importedData;
          }

          // Save to localStorage
          localStorage.setItem('meditationData', JSON.stringify(this.meditationData));
          alert('Data imported successfully');

          // Reset the file input
          event.target.value = '';
        } catch (error) {
          alert('Failed to import data: ' + error.message);
        }
      };
      reader.readAsText(file);
    },
    formatMinutes(minutes) {
      return minutes < 60 ? `${minutes}m` : `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
    },
    formatDuration(minutes) {
      return minutes < 60 ? `${minutes}m` : `${Math.floor(minutes / 60)}h`;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    },
    formatTime(dateString) {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    },
    getTimeAgo(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffSec = Math.round(diffMs / 1000);
      const diffMin = Math.round(diffSec / 60);
      const diffHour = Math.round(diffMin / 60);
      const diffDay = Math.round(diffHour / 24);

      if (diffDay > 0) {
        return `${diffDay}d ago`;
      } else if (diffHour > 0) {
        return `${diffHour}h ago`;
      } else if (diffMin > 0) {
        return `${diffMin}m ago`;
      } else {
        return 'just now';
      }
    },
    calculateBarHeight(minutes) {
      // Maximum height in pixels
      const maxHeight = 120;
      // Maximum expected minutes (for scaling)
      const maxMinutes = 60;

      if (minutes === 0) return 4; // Minimal height for zero

      // Calculate proportional height with a minimum
      return Math.max(10, Math.min(maxHeight, (minutes / maxMinutes) * maxHeight));
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-from .drawer,
.drawer-leave-to .drawer {
  transform: translateX(100%);
}

.icon {
  width: 24px;
  height: 24px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}
</style>
