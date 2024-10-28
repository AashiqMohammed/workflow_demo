'use client';

import React, { useEffect, useState } from 'react';
import {
  shape,
  bool,
  func,
  arrayOf,
  oneOfType,
  number,
  string,
} from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import '../styles.scss';
import { Box } from '@chakra-ui/react';

const ShowNode = ({ node, path, treeIndex, canDrag, nodeAction }) => {
  const handleAddService = () => {
    return nodeAction('NEW', node, path, 'service', false);
  };
  const nodeWidth =
    node?.type === 'logic'
      ? 20 * node.title.length // 42
      : node?.type === 'condition'
      ? 10 * node.title.length // 350 - path.length * 42
      : node?.type === 'service'
      ? 100 - node.title.length * 10 // 100
      : 0;
  const nodeMinWidth =
    node?.type === 'logic'
      ? 10 * node.title.length // 42
      : node?.type === 'condition'
      ? 10 * node.title.length // 350 - path.length * 42
      : node?.type === 'service'
      ? 90 // 100
      : 0;
  const nodeTitle = node.title;
  const nodeSubtitle = node.subtitle;
  const className = `rowContents ${
    !canDrag ? `rowContentsDragDisabled` : ''
  } path- ${path.join('-')}`;

  return (
    <div className={className}>
      {node.isService && (
        <div>
          <button
            className="btn btn-primary"
            variant="contained"
            onClick={handleAddService}
            style={{ marginRight: '30px' }}
            // sx={{ fontSize: "12px" }}
          >
            Add Service
          </button>
          <button
            className="btn btn-primary"
            onClick={() => nodeAction('new', node, path, 'logic')}
            icon="add"
            style={{ width: '100px' }}
          >
            Group
          </button>
        </div>
      )}

      {!node.isService && (
        <>
          <div
            className="rowLabel"
            onDoubleClick={() => nodeAction('edit', node, path)}
            style={{ width: `${nodeWidth}px`, minWidth: `${nodeMinWidth}px` }}
          >
            <span
              className={`rowTitle${
                node.subtitle ? `rowTitleWithSubtitle` : ''
              }`}
            >
              {typeof nodeTitle === 'function'
                ? nodeTitle({ subnode: node, path, treeIndex })
                : nodeTitle}
            </span>

            {nodeSubtitle && (
              <span className="rowSubtitle">
                {typeof nodeSubtitle === 'function'
                  ? nodeSubtitle({ subnode: node, path, treeIndex })
                  : nodeSubtitle}
              </span>
            )}
          </div>

          <div className="rowToolbar" style={{ float: 'left' }}>
            <>
              <div className="toolbarButton">
                <button
                  className="btn btn-primary"
                  onClick={() => nodeAction('edit', node, path)}
                >
                  <ModeEditIcon style={{ color: 'grey' }} />
                </button>
              </div>
              {(node.type === 'service' ||
                node.type === 'logic' ||
                node.type === 'condition') && (
                <>
                  <div className="toolbarButton">
                    <button
                      className="btn btn-primary"
                      onClick={() => nodeAction('new', node, path, 'condition')}
                      icon="add"
                    >
                      Condition
                    </button>
                  </div>
                  {/* <div className="toolbarButton">
                    <button
                      className="btn btn-primary"
                      onClick={() => nodeAction('new', node, path, 'logic')}
                      icon="add"
                    >
                      Group
                    </button>
                  </div> */}
                </>
              )}

              <div className="toolbarButton">
                <button
                  className="btn btn-primary delete"
                  onClick={() => nodeAction('delete', node, path)}
                  disabled={
                    node.type === 'logic' &&
                    path.length === 1 &&
                    (!node.children || node.children.length === 0)
                  }
                >
                  <DeleteIcon style={{ color: 'grey' }} />
                </button>
              </div>
            </>
          </div>
        </>
      )}
    </div>
  );
};

ShowNode.propTypes = {
  node: shape({}).isRequired,
  path: arrayOf(oneOfType([string, number])).isRequired,
  treeIndex: number.isRequired,
  canDrag: bool.isRequired,
  nodeAction: func.isRequired,
};

export default ShowNode;
