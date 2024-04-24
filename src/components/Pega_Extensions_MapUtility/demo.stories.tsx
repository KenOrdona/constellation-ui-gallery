import type { StoryObj } from '@storybook/react';
import PegaExtensionsMapUtility from './index';

export default {
  title: 'Widgets/MapUtility',
  argTypes: {
    getPConnect: {
      table: {
        disable: true
      }
    }
  },
  component: PegaExtensionsMapUtility
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

type Story = StoryObj<typeof PegaExtensionsMapUtility>;
export const Default: Story = {
  render: args => {
    setPCore();
    const props = {
      ...args,
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
    return <PegaExtensionsMapUtility {...props} />;
  },
  args: {}
};
