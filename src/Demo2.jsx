import React, { useState, useEffect, createRef, useRef } from "react";
import { GridStack } from "gridstack";
import Table from "./components/table.jsx";
import "gridstack/dist/gridstack.min.css";
import "./demo.css";

const Item = ({ id }) => <div>{id}</div>;

let initItems = [
  { x: 0, y: 0, w: 2, h: 2 },
  { x: 3, y: 1, h: 2 },
  { x: 2, y: 3, w: 3, maxW: 3, id: "special", content: "has maxW=3" },
];

let options = {
  // column: 6,
  minRow: 1, // don't collapse when empty
  cellHeight: 70,
  autoPosition: true,
  float: true,
  // removable: ".trash", // true or drag-out delete className
  dragOut: true,
  // itemclassName: 'with-lines', // test a custom additional className #2110
  acceptWidgets: function (el) {
    return true;
  }, // function example, but can also be: true | false | '.someclassName' value
};

let opts = {
  //   row: 1, // set min and max row to freeze the height
  dragOut: true,
  acceptWidgets: true,
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
    console.log("??", items);
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
  const [items, setItems] = useState([{ id: "item-1" }, { id: "item-2" }]);
  return (
    <div>
      <h2>Demo2页</h2>
      <div className="col-md-3">
        <div className="sidebar">
          <div className="grid-stack-item">
            {/* <div className="grid-stack-item-content">Drag me</div> */}
            <div className="grid-stack-item-content">
              <Table />
            </div>
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
