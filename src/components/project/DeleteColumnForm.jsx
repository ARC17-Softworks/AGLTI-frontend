import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

export const DeleteColumnForm = () => {
  return <div></div>;
};

const DELETE_COLUMN = gql`
  mutation deleteColumn(
    $column: String!
    $deleteTasks: Boolean!
    $shiftColumn: String!
  ) {
    deleteColumn(
      column: $column
      deleteTasks: $deleteTasks
      shiftColumn: $shiftColumn
    )
  }
`;
