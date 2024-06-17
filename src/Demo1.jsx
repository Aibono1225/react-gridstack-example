import React, { useState, useEffect, createRef, useRef } from "react";
import { GridStack } from "gridstack";
import Table from "./components/table.jsx";
import { Button } from "antd";
import "gridstack/dist/gridstack.min.css";
import "./demo.css";

const Item = ({ id, content }) => (
  <div>
    {id}
    {content}
  </div>
);
// const Item = ({ id }) => <div>{id}<Table /></div>

let options1 = {
  // column: 6,
  minRow: 1, // don't collapse when empty
  cellHeight: 70,
  float: true,
  dragOut: true,
  // itemclassName: 'with-lines', // test a custom additional className #2110
  acceptWidgets: function (el) {
    return true;
  }, // function example, but can also be: true | false | '.someclassName' value
};

let options2 = {
  // column: 6,
  minRow: 1, // don't collapse when empty
  cellHeight: 70,
  float: true,
  dragOut: true,
  // itemclassName: 'with-lines', // test a custom additional className #2110
  acceptWidgets: function (el) {
    return true;
  }, // function example, but can also be: true | false | '.someclassName' value
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
    gridRef.current = gridRef.current || GridStack.init(options1, "#grid1");
    GridStack.init(options2, "#grid2");

    // GridStack.setupDragIn(".sidebar .grid-stack-item", {
    //   appendTo: ".controlled",
    // });
    // gridRef.current = gridRef.current || GridStack.init();
    const grid = gridRef.current;
    grid.on("dragstop", function () {
      // let x = parseInt(grid.el.getAttribute("gs-x")) || 0;
      let x = grid.el.gridstackNode;
    });
    const wuw = grid.getGridItems();
    grid.batchUpdate();
    grid.removeAll(false);
    items.forEach(({ id }) => grid.makeWidget(refs.current[id].current));
    console.log("??", wuw);
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
      <div className="grid-stack" id="grid2"></div>
    </div>
  );
};

const Demo1 = () => {
  const [items, setItems] = useState([
    { id: "item-1", x: 0, y: 0, w: 2, h: 2, content: "n1" },
    { id: "item-2", x: 3, y: 1, h: 2, content: "n2" },
    {
      x: 2,
      y: 3,
      w: 3,
      maxW: 3,
      id: "special",
      content: "has maxW=3",
    },
    { id: "item-3", x: 3, y: 1, h: 2, content: <Table /> },
  ]);
  return (
    <div>
      <h2>Demo1页</h2>
      {/* <Button type="primary">编辑页面</Button> */}
      <ControlledStack
        items={items}
        addItem={() => setItems([...items, { id: `item-${items.length + 1}` }])}
      />
    </div>
  );
};

export default Demo1;
