import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

export const MoveColumnForm = () => {
  return <div></div>;
};

const MOVE_COLUMN = gql`
  mutation moveColumn($column: String!, $columnPos: Float!) {
    moveColumn(column: $column, columnPos: $columnPos)
  }
`;
