import type { Meta, StoryObj } from '@storybook/vue3';
import JobItem from './JobItem.vue';

const job = {
  jobAdvertisement: {
    id: '1',
    title: 'Title',
    jobDesc: 'Job description',
    profitCenter: 'Employer',
    publicationStarts: '2021-10-18T10:16:00.000Z',
    publicationEnds: '2021-10-20T10:16:00.000Z',
  },
};

const meta = {
  title: 'JobItem',
  component: JobItem,
  argTypes: {
    job: {
      name: 'Job',
      description: 'Job object',
      defaultValue: job,
    },
  },
} satisfies Meta<typeof JobItem>;

export default meta;

type Story = StoryObj<typeof JobItem>;

export const Default = {
  args: {
    job,
  },
} satisfies Story;
