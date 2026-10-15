// Funil Gamificado Laravel 13 - Trilha SENAI Dev
const { createApp, ref, computed, onMounted, nextTick } = Vue;

createApp({
  setup() {
    // Estado principal
    const loading = ref(true);
    const course = ref({});
    const ranks = ref([]);
    const lessons = ref([]);
    
    // Navegação e progresso
    const currentLessonIndex = ref(0);
    const unlockedMaxIndex = ref(0);
    const completedLessons = ref([]);
    const totalEarnedXp = ref(0);
    
    // Interação do quiz
    const selectedOption = ref(null);
    const validationState = ref(null); // null | 'correct' | 'wrong'
    const showTip = ref(false);
    const showDetails = ref(false);
    
    // Modais e utilitários
    const showBadgesModal = ref(false);
    const showCertModal = ref(false);
    const showResetModal = ref(false);
    const soundEnabled = ref(true);
    const toastMessage = ref('');
    const studentName = ref('Desenvolvedor(a) SENAI');
    let toastTimer = null;

    // Web Audio API sintetizador para efeitos sonoros
    let audioCtx = null;
    const getAudioContext = () => {
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) audioCtx = new AudioContext();
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return audioCtx;
    };

    const playTone = (freq, duration, type = 'sine', delay = 0) => {
      if (!soundEnabled.value) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = type;
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + duration);
        }, delay * 1000);
      } catch (e) {
        console.warn('Audio note blocked:', e);
      }
    };

    const playSuccessSound = () => {
      playTone(523.25, 0.15, 'triangle', 0);    // C5
      playTone(659.25, 0.15, 'triangle', 0.1);  // E5
      playTone(783.99, 0.35, 'triangle', 0.2);  // G5
    };

    const playErrorSound = () => {
      playTone(220.00, 0.25, 'sawtooth', 0);    // A3
      playTone(196.00, 0.35, 'sawtooth', 0.15); // G3
    };

    const playCelebrationSound = () => {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        playTone(freq, 0.25, 'sine', i * 0.12);
      });
    };

    // Notificação Toast
    const showToast = (msg) => {
      toastMessage.value = msg;
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toastMessage.value = '';
      }, 3500);
    };

    // Confetes
    const triggerConfetti = (intense = false) => {
      if (typeof confetti === 'function') {
        if (intense) {
          confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
          setTimeout(() => {
            confetti({ particleCount: 80, angle: 60, spread: 55, origin: { x: 0 } });
            confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1 } });
          }, 300);
        } else {
          confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
        }
      }
    };

    const scrollActiveStepIntoView = () => {
      nextTick(() => {
        const stepEl = document.getElementById(`step-node-${currentLessonIndex.value}`);
        if (stepEl) {
          stepEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });
    };

    // Computed Properties
    const currentLesson = computed(() => {
      if (!lessons.value.length) return null;
      return lessons.value[currentLessonIndex.value] || lessons.value[0];
    });

    const isCurrentLessonCompleted = computed(() => {
      if (!currentLesson.value) return false;
      return completedLessons.value.includes(currentLesson.value.id);
    });

    const currentRank = computed(() => {
      if (!ranks.value.length) return { title: 'Dev Laravel Iniciante', badge: '🌱' };
      const xp = totalEarnedXp.value;
      const sorted = [...ranks.value].sort((a, b) => b.minXp - a.minXp);
      return sorted.find(r => xp >= r.minXp) || sorted[sorted.length - 1];
    });

    const nextRank = computed(() => {
      if (!ranks.value.length) return null;
      const xp = totalEarnedXp.value;
      const sorted = [...ranks.value].sort((a, b) => a.minXp - b.minXp);
      return sorted.find(r => r.minXp > xp) || null;
    });

    const progressPercentage = computed(() => {
      if (!lessons.value.length) return 0;
      return Math.round((completedLessons.value.length / lessons.value.length) * 100);
    });

    const xpToNextRankPercentage = computed(() => {
      if (!nextRank.value) return 100;
      const curMin = currentRank.value.minXp || 0;
      const nextMin = nextRank.value.minXp;
      const xpInTier = totalEarnedXp.value - curMin;
      const tierRange = nextMin - curMin;
      return Math.min(100, Math.max(0, Math.round((xpInTier / tierRange) * 100)));
    });

    const unlockedBadges = computed(() => {
      return lessons.value
        .filter(l => completedLessons.value.includes(l.id))
        .map(l => ({ ...l.badge, lessonIndex: l.index }));
    });

    // Persistência local no LocalStorage
    const STORAGE_KEY = 'senai_laravel13_funnel_progress_v1';

    const saveProgress = () => {
      const data = {
        currentLessonIndex: currentLessonIndex.value,
        unlockedMaxIndex: unlockedMaxIndex.value,
        completedLessons: completedLessons.value,
        totalEarnedXp: totalEarnedXp.value,
        soundEnabled: soundEnabled.value,
        studentName: studentName.value
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    };

    const loadProgress = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.unlockedMaxIndex !== undefined) unlockedMaxIndex.value = parsed.unlockedMaxIndex;
          if (parsed.currentLessonIndex !== undefined) {
            currentLessonIndex.value = Math.min(parsed.currentLessonIndex, unlockedMaxIndex.value);
          }
          if (Array.isArray(parsed.completedLessons)) completedLessons.value = parsed.completedLessons;
          if (parsed.totalEarnedXp !== undefined) totalEarnedXp.value = parsed.totalEarnedXp;
          if (parsed.soundEnabled !== undefined) soundEnabled.value = parsed.soundEnabled;
          if (parsed.studentName) studentName.value = parsed.studentName;
        } catch (e) {
          console.error('Erro ao ler progresso salvo:', e);
        }
      }
      scrollActiveStepIntoView();
    };

    const resetAllProgress = () => {
      localStorage.removeItem(STORAGE_KEY);
      currentLessonIndex.value = 0;
      unlockedMaxIndex.value = 0;
      completedLessons.value = [];
      totalEarnedXp.value = 0;
      selectedOption.value = null;
      validationState.value = null;
      showTip.value = false;
      showResetModal.value = false;
      showToast('Progresso reiniciado com sucesso!');
      scrollActiveStepIntoView();
    };

    // Navegação pelas etapas do funil
    const goToLesson = (idx) => {
      if (idx > unlockedMaxIndex.value) {
        playErrorSound();
        showToast(`🔒 Aula ${idx + 1} bloqueada. Responda o desafio da anterior!`);
        return;
      }
      currentLessonIndex.value = idx;
      selectedOption.value = null;
      validationState.value = null;
      showTip.value = false;
      scrollActiveStepIntoView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const prevLessonNav = () => {
      if (currentLessonIndex.value > 0) {
        goToLesson(currentLessonIndex.value - 1);
      }
    };

    const nextLessonNav = () => {
      if (currentLessonIndex.value < unlockedMaxIndex.value && currentLessonIndex.value < lessons.value.length - 1) {
        goToLesson(currentLessonIndex.value + 1);
      } else if (currentLessonIndex.value + 1 > unlockedMaxIndex.value) {
        showToast(`🔒 Conclua a pergunta da aula atual para avançar!`);
      }
    };

    const nextLesson = () => {
      if (currentLessonIndex.value < lessons.value.length - 1) {
        goToLesson(currentLessonIndex.value + 1);
      } else {
        showCertModal.value = true;
        triggerConfetti(true);
      }
    };

    const selectOption = (optIdx) => {
      if (validationState.value === 'correct') return;
      selectedOption.value = optIdx;
      validationState.value = null;
    };

    // Validação da resposta
    const validateAnswer = () => {
      if (selectedOption.value === null) {
        showToast('Selecione uma alternativa antes de validar!');
        return;
      }

      const lesson = currentLesson.value;
      const correctIdx = (lesson.question.correctIndex !== undefined) ? lesson.question.correctIndex : lesson.question.correct;
      const isCorrect = selectedOption.value === correctIdx;

      if (isCorrect) {
        validationState.value = 'correct';
        playSuccessSound();
        triggerConfetti();

        const alreadyCompleted = completedLessons.value.includes(lesson.id);
        if (!alreadyCompleted) {
          completedLessons.value.push(lesson.id);
          totalEarnedXp.value += lesson.xp;

          // Desbloqueia a próxima aula se for a última desbloqueada
          if (currentLessonIndex.value === unlockedMaxIndex.value && currentLessonIndex.value < lessons.value.length - 1) {
            unlockedMaxIndex.value = currentLessonIndex.value + 1;
          }

          showToast(`🏆 Correto! +${lesson.xp} XP conquistados!`);

          // Se concluiu todas as 18 aulas
          if (lesson.id === lessons.value.length) {
            setTimeout(() => {
              playCelebrationSound();
              showCertModal.value = true;
              triggerConfetti(true);
            }, 900);
          }
        }

        saveProgress();
        scrollActiveStepIntoView();
      } else {
        validationState.value = 'wrong';
        playErrorSound();
      }
    };

    const tryAgain = () => {
      validationState.value = null;
    };

    const toggleSound = () => {
      soundEnabled.value = !soundEnabled.value;
      saveProgress();
      showToast(soundEnabled.value ? '🔊 Som ativado' : '🔇 Som desativado');
    };

    // Carregamento inicial do banco de dados JSON
    const loadDatabase = async () => {
      try {
        const resp = await fetch('./data/database.json');
        if (!resp.ok) throw new Error(`HTTP error ${resp.status}`);
        const data = await resp.json();
        course.value = data.course;
        ranks.value = data.ranks;
        lessons.value = data.lessons;
        loadProgress();
      } catch (err) {
        console.warn('Falha no fetch direto de database.json, usando fallback local:', err);
        if (window.COURSE_DATABASE) {
          course.value = window.COURSE_DATABASE.course;
          ranks.value = window.COURSE_DATABASE.ranks;
          lessons.value = window.COURSE_DATABASE.lessons;
          loadProgress();
        }
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      loadDatabase();
    });

    return {
      loading,
      course,
      ranks,
      lessons,
      currentLessonIndex,
      unlockedMaxIndex,
      completedLessons,
      totalEarnedXp,
      selectedOption,
      validationState,
      showTip,
      showDetails,
      showBadgesModal,
      showCertModal,
      showResetModal,
      soundEnabled,
      toastMessage,
      studentName,
      currentLesson,
      isCurrentLessonCompleted,
      currentRank,
      nextRank,
      progressPercentage,
      xpToNextRankPercentage,
      unlockedBadges,
      goToLesson,
      prevLessonNav,
      nextLessonNav,
      nextLesson,
      selectOption,
      validateAnswer,
      tryAgain,
      toggleSound,
      resetAllProgress,
      triggerConfetti
    };
  }
}).mount('#app');
