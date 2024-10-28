"use client";

import PropTypes from "prop-types";
import React, { useState, useReducer, useCallback } from "react";
import CustomTheme from "./Renderer";

import SortableTree, {
  addNodeUnderParent,
  removeNodeAtPath,
  changeNodeAtPath,
  toggleExpandedForAll,
} from "react-sortable-tree";
import { Box } from "@chakra-ui/react";
import { getItem } from "@/utils";
import { number } from "zod";

function FilterTree({ clientId, setWorkflowData }) {
  let savedTreeData = getItem(`workflow_${clientId}`);
  if (
    !savedTreeData ||
    !Array.isArray(savedTreeData) ||
    !savedTreeData.length
  ) {
    savedTreeData = [
      {
        title: "",
        type: "service",
        dragDisabled: true,
        expanded: true,
        isService: true,
      },
    ];
  }
  const initTree = savedTreeData;
  const treeDataReducer = (treeData, action) => {
    const { node, path, getNodeKey, newType, isService, title } = action;
    switch (action.type.toUpperCase()) {
      case "SET":
        return action.treeData;

      case "NEW":
        const newNode =
          newType === "condition"
            ? {
                title: "",
                field: "",
                label: "",
                operator: "",
                value: "",
                type: "condition",
                dragDisabled: false,
                mode: "new",
                isService: isService,
              }
            : newType === "logic"
            ? {
                title: "",
                type: "logic",
                dragDisabled: false,
                children: [],
                mode: "new",
                isService: isService,
              }
            : {
                title: title,
                type: "service",
                dragDisabled: false,
                children: [],
                mode: "new",
                isService: isService,
              };
        const index =
          node.type === "condition" ? 1 : node.type === "logic" ? 1 : 1;
        return addNodeUnderParent({
          treeData,
          parentKey: path[path.length - index],
          expandParent: true,
          getNodeKey,
          newNode,
        }).treeData;

      case "EDIT":
        return changeNodeAtPath({
          treeData,
          path,
          getNodeKey,
          newNode: { ...node, mode: "edit", clone: { ...node } },
        });

      case "SAVE":
        switch (node.type) {
          case "service":
            node.title = title;
            break;
          case "condition":
            node.title = `${node.field} ${node.fieldCheck} ${node.operator} ${node.value}`;
            break;
          case "logic":
            node.title = node.logic || "";
            break;
          default:
            node.title = "";
            break;
        }
        return changeNodeAtPath({
          treeData,
          path,
          getNodeKey,
          newNode: { ...node, mode: "show" },
        });

      case "DELETE":
        const deletedTree = removeNodeAtPath({
          treeData,
          path: action.path,
          getNodeKey,
        });
        if (!deletedTree.length) {
          return [
            {
              title: "AND",
              field: "",
              label: "",
              operator: "",
              value: "AND",
              logic: "AND",
              type: "logic",
              dragDisabled: false,
            },
          ];
        }
        return deletedTree;

      case "CANCEL":
        if (node.mode === "edit") {
          return changeNodeAtPath({
            treeData,
            path,
            getNodeKey,
            newNode: { ...node.clone, mode: "show" },
          });
        }
        return removeNodeAtPath({ treeData, path, getNodeKey });

      default:
        return [...treeData]; // Should not get there.
    }
  };
  const initIsBusy = initTree.length && initTree[0].mode === "new";

  const [treeData, dispatchTreeData] = useReducer(treeDataReducer, initTree);
  const [isBusy, setIsBusy] = useState(initIsBusy);

  const getNodeKey = ({ treeIndex }) => treeIndex;

  const handleFilterItemAction = useCallback(
    (action, node, path, newType, isService, title) => {
      dispatchTreeData({
        type: action.toUpperCase(),
        node,
        path,
        getNodeKey,
        newType,
        isService,
        title,
      });
      if (action === "new" || action === "edit") {
        setIsBusy(true);
      } else {
        setIsBusy(false);
      }
    },
    [dispatchTreeData, setIsBusy]
  );
  setWorkflowData(treeData);

  return (
    <div>
      <Box sx={{ marginTop: "10px", paddingLeft: "100px" }}>
        <SortableTree
          className="filter-tree"
          isVirtualized={false}
          theme={CustomTheme}
          // rowHeight={52}
          // scaffoldBlockPxWidth={42}
          // style={{ paddingTop: '10px' }}
          treeData={treeData}
          onChange={(changedTreeData) =>
            dispatchTreeData({ type: "SET", treeData: changedTreeData })
          }
          shouldCopyOnOutsideDrop
          onMoveNode={(e) =>
            dispatchTreeData({ type: "SET", treeData: e.treeData })
          }
          // canDrag={({ node }) => !node.dragDisabled}
          // canDrop={(node) => node.nextParent?.type === "logic"}
          generateNodeProps={() => ({
            handleFilterItemAction,
            isBusy,
          })}
        />
      </Box>
    </div>
  );
}

FilterTree.propTypes = {
  clientId: PropTypes.number,
  setWorkflowData: PropTypes.func,
  importedData: PropTypes.array,
};

FilterTree.defaultProps = {
  clientId: 0,
  setWorkflowData: () => {},
  importedData: []
};

export default FilterTree;
