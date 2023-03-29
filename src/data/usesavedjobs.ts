import { ref, watchEffect } from 'vue';

const SAVED_JOBS_KEY = 'kuntarekry_saved_jobs';

export default function useSavedJobs() {
  const savedJobIds = ref(new Set());

  watchEffect(() => {
    const jobsJson = localStorage.getItem(SAVED_JOBS_KEY) ?? '[]';
    savedJobIds.value = new Set(JSON.parse(jobsJson));
  });

  const saveJob = (id: string) => {
    if (savedJobIds.value.has(id)) {
      savedJobIds.value.delete(id);
    } else {
      savedJobIds.value.add(id);
    }
    localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(Array.from(savedJobIds.value)));
  };

  return { savedJobIds, saveJob } as const;
}
