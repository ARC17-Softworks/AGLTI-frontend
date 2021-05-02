import React from 'react';
import { Alert, AlertIcon, CloseButton } from '@chakra-ui/react';
import { useAlertContext, REMOVE } from '../../context/alerts';

export default function NotificationAlert({ alert }) {
  const { alertDispatch } = useAlertContext();

  return (
    <div className="alert">
      <div className="alert-container">
        {alert.map(a => {
          return (
            <Alert status={a.status} key={a.id} variant="solid">
              <AlertIcon />
              {a.message}
              <CloseButton
                position="absolute"
                right="8px"
                top="8px"
                onClick={() =>
                  alertDispatch({ type: REMOVE, payload: { id: a.id } })
                }
              />
            </Alert>
          );
        })}
      </div>
    </div>
  );
}
