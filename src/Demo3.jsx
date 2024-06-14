import React, { useState, useEffect, createRef, useRef } from "react";
import { GridStack } from "gridstack";
import A from "./components/A";
import B from "./components/B";
import C from "./components/C";
import Table from "./components/table.jsx";
import "gridstack/dist/gridstack.min.css";
import "./demo.css";

const Item = ({ content }) => <div>{content}</div>;

const COMPONENTS = {
  A: <A />,
  B: <B />,
  C: <C />,
  Table: <Table />,
};

let options = {
  minRow: 1, // don't collapse when empty
  cellHeight: 70,
  autoPosition: true,
  float: true,
  dragOut: true,
  acceptWidgets: function (el) {
    return true;
  }, // function example, but can also be: true | false | '.someclassName' value
};

const ComponentList = ({ onAddComponent }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Component Name</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(COMPONENTS).map((key) => (
          <tr key={key}>
            <td>
              <button onClick={() => onAddComponent(key)}>{key}</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ControlledStack = ({ items, addItem }) => {
  const refs = useRef({});
  const gridRef = useRef();

  if (Object.keys(refs.current).length !== items.length) {
    items.forEach(({ id }) => {
      refs.current[id] = refs.current[id] || createRef();
    });
  }

  useEffect(() => {
    // gridRef.current =
    //   gridRef.current || GridStack.init(options, "#grid1").load([...initItems]);
    gridRef.current = gridRef.current || GridStack.init(options, "#grid1");

    GridStack.setupDragIn(".sidebar .grid-stack-item", {
      appendTo: ".controlled",
    });
    // gridRef.current = gridRef.current || GridStack.init();
    const grid = gridRef.current;
    grid.batchUpdate();
    grid.removeAll(false);
    items.forEach(({ id }) => grid.makeWidget(refs.current[id].current));
    grid.batchUpdate(false);
  }, [items]);

  return (
    <div>
      <div className={`grid-stack controlled`} id="grid1">
        {items.map((item, i) => {
          return (
            <div
              ref={refs.current[item.id]}
              key={item.id}
              className={"grid-stack-item"}
            >
              <div className="grid-stack-item-content">
                <Item {...item} />
              </div>
            </div>
          );
        })}
      </div>
      <br />
    </div>
  );
};

const Demo2 = () => {
  // const [items, setItems] = useState([{ id: "item-1" }, { id: "item-2" }]);

  const [items, setItems] = useState([
    { x: 2, y: 3, w: 5, h: 2, id: "special", content: <Table /> },
  ]);
  const [components, setComponents] = useState([]);

  const handleAddComponent = (componentKey) => {
    console.log("??", componentKey);
    // const newComponent = {
    //   id: componentKey + components.length,
    //   key: componentKey,
    //   x: 0,
    //   y: 0,
    //   w: 1,
    //   h: 1,
    // };
    // setComponents([...components, newComponent]);
  };

  return (
    <div>
      <h2>Demo3页</h2>
      <ComponentList onAddComponent={handleAddComponent} />
      <div className="col-md-3">
        <div className="sidebar">
          <div className="grid-stack-item">
            <div className="grid-stack-item-content"></div>
          </div>
          <div className="grid-stack-item" gs-w="2" gs-h="1" gs-max-w="3">
            <div className="grid-stack-item-content">2x1, max=3</div>
          </div>
        </div>
      </div>
      <ControlledStack
        items={items}
        addItem={() => setItems([...items, { id: `item-${items.length + 1}` }])}
      />
    </div>
  );
};

export default Demo2;
