<template>
  <Transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-[10000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div
        class="bg-gradient-to-b from-[#1c1c2e] to-[#0f172a] rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-white/10 transform transition-all duration-300 ease-out"
        :class="{
          'scale-100 opacity-100': show,
          'scale-95 opacity-0': !show,
        }"
      >
        <div class="text-center">
          <h3 class="text-xl font-medium text-white mb-2">Rate Your Session</h3>
          <p class="text-white/60 text-sm mb-6">
            How was your meditation experience?
          </p>

          <!-- Star Rating -->
          <div class="flex justify-center space-x-2 mb-6">
            <button
              v-for="star in 5"
              :key="star"
              @click="selectRating(star)"
              @mouseenter="onStarHover(star)"
              @mouseleave="onStarLeave"
              @touchstart="(e) => onTouchStart(star, e)"
              @touchend="(e) => onTouchEnd(star, e)"
              class="transition-all duration-200 transform hover:scale-110 focus:outline-none focus:scale-110 active:scale-95 touch-manipulation"
              :class="{
                'text-yellow-400': star <= displayRating,
                'text-white/30': star > displayRating,
              }"
            >
              <svg
                class="w-8 h-8 pointer-events-none"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </button>
          </div>

          <!-- Rating Labels - Fixed height to prevent flickering -->
          <div class="mb-6 h-10 flex items-center justify-center">
            <p
              class="text-white/80 text-sm transition-opacity duration-200 text-center"
              :class="{
                'opacity-100': displayRating > 0,
                'opacity-0': displayRating === 0,
              }"
            >
              {{ getRatingLabel(displayRating) }}
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-3">
            <button
              @click="handleSkip"
              class="flex-1 px-4 py-3 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-all duration-200 text-sm font-medium touch-manipulation active:scale-95"
            >
              Skip
            </button>
            <button
              @click="handleSubmit"
              :disabled="selectedRating === 0"
              class="flex-1 px-4 py-3 bg-gradient-to-r from-[#43e97b] to-[#38d9a9] hover:from-[#38d9a9] hover:to-[#20c997] text-white rounded-lg transition-all duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
              :class="{
                'transform hover:scale-105 active:scale-95': selectedRating > 0,
              }"
            >
              Submit Rating
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

// Props
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  sessionDuration: {
    type: Number,
    default: 0,
  },
});

// Emits
const emit = defineEmits(['close', 'rating-submitted']);

// State
const selectedRating = ref(0);
const hoverRating = ref(0);
const touchActive = ref(false);

// Computed
const displayRating = computed(() => {
  return hoverRating.value || selectedRating.value;
});

// Methods
const selectRating = (rating) => {
  selectedRating.value = rating;
  // Clear hover when rating is selected
  if (!touchActive.value) {
    hoverRating.value = 0;
  }
};

const onStarHover = (rating) => {
  if (!touchActive.value) {
    hoverRating.value = rating;
  }
};

const onStarLeave = () => {
  if (!touchActive.value) {
    hoverRating.value = 0;
  }
};

const onTouchStart = (rating, event) => {
  touchActive.value = true;
  hoverRating.value = rating;
};

const onTouchEnd = (rating, event) => {
  // Select rating on touch end to ensure proper touch interaction
  if (touchActive.value && rating) {
    selectRating(rating);
  }

  // Small delay to ensure touch events complete before allowing mouse events
  setTimeout(() => {
    touchActive.value = false;
  }, 100);
};

const getRatingLabel = (rating) => {
  const labels = {
    1: 'Poor - Struggled to focus',
    2: 'Fair - Some difficulty focusing',
    3: 'Good - Average session',
    4: 'Very Good - Felt peaceful',
    5: 'Excellent - Deep meditation',
  };
  return labels[rating] || '';
};

const handleSkip = () => {
  emit('close');
};

const handleSubmit = () => {
  if (selectedRating.value > 0) {
    submitRating();
  }
};

const submitRating = () => {
  if (selectedRating.value > 0) {
    // Update the most recent meditation session with the rating
    const existingData = JSON.parse(
      localStorage.getItem('meditationData') || '[]'
    );

    // Find the most recent session and add the rating
    if (existingData.length > 0) {
      const mostRecentSession = existingData[existingData.length - 1];
      mostRecentSession.rating = selectedRating.value;

      // Save updated data back to localStorage
      localStorage.setItem('meditationData', JSON.stringify(existingData));

      emit('rating-submitted', {
        ...mostRecentSession,
        rating: selectedRating.value,
      });
    }

    emit('close');

    // Reset for next time
    selectedRating.value = 0;
    hoverRating.value = 0;
    touchActive.value = false;
  }
};

// Reset rating when popup is closed
watch(
  () => props.show,
  (newShow) => {
    if (!newShow) {
      selectedRating.value = 0;
      hoverRating.value = 0;
      touchActive.value = false;
    }
  }
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
