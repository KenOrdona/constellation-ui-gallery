// eslint-disable-next-line @typescript-eslint/no-redeclare
/* global PCore */
/* eslint no-undef: 0 */
import PropTypes from 'prop-types';
import { Button } from '@pega/cosmos-react-core';

export function launchLocalAction(
  getPConnect: () => { (): any; new (): any; getActionsApi: { (): any; new (): any } },
  assignmentID: { indexOf: (arg0: string) => number; split: (arg0: string) => [any] },
  action: { ID: any; name: any },
  cb: { (payload: any): void; (arg0: undefined): void }
) {
  const actionsAPI = getPConnect().getActionsApi(); // ①
  const openLocalAction = actionsAPI && actionsAPI.openLocalAction.bind(actionsAPI);
  let caseID;
  if (assignmentID.indexOf('!') === -1) {
    caseID = assignmentID;
  } else {
    // "ASSIGN-WORKLIST ON8TTL-C11NGALL-WORK LAT-3!ENTERINFO_FLOW_1" use case
    const [assignKey] = assignmentID.split('!');
    const [, className, workId] = assignKey.split(' ');
    // eslint-disable-next-line prefer-template
    caseID = className + ' ' + workId;
  }
  openLocalAction(action.ID, {
    // ②
    caseID,
    type: 'express',
    containerName: 'modal',
    name: action.name,
    callbacks: {
      // ③
      submit: (response: any) => {
        cb(response);
      },
      cancel: () => {
        cb('Error');
      }
    }
  });
}

const callback = (payload: any) => {
  // ④

  console.log('Callback payload:', payload);
};

// eslint-disable-next-line camelcase
const Pega_CustomComponents_MyLocalActionLauncher = (props: {
  getPConnect: any;
  buttonText: any;
  testId: any;
  actionId: any;
}) => {
  const { getPConnect, buttonText, testId, actionId } = props;

  const availableActions = getPConnect().getValue(PCore.getConstants().CASE_INFO.AVAILABLEACTIONS); // ⑤

  const action = availableActions.filter((act: { ID: any }) => act.ID === actionId); // ⑥

  const assignmentId = getPConnect().getValue(PCore.getConstants().CASE_INFO.ASSIGNMENT_ID);

  const handleClick = () => {
    launchLocalAction(
      // ⑦
      getPConnect,
      assignmentId,
      action[0],
      callback
    );
  };

  return (
    <>
      {action && assignmentId && (
        <Button variant='simple' onClick={handleClick} data-test-id={testId}>
          {buttonText}
        </Button>
      )}
    </>
  );
};
// eslint-disable-next-line camelcase
Pega_CustomComponents_MyLocalActionLauncher.propTypes = {
  buttonText: PropTypes.string,
  getPConnect: PropTypes.func,
  testId: PropTypes.string,
  actionId: PropTypes.string
};
// eslint-disable-next-line camelcase
export default Pega_CustomComponents_MyLocalActionLauncher;
