<template>
  <span class="statistics text-2xl leading-none ml-6 cursor-pointer relative">
    <i
      @click="toggleStatistics"
      class="inline-block align-top transition-all duration-300"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="icon"
      >
        <path
          d="M21 21H4.6C4.03995 21 3.75992 21 3.54601 20.891C3.35785 20.7951 3.20487 20.6422 3.10899 20.454C3 20.2401 3 19.9601 3 19.4V3"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7 14.5V17.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.5 11.5V17.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16 8.5V17.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </i>

    <Transition name="drawer">
      <div
        class="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm"
        v-if="statisticsActive"
        @click.self="statisticsActive = false"
      >
        <div
          class="drawer fixed top-0 right-0 bottom-0 w-full max-w-md md:max-w-xl bg-gradient-to-b from-[#1c1c2e] to-[#0f172a] shadow-2xl overflow-y-auto pb-10 transform transition-all duration-300 ease-in-out z-50 border-l border-white/5"
        >
          <div
            class="p-5 border-b border-white/10 flex items-center justify-between"
          >
            <h2 class="text-xl font-medium tracking-wide">
              Meditation Statistics
            </h2>
            <div class="flex items-center">
              <button
                @click="statisticsActive = false"
                class="text-white/60 hover:text-white transition-colors p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="p-5">
            <div
              v-if="!hasData"
              class="flex flex-col items-center justify-center py-16 text-center"
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="mb-4 text-white/30"
              >
                <path
                  d="M21 21H4.6C4.03995 21 3.75992 21 3.54601 20.891C3.35785 20.7951 3.20487 20.6422 3.10899 20.454C3 20.2401 3 19.9601 3 19.4V3"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 14.5V17.5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.5 11.5V17.5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16 8.5V17.5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p class="text-lg font-light text-white/60 mb-2">
                No meditation data yet
              </p>
              <p class="text-sm text-white/40">
                Complete a meditation session to start tracking your progress
              </p>
            </div>

            <div v-else>
              <!-- Summary Statistics -->
              <div class="grid grid-cols-2 gap-4 mb-8">
                <div
                  class="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
                >
                  <h3
                    class="text-sm uppercase tracking-wider text-white/50 mb-1"
                  >
                    Total Sessions
                  </h3>
                  <p class="text-3xl font-light">
                    {{ totalSessions }}
                  </p>
                </div>
                <div
                  class="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
                >
                  <h3
                    class="text-sm uppercase tracking-wider text-white/50 mb-1"
                  >
                    Total Time
                  </h3>
                  <p class="text-3xl font-light">
                    {{ formatTotalTime }}
                  </p>
                </div>
                <div
                  class="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
                >
                  <h3
                    class="text-sm uppercase tracking-wider text-white/50 mb-1"
                  >
                    Avg. Duration
                  </h3>
                  <p class="text-3xl font-light">
                    {{ formatAvgDuration }}
                  </p>
                </div>
                <div
                  class="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
                >
                  <h3
                    class="text-sm uppercase tracking-wider text-white/50 mb-1"
                  >
                    Current Streak
                  </h3>
                  <p class="text-3xl font-light">
                    {{ currentStreak }}
                    {{ currentStreak === 1 ? 'day' : 'days' }}
                  </p>
                </div>
              </div>

              <!-- Weekly Activity Chart -->
              <div
                class="mb-8 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <h3 class="text-base font-medium mb-4 text-white/80">
                  Weekly Activity
                </h3>
                <div class="h-40 flex items-end justify-between">
                  <div
                    v-for="(day, index) in weeklyActivity"
                    :key="index"
                    class="flex flex-col items-center flex-1"
                  >
                    <div
                      class="relative w-full max-w-[40px] mx-auto bg-white/10 rounded-t-md transition-all hover:bg-white/15"
                      :style="{
                        height: `${calculateBarHeight(day.minutes)}px`,
                      }"
                      :class="{
                        'bg-gradient-to-t from-[#43e97b]/30 to-[#43e97b]/60 hover:from-[#43e97b]/40 hover:to-[#43e97b]/80':
                          day.minutes > 0,
                      }"
                    >
                      <span
                        class="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-white/70"
                        v-if="day.minutes > 0"
                      >
                        {{ formatMinutes(day.minutes) }}
                      </span>
                    </div>
                    <span class="text-xs mt-2 text-white/60">{{
                      day.label
                    }}</span>
                  </div>
                </div>
              </div>

              <!-- Time of Day Chart -->
              <div
                class="mb-8 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <h3 class="text-base font-medium mb-4 text-white/80">
                  Meditation by Time of Day
                </h3>
                <div class="grid grid-cols-4 gap-2">
                  <div
                    v-for="(time, index) in timeOfDayData"
                    :key="index"
                    class="bg-white/5 p-3 rounded-lg text-center"
                  >
                    <div
                      class="w-full h-2 bg-white/10 rounded-full mb-2 overflow-hidden"
                    >
                      <div
                        class="h-2 bg-gradient-to-r from-[#43e97b]/60 to-[#43e97b]/80 rounded-full transition-all"
                        :style="{
                          width: `${time.percentage}%`,
                        }"
                      ></div>
                    </div>
                    <p class="text-2xl font-light">
                      {{ time.count }}
                    </p>
                    <p class="text-xs text-white/60 mt-1">
                      {{ time.label }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Session Ratings Chart -->
              <div
                v-if="hasRatingData"
                class="mb-8 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-base font-medium text-white/80">
                    Session Ratings Over Time
                  </h3>
                  <div class="flex gap-1">
                    <button
                      v-for="period in timePeriods"
                      :key="period.key"
                      @click="selectedTimePeriod = period.key"
                      class="px-3 py-1 text-xs rounded-full transition-all"
                      :class="{
                        'bg-[#43e97b]/20 text-[#43e97b] border border-[#43e97b]/50':
                          selectedTimePeriod === period.key,
                        'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80':
                          selectedTimePeriod !== period.key,
                      }"
                    >
                      {{ period.label }}
                    </button>
                  </div>
                </div>
                <div class="h-40 relative">
                  <svg
                    class="w-full h-full"
                    viewBox="0 0 400 160"
                    preserveAspectRatio="none"
                  >
                    <!-- Grid lines -->
                    <g class="grid-lines">
                      <line
                        v-for="i in 5"
                        :key="`grid-${i}`"
                        :x1="40"
                        :y1="(i - 1) * 32 + 20"
                        :x2="380"
                        :y2="(i - 1) * 32 + 20"
                        stroke="rgba(255,255,255,0.1)"
                        stroke-width="1"
                      />
                    </g>

                    <!-- Y-axis labels -->
                    <g class="y-labels">
                      <text
                        v-for="i in 5"
                        :key="`y-label-${i}`"
                        :x="35"
                        :y="(5 - i) * 32 + 25"
                        fill="rgba(255,255,255,0.6)"
                        font-size="10"
                        text-anchor="end"
                      >
                        {{ i }}
                      </text>
                    </g>

                    <!-- Rating line -->
                    <polyline
                      :points="ratingLinePoints"
                      fill="none"
                      stroke="url(#ratingGradient)"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />

                    <!-- Rating points -->
                    <circle
                      v-for="(point, index) in ratingChartData"
                      :key="`point-${index}`"
                      :cx="point.x"
                      :cy="point.y"
                      r="3"
                      fill="#43e97b"
                      class="cursor-pointer hover:r-4 transition-all"
                    >
                      <title>
                        {{ point.rating }} stars - {{ point.dateLabel }}
                      </title>
                    </circle>

                    <!-- Gradient definition -->
                    <defs>
                      <linearGradient
                        id="ratingGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          style="stop-color: #43e97b; stop-opacity: 0.8"
                        />
                        <stop
                          offset="100%"
                          style="stop-color: #38d9a9; stop-opacity: 0.8"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <!-- Rating Statistics -->
                <div class="grid grid-cols-3 gap-4 mt-4">
                  <div class="text-center">
                    <p class="text-2xl font-light">
                      {{ averageRating.toFixed(1) }}
                    </p>
                    <p class="text-xs text-white/60">Avg. Rating</p>
                  </div>
                  <div class="text-center">
                    <p class="text-2xl font-light">{{ highestRating }}</p>
                    <p class="text-xs text-white/60">Highest</p>
                  </div>
                  <div class="text-center">
                    <p class="text-2xl font-light">{{ totalRatings }}</p>
                    <p class="text-xs text-white/60">
                      {{
                        selectedTimePeriod === 'all'
                          ? 'Total Rated'
                          : `Rated (${
                              timePeriods.find(
                                (p) => p.key === selectedTimePeriod
                              )?.label
                            })`
                      }}
                    </p>
                  </div>
                </div>

                <!-- Period Info -->
                <div class="mt-3 text-center">
                  <p class="text-xs text-white/50">
                    Showing {{ filteredRatedSessions.length }} rated session{{
                      filteredRatedSessions.length === 1 ? '' : 's'
                    }}
                    {{
                      selectedTimePeriod !== 'all'
                        ? `from the last ${
                            timePeriods.find(
                              (p) => p.key === selectedTimePeriod
                            )?.label
                          }`
                        : 'from all time'
                    }}
                  </p>
                </div>
              </div>

              <!-- Recent History -->
              <div
                class="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <h3 class="text-base font-medium mb-4 text-white/80">
                  Recent Sessions
                </h3>
                <div class="space-y-3">
                  <div
                    v-for="(session, index) in recentSessions"
                    :key="index"
                    class="flex items-center p-3 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div
                      class="w-12 h-12 rounded-full bg-gradient-to-br from-[#43e97b]/20 to-[#43e97b]/40 flex items-center justify-center mr-4"
                    >
                      <span class="text-lg font-light">{{
                        formatDuration(session.duration)
                      }}</span>
                    </div>
                    <div class="flex-1">
                      <p class="text-sm font-medium">
                        {{ formatDate(session.date) }}
                      </p>
                      <p class="text-xs text-white/60">
                        {{ formatTime(session.date) }}
                      </p>
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
              <button
                @click="exportData"
                class="bg-white/10 hover:bg-white/15 rounded-lg py-3 px-4 text-sm font-medium transition-colors"
              >
                Export Data
              </button>
              <label
                for="import-file"
                class="bg-white/10 hover:bg-white/15 rounded-lg py-3 px-4 text-sm font-medium transition-colors text-center cursor-pointer"
              >
                Import Data
              </label>
              <button
                @click="clearAllData"
                class="bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg py-3 px-4 text-sm font-medium transition-colors"
              >
                Clear Data
              </button>
              <input
                type="file"
                id="import-file"
                @change="importData"
                class="hidden"
                accept=".json"
              />
            </div>

            <!-- <button @click="generateDummyData"
              class="mt-4 w-full bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 rounded-lg py-3 px-4 text-sm font-medium transition-colors">
              Generate Demo Data
            </button> -->
          </div>
        </div>
      </div>
    </Transition>
  </span>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';

