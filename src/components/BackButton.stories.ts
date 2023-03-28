import type { Meta, StoryObj } from '@storybook/vue3';
import BackButton from './BackButton.vue';

const meta = {
  title: 'BackButton',
  component: BackButton,
} satisfies Meta<typeof BackButton>;

export default meta;

type Story = StoryObj<typeof BackButton>;

export const Default = {} satisfies Story;
