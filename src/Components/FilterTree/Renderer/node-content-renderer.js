"use client";

import React from "react";
import {
  arrayOf,
  bool,
  func,
  node as propNode,
  number,
  oneOfType,
  shape,
  string,
} from "prop-types";

import "./styles.scss";
import {
  EditNodeLogic,
  EditServiceCondition,
  EditNodeCondition,
  ShowNode,
} from "./Nodes";

function isDescendant(older, younger) {
  return (
    !!older.children &&
    typeof older.children !== "function" &&
    older.children.some(
      (child) => child === younger || isDescendant(child, younger)
    )
  );
}

const CustomThemeNodeContentRenderer = ({
  scaffoldBlockPxWidth,
  toggleChildrenVisibility,
  connectDragPreview,
  connectDragSource,
  isDragging,
  canDrop,
  canDrag,
  node,
  title,
  subtitle,
  draggedNode,
  path,
  treeIndex,
  isSearchMatch,
  isSearchFocus,
  handleFilterItemAction,
  className,
  style,
  didDrop,
  lowerSiblingCounts,
  listIndex,
  swapFrom,
  swapLength,
  swapDepth,
  treeId, // Not needed, but preserved for other renderers
  isOver, // Not needed, but preserved for other renderers
  parentNode, // Needed for dndManager
  ...otherProps
}) => {
  delete otherProps.rowDirection;
  const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
  const isLandingPadActive = !didDrop && isDragging;

  const nodeContent = connectDragPreview(
    <div
      className={`row${isLandingPadActive ? `rowLandingPad` : ""}${
        isLandingPadActive && !canDrop ? `rowCancelPad` : ""
      }${isSearchMatch ? `rowSearchMatch` : ""}${
        isSearchFocus ? `rowSearchFocus` : ""
      }${className ? ` ${className}` : ""}`}
      style={{ ...style, opacity: isDraggedDescendant ? 0.1 : 1 }}
    >
      {node.mode &&
        (node.mode === "edit" || node.mode === "new") &&
        node.type === "condition" && (
          <EditNodeCondition
            node={node}
            path={path}
            treeIndex={treeIndex}
            nodeAction={handleFilterItemAction}
          />
        )}
      {node.mode &&
        (node.mode === "edit" || node.mode === "new") &&
        node.type === "service" && (
          <EditServiceCondition
            node={node}
            path={path}
            treeIndex={treeIndex}
            nodeAction={handleFilterItemAction}
          />
        )}
      {node.mode &&
        (node.mode === "edit" || node.mode === "new") &&
        node.type === "logic" && (
          <EditNodeLogic
            node={node}
            path={path}
            treeIndex={treeIndex}
            nodeAction={handleFilterItemAction}
          />
        )}
      {(!node.mode || node.mode === "show") && (
        <ShowNode
          node={node}
          styles={{}}
          path={path}
          treeIndex={treeIndex}
          canDrag={canDrag}
          nodeAction={handleFilterItemAction}
        />
      )}
    </div>
  );

  const classNode =
    (node.type ? `type-${node.type}` : "") +
    (node.mode ? ` mode-${node.mode.toLowerCase()}` : "") +
    (node.status ? ` status-${node.status}` : "") +
    (path.length === 1 && (!node.children || node.children.length === 0)
      ? " has-no-children"
      : "");

  const classCanDrag = `rowWrapper${!canDrag ? `rowWrapperDragDisabled` : ""}`;

  return (
    <div style={{ height: "100%" }} {...otherProps} className={classNode}>
      {toggleChildrenVisibility &&
        node.children &&
        (node.children.length > 0 || typeof node.children === "function") && (
          <div>
            <button
              type="button"
              aria-label={node.expanded ? "Collapse" : "Expand"}
              className={node.expanded ? `collapseButton` : `expandButton`}
              style={{ left: -0.5 * scaffoldBlockPxWidth }}
              onClick={() =>
                toggleChildrenVisibility({ node, path, treeIndex })
              }
            />
            {node.expanded && !isDragging && (
              <div
                style={{ width: scaffoldBlockPxWidth }}
                className="lineChildren"
              />
            )}
          </div>
        )}
      <div className={classCanDrag}>
        {canDrag
          ? connectDragSource(nodeContent, { dropEffect: "copy" })
          : nodeContent}
      </div>
    </div>
  );
};

CustomThemeNodeContentRenderer.propTypes = {
  handleFilterItemAction: func.isRequired,
  canDrag: bool,
  className: string,
  isSearchFocus: bool,
  isSearchMatch: bool,
  listIndex: number,
  lowerSiblingCounts: arrayOf(number),
  node: shape({}).isRequired,
  path: arrayOf(oneOfType([string, number])).isRequired,
  scaffoldBlockPxWidth: number.isRequired,
  style: shape({}),
  subtitle: oneOfType([func, propNode]),
  swapDepth: number,
  swapFrom: number,
  swapLength: number,
  title: oneOfType([func, propNode]),
  toggleChildrenVisibility: func,
  treeIndex: number.isRequired,
  treeId: string.isRequired,

  // Drag and drop API functions
  // Drag source
  connectDragPreview: func.isRequired,
  connectDragSource: func.isRequired,
  didDrop: bool.isRequired,
  draggedNode: shape({}),
  isDragging: bool.isRequired,
  parentNode: shape({}), // Needed for dndManager
  // Drop target
  canDrop: bool,
  isOver: bool.isRequired,
  properties: shape({}),
};

CustomThemeNodeContentRenderer.defaultProps = {
  canDrag: false,
  canDrop: false,
  className: "",
  draggedNode: null,
  isSearchFocus: false,
  isSearchMatch: false,
  listIndex: 0,
  lowerSiblingCounts: [],
  parentNode: null,
  style: {},
  subtitle: null,
  swapDepth: null,
  swapFrom: null,
  swapLength: null,
  title: null,
  toggleChildrenVisibility: null,
  filterFields: [],
  properties: null,
};

export default CustomThemeNodeContentRenderer;
