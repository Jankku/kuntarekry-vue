import type { Job } from '@/api/usejobs';
import { computed, type Ref } from 'vue';

export default function useFilterJobs(
  jobs: Ref<Job[] | undefined>,
  searchQuery: Ref<string>,
  showOnlySavedJobs: Ref<boolean>,
  savedJobIds: Ref<Set<string>>
) {
  return computed(() => {
    if (!jobs.value) return [];

    const query = searchQuery.value.trim().toLowerCase();
    const results = jobs.value.filter(
      (job) =>
        job.jobAdvertisement.title?.toLowerCase().includes(query) ||
        job.jobAdvertisement.profitCenter?.toLowerCase().includes(query)
    );
    if (showOnlySavedJobs.value) {
      return results?.filter((job) => savedJobIds.value.has(job.jobAdvertisement.id));
    } else {
      return results;
    }
  });
}