const statisticsActive = ref(false);
const meditationData = ref([]);
const confirmClearActive = ref(false);
const selectedTimePeriod = ref('week');

const timePeriods = [
  { key: 'week', label: '7D', days: 7 },
  { key: 'month', label: '30D', days: 30 },
  { key: 'quarter', label: '3M', days: 90 },
  { key: 'year', label: '1Y', days: 365 },
  { key: 'all', label: 'All', days: null },
];

// Computed properties
const hasData = computed(() => {
  return meditationData.value && meditationData.value.length > 0;
});

const totalSessions = computed(() => {
  return meditationData.value.length;
});

const totalMinutes = computed(() => {
  return meditationData.value.reduce(
    (total, session) => total + session.duration,
    0
  );
});

const formatTotalTime = computed(() => {
  const hours = Math.floor(totalMinutes.value / 60);
  const minutes = totalMinutes.value % 60;
  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }
  return `${minutes}m`;
});

const formatAvgDuration = computed(() => {
  if (totalSessions.value === 0) return '0m';
  const avg = Math.round(totalMinutes.value / totalSessions.value);
  return `${avg}m`;
});

const currentStreak = computed(() => {
  if (!hasData.value) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let streak = 0;
  let currentDate = new Date(today);

  // Check backwards from today
  while (true) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const hasMeditatedOnDate = meditationData.value.some((session) => {
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
});

const weeklyActivity = computed(() => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();

  return days.map((label, index) => {
    // Calculate the date for each day of the current week (starting from Sunday)
    const date = new Date(today);
    const currentDayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday
    const daysFromSunday = currentDayOfWeek; // How many days from Sunday
    const targetDaysFromSunday = index; // Target day index (0 = Sunday, 1 = Monday, etc.)

    // Calculate date for this day of the week
    date.setDate(today.getDate() - daysFromSunday + targetDaysFromSunday);
    date.setHours(0, 0, 0, 0);

    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);

    // Filter sessions for this day
    const dayMinutes = meditationData.value
      .filter((session) => {
        const sessionDate = new Date(session.date);
        return sessionDate >= date && sessionDate < nextDay;
      })
      .reduce((total, session) => total + session.duration, 0);

    return {
      label,
      date,
      minutes: dayMinutes,
    };
  });
});

