import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Configuration,
  Text,
  Card,
  CardHeader,
  CardContent,
  StandardTree,
  treeHelpers
} from '@pega/cosmos-react-core';
import { StyledCard } from './styles';

const createCountryNodes = (countryList: { source: any[] }) => {
  const isParent = true;
  let nodes = [];
  nodes = countryList.source?.map((country: { name: any; value: any }) => {
    return {
      id: country.name,
      label: country.value,
      icon: isParent ? 'folder-solid' : 'document-solid',
      nodes: isParent ? [] : undefined
    };
  });
  return nodes;
};

export default function PegaCustomComponentsCountryStateNavigator(props: {
  headerText: any;
  countryList: any;
}) {
  const { headerText, countryList } = props;

  const [currentNodeId, setCurrentNodeId] = useState();
  const [allNodes, setAllNodes] = useState(createCountryNodes(countryList));

  const getStates = (id: string | undefined) => {
    if (id === undefined || id === '') return;
    const context = 'app/SampleCo';
    PCore.getDataApiUtils()
      .getData(
        'D_pyStateList',
        {
          dataViewParameters: { pyCountry: id },
          query: {},
          paging: {},
          useExtendedTimeout: false
        },
        context
      )
      // @ts-ignore
      .then((response: { data: { data: { pyStateCode: any; pyLabel: any }[] | null } }) => {
        const nodes =
          response.data.data !== null
            ? response.data?.data.map((state: { pyStateCode: any; pyLabel: any }) => {
                const isParent = false;
                return {
                  id: state.pyStateCode,
                  label: state.pyLabel,
                  icon: isParent ? 'folder-solid' : 'document-solid',
                  nodes: isParent ? [] : undefined
                };
              })
            : [];
        // @ts-ignore
        setAllNodes(tree => {
          return treeHelpers.mapNode(tree, id, node => {
            return {
              ...node,
              loading: false,
              nodes: [...(node.nodes ?? []), ...nodes]
            };
          });
        });
      })
      .catch((e: any) => {
        // Simply log the error in this example

        console.error(e);
      });
  };

  const theme = {
    components: {
      card: {
        'border-radius': '0.5rem',
        background: '#71baff'
      }
    }
  };

  return (
    // ②
    <Configuration theme={theme}>
      <Card as={StyledCard}>
        <CardHeader>
          <Text variant='h2'>{headerText}</Text>
        </CardHeader>
        <CardContent>
          <StandardTree
            lined={false}
            currentNodeId={currentNodeId}
            nodes={allNodes}
            onNodeClick={id => {
              const clickedNode = treeHelpers.getNode(allNodes, id);
              // @ts-ignore
              setCurrentNodeId(id);
              if (!clickedNode?.nodes) return;
              setAllNodes(tree =>
                treeHelpers.mapNode(tree, id, node => {
                  return {
                    ...node,
                    // @ts-ignore
                    expanded: !node.expanded,
                    loading: node.nodes?.length === 0
                  };
                })
              );
              if (clickedNode?.nodes?.length > 0) return;
              getStates(id);
            }}
          />
        </CardContent>
      </Card>
    </Configuration>
  );
}

PegaCustomComponentsCountryStateNavigator.defaultProps = {
  headerText: '',
  countryList: {}
};

PegaCustomComponentsCountryStateNavigator.propTypes = {
  headerText: PropTypes.string,
  countryList: PropTypes.instanceOf(Object)
};
