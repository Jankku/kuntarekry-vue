import { useQuery } from '@tanstack/vue-query';
import axios from './axios';
import { z } from 'zod';

const Job = z.object({
  jobAdvertisement: z.object({
    id: z.string(),
    title: z.string().optional(),
    jobDesc: z.string().optional(),
    profitCenter: z.string().optional(),
    publicationStarts: z.string(),
    publicationEnds: z.string(),
  }),
});
const JobArray = z.array(Job);
export type Job = z.infer<typeof Job>;

const getJobs = async (): Promise<Job[]> => {
  try {
    const response = await axios.get('/portal-api/recruitment/open-jobs');
    const jobs = await JobArray.parseAsync(response.data.jobAdvertisements);
    return jobs;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const useJobs = () => useQuery({ queryKey: ['jobs'], queryFn: getJobs });
