/* eslint-disable react/jsx-no-useless-fragment */
// @ts-nocheck
import { withKnobs } from '@storybook/addon-knobs';
import type { StoryObj } from '@storybook/react';
import PegaCustomComponentsWitnessUtility from './index';
import complaintData from './mock';

export default {
  title: 'Widgets/WitnessUtility',
  argTypes: {
    getPConnect: {
      table: {
        disable: true
      }
    }
  },
  component: PegaCustomComponentsWitnessUtility
};

const setPCore = () => {
  (window as any).PCore = {
    getConstants: () => {
      return {
        CASE_INFO: {}
      };
    },
    getSemanticUrlUtils: () => {
      return {
        getResolvedSemanticURL: () => {
          return '/case/case-1';
        },
        getActions: () => {
          return { ACTION_SHOWVIEW: 'ACTION_SHOWVIEW' };
        }
      };
    }
  };
};

type Story = StoryObj<typeof PegaCustomComponentsWitnessUtility>;
export const Default: Story = {
  render: args => {
    setPCore();
    const props = {
      ...args,
      witnessName: 'Test',
      witnessPhone: '1234567890',
      getPConnect: () => {
        return {
          getContextName: () => '',
          getValue: () => 'C-123',
          getActionsApi: () => {
            return {
              showPage: (name: string, classname: string) => {
                // eslint-disable-next-line no-alert
                alert(`show page ${classname}.${name}`);
              }
            };
          }
        };
      }
    };
    return <PegaCustomComponentsWitnessUtility {...props} />;
  },
  args: {}
};