const timeOfDayData = computed(() => {
  const timeSlots = [
    { label: 'Morning', start: 5, end: 12, count: 0 },
    { label: 'Afternoon', start: 12, end: 17, count: 0 },
    { label: 'Evening', start: 17, end: 21, count: 0 },
    { label: 'Night', start: 21, end: 5, count: 0 },
  ];

  // Count sessions in each time slot
  meditationData.value.forEach((session) => {
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
  const maxCount = Math.max(...timeSlots.map((slot) => slot.count), 1);
  timeSlots.forEach((slot) => {
    slot.percentage = maxCount > 0 ? (slot.count / maxCount) * 100 : 0;
  });

  return timeSlots;
});

const recentSessions = computed(() => {
  return [...meditationData.value]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
});

// Rating-related computed properties
const hasRatingData = computed(() => {
  return (
    meditationData.value &&
    meditationData.value.some((session) => session.rating)
  );
});

const filteredRatedSessions = computed(() => {
  const ratedSessions = meditationData.value.filter(
    (session) => session.rating
  );

  // Filter by selected time period
  const now = new Date();
  const selectedPeriod = timePeriods.find(
    (p) => p.key === selectedTimePeriod.value
  );

  if (selectedPeriod && selectedPeriod.days) {
    const cutoffDate = new Date(now);
    cutoffDate.setDate(cutoffDate.getDate() - selectedPeriod.days);

    return ratedSessions.filter((session) => {
      const sessionDate = new Date(session.date);
      return sessionDate >= cutoffDate;
    });
  }

  return ratedSessions;
});

const totalRatings = computed(() => {
  return filteredRatedSessions.value.length;
});

const averageRating = computed(() => {
  if (filteredRatedSessions.value.length === 0) return 0;
  const sum = filteredRatedSessions.value.reduce(
    (total, session) => total + session.rating,
    0
  );
  return sum / filteredRatedSessions.value.length;
});

const highestRating = computed(() => {
  if (filteredRatedSessions.value.length === 0) return 0;
  return Math.max(
    ...filteredRatedSessions.value.map((session) => session.rating)
  );
});

const ratingChartData = computed(() => {
  if (filteredRatedSessions.value.length === 0) return [];

  // Sort ratings by date
  const sortedRatings = [...filteredRatedSessions.value].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  if (sortedRatings.length === 0) return [];

  const chartWidth = 340; // 380 - 40 for margins
  const chartHeight = 128; // 160 - 32 for margins
  const startX = 40;
  const startY = 20;

  return sortedRatings.map((session, index) => {
    const x =
      startX + (index * chartWidth) / Math.max(sortedRatings.length - 1, 1);
    const y = startY + chartHeight - ((session.rating - 1) * chartHeight) / 4; // Scale 1-5 to chart height

    return {
      x,
      y,
      rating: session.rating,
      date: session.date,
      dateLabel: formatDate(session.date),
    };
  });
});

const ratingLinePoints = computed(() => {
  if (ratingChartData.value.length === 0) return '';
  return ratingChartData.value
    .map((point) => `${point.x},${point.y}`)
    .join(' ');
});

// Methods
const loadData = () => {
  const data = localStorage.getItem('meditationData');
  if (data) {
    meditationData.value = JSON.parse(data);
  }
};

const toggleStatistics = () => {
  statisticsActive.value = !statisticsActive.value;
  // Reload data whenever statistics panel is opened
  if (statisticsActive.value) {
    loadData();
  }
};

const saveSession = (duration) => {
  // Add new session
  const newSession = {
    id: Date.now(), // Unique ID
    date: new Date().toISOString(),
    duration: duration,
  };

  meditationData.value.push(newSession);

  // Save to localStorage
  localStorage.setItem('meditationData', JSON.stringify(meditationData.value));
};

const clearAllData = () => {
  if (
    confirm(
      'Are you sure you want to delete all meditation data? This cannot be undone.'
    )
  ) {
    localStorage.removeItem('meditationData');
    meditationData.value = [];
  }
};

const exportData = () => {
  // Create a JSON file with meditation data (now includes ratings)
  const exportData = {
    meditationData: meditationData.value,
    exportDate: new Date().toISOString(),
  };
  const dataStr = JSON.stringify(exportData);
  const dataUri =
    'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  // Create a download link and trigger download
  const exportFileName = `meditation-data-${
    new Date().toISOString().split('T')[0]
  }.json`;
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileName);
  linkElement.click();
};

const importData = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const importedData = JSON.parse(e.target.result);

      let meditationImportData = [];

      // Handle both old format (array) and new format (object with meditationData)
      if (Array.isArray(importedData)) {
        // Old format - just meditation data array
        meditationImportData = importedData;
      } else if (importedData && typeof importedData === 'object') {
        // New format - object with meditationData
        meditationImportData = importedData.meditationData || [];

        // Handle legacy format with separate ratingData
        if (importedData.ratingData) {
          // Merge ratings into meditation data
          const ratingMap = new Map(
            importedData.ratingData.map((rating) => [rating.id, rating.rating])
          );
          meditationImportData.forEach((session) => {
            if (ratingMap.has(session.id)) {
              session.rating = ratingMap.get(session.id);
            }
          });
        }
      } else {
        alert('Invalid data format. Import failed.');
        return;
      }

      // Confirm before replacing or merging data
      if (meditationData.value.length > 0) {
        if (
          confirm(
            'Do you want to merge with existing data? Click Cancel to replace all data.'
          )
        ) {
          // Merge meditation data, avoiding duplicates by ID
          const existingMeditationIds = new Set(
            meditationData.value.map((item) => item.id)
          );
          const newMeditationData = meditationImportData.filter(
            (item) => !existingMeditationIds.has(item.id)
          );
          meditationData.value = [
            ...meditationData.value,
            ...newMeditationData,
          ];
        } else {
          // Replace all data
          meditationData.value = meditationImportData;
        }
      } else {
        // No existing data, just import
        meditationData.value = meditationImportData;
      }

      // Save to localStorage
      localStorage.setItem(
        'meditationData',
        JSON.stringify(meditationData.value)
      );
      alert('Data imported successfully');

      // Reset the file input
      event.target.value = '';
    } catch (error) {
      alert('Failed to import data: ' + error.message);
    }
  };
  reader.readAsText(file);
};

