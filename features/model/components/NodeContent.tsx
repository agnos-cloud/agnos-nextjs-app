import React from "react";
import { Handle, Position } from "reactflow";

const ROW_HEIGHT = 15;
const TOP_OFFSET = 20;

type NodeContentProps = {
  id: string | undefined;
  data: any;
};

export const NodeContent = (props: NodeContentProps) => {
  let row = -1;
  const { id, data } = props;

  const getContent = (value: any, key?: string, fullKey?: string) => {
    row++;

    if (value.type === "boolean" || value.type === "number" || value.type === "string" || value.type === "integer") {
      return (
        <React.Fragment key={key || fullKey}>
          <div className="content-row">
            {key ? `${key}: ` : ""}
            <span
              className={`content-row-value content-row-value-${value.type}`}
              title={`${value.description}`}
            >{`${value.type}`}</span>
          </div>
          {fullKey ? (
            <Handle
              type="source"
              id={`${id}.${fullKey}`}
              position={Position.Right}
              isConnectable={false}
              style={{ top: ROW_HEIGHT * row + ROW_HEIGHT / 2 + TOP_OFFSET }}
            />
          ) : null}
        </React.Fragment>
      );
    } else if (value.type === "array") {
      return (
        <React.Fragment key={key || fullKey}>
          <div className="content-row-object">
            <div className="content-row-object-title" title={key ? `${key}: ` : ""}>
              {key ? `${key}: array of` : "array of"}
            </div>
            {getContent(value.items, undefined, fullKey)}
          </div>
        </React.Fragment>
      );
    } else if (value.type === "object") {
      return (
        <React.Fragment key={key || fullKey}>
          <div className="content-row-object">
            {key ? <div className="content-row-object-title" title={`${key}: `}>{`${key}: `}</div> : null}
            <div className="content-row-object-body">{value.properties ? "{" : "{}"}</div>
            {(() => {
              if (key) row++;
            })()}
            {Object.keys(value.properties || {}).map((k) => getContent(value.properties[k], k, `${fullKey}.${k}`))}
            {value.properties && <div className="content-row-object-body">{"}"}</div>}
            {(() => {
              if (value.properties) row++;
            })()}
          </div>
        </React.Fragment>
      );
    }

    return <div>&lt;&lt;unknown property&gt;&gt;</div>;
  };

  return (
    <div className="content">
      {Object.keys(data).map((key) => {
        const value = data[key];
        return getContent(value, key, key);
      })}
    </div>
  );
};
