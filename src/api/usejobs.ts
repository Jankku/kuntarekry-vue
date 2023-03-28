import { useQuery } from '@tanstack/vue-query';
import axios from './axios';
import { z } from 'zod';

const Job = z.object({
  jobAdvertisement: z.object({
    id: z.string(),
    title: z.string(),
    jobDesc: z.string().optional(),
    profitCenter: z.string().optional(),
    publicationStarts: z.string(),
    publicationEnds: z.string(),
  }),
});
const JobArray = z.array(Job);
export type Job = z.infer<typeof Job>;

const getJobs = async (): Promise<Job[]> => {
  const response = await axios.get('/portal-api/recruitment/open-jobs');
  try {
    const jobs = JobArray.parse(response.data.jobAdvertisements.slice(0, 50));
    return jobs;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const useJobs = () => useQuery({ queryKey: ['jobs'], queryFn: getJobs });