const generateDummyData = () => {
  if (meditationData.value.length > 0) {
    if (
      !confirm(
        'This will add demo data to your existing meditation records. Continue?'
      )
    ) {
      return;
    }
  }

  // Generate random sessions over the past 30 days
  const dummyData = [];
  const now = new Date();

  // Ensure we have data for current streak
  for (let i = 0; i < 7; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    date.setHours(getRandomInt(5, 23), getRandomInt(0, 59), 0, 0);

    dummyData.push({
      id: Date.now() - i * 100000 - getRandomInt(1000, 9999),
      date: date.toISOString(),
      duration: getRandomInt(5, 30),
    });
  }

  // Add more random sessions in the past month
  for (let i = 7; i < 30; i++) {
    // Skip some days to make data more realistic
    if (Math.random() > 0.6) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      date.setHours(getRandomInt(5, 23), getRandomInt(0, 59), 0, 0);

      // Create 1-2 sessions for some days
      const sessionCount = Math.random() > 0.8 ? 2 : 1;

      for (let j = 0; j < sessionCount; j++) {
        const sessionDate = new Date(date);
        if (j > 0) {
          sessionDate.setHours(sessionDate.getHours() + getRandomInt(1, 4));
        }

        dummyData.push({
          id: Date.now() - i * 100000 - getRandomInt(1000, 9999) - j * 100,
          date: sessionDate.toISOString(),
          duration: getRandomInt(5, 60),
        });
      }
    }
  }

  // Add the dummy data to existing data
  meditationData.value = [...meditationData.value, ...dummyData];

  // Save to localStorage
  localStorage.setItem('meditationData', JSON.stringify(meditationData.value));

  alert(`Added ${dummyData.length} demo meditation sessions`);
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const formatMinutes = (minutes) => {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

const formatDuration = (minutes) => {
  return minutes < 60 ? `${minutes}m` : `${Math.floor(minutes / 60)}h`;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

const getTimeAgo = (dateString) => {
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
};

const calculateBarHeight = (minutes) => {
  // Maximum height in pixels
  const maxHeight = 120;
  // Maximum expected minutes (for scaling)
  const maxMinutes = 60;

  if (minutes === 0) return 4; // Minimal height for zero

  // Calculate proportional height with a minimum
  return Math.max(10, Math.min(maxHeight, (minutes / maxMinutes) * maxHeight));
};

// Watch for statistics panel visibility changes
watch(statisticsActive, (newValue) => {
  if (newValue) {
    // Reload data when statistics panel opens
    loadData();
  }
});

// Lifecycle
onMounted(() => {
  loadData();
});

// Expose methods that might be called from parent components
defineExpose({
  saveSession,
  loadData,
});
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
