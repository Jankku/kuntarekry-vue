import { useQuery } from '@tanstack/vue-query';
import axios from './axios';
import { z } from 'zod';

const Region = z.object({
  id: z.number(),
  name: z.string(),
  childs: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      order: z.number(),
    })
  ),
});
const RegionArray = z.array(Region);
export type Region = z.infer<typeof Region>;

const getRegions = async (): Promise<Region[]> => {
  try {
    const response = await axios.get('/portal-api/recruitment/params/hierarchy/locations');
    const regions = RegionArray.parseAsync(response.data.locations);
    return regions;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const useRegions = () =>
  useQuery({ queryKey: ['regions'], queryFn: getRegions, staleTime: Infinity });
