import React, { useState, useRef, useEffect, createRef } from "react";
import { GridStack } from "gridstack";
import { Button } from "antd";
import A from "./components/A";
import B from "./components/B";
import C from "./components/C";
import Table from "./components/table";
import "./demo.css";

const COMPONENTS = {
  A: <A />,
  B: <B />,
  C: <C />,
  Table: <Table />,
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

const Demo = () => {
  const [components, setComponents] = useState([]);
  const refs = useRef({});
  const gridRef = useRef();

  if (Object.keys(refs.current).length !== components.length) {
    components.forEach(({ id }) => {
      console.log("/s", id);
      refs.current[id] = refs.current[id] || createRef();
    });
  }

  let options1 = {
    // column: 6,
    minRow: 3, // don't collapse when empty
    float: true,
    dragOut: true,
    // itemclassName: 'with-lines', // test a custom additional className #2110
    acceptWidgets: function (el) {
      return true;
    }, // function example, but can also be: true | false | '.someclassName' value
  };

  const handleAddComponent = (componentKey) => {
    const newComponent = {
      id: componentKey + components.length,
      key: componentKey,
      x: 0,
      y: 0,
      w: 4,
      h: 2,
    };
    setComponents([...components, newComponent]);
  };

  const saveLayout = () => {
    const grid = gridRef.current;
    const layout = grid.save();
    localStorage.setItem("grid-layout", JSON.stringify(layout));
  };

  useEffect(() => {
    const savedLayout = JSON.parse(localStorage.getItem("grid-layout"));
    if (savedLayout) {
      gridRef.current = GridStack.init(options1, "#grid1");
      const grid = gridRef.current;
      grid.load(savedLayout);
      console.log("??", savedLayout);
    }
  }, []);

  useEffect(() => {
    if (!gridRef.current) {
      gridRef.current = GridStack.init(options1, "#grid1");

      // Add event listener for change
      gridRef.current
        .on("change", function (event, items) {
          items.forEach((item) => {
            const { x, y, w, h } = item;
            console.log("??", item);
            console.log(`Dragged element: x=${x}, y=${y}, w=${w}, h=${h}`);
          });

          const allItems = gridRef.current.engine.nodes.map((node) => ({
            x: node.x,
            y: node.y,
            w: node.w,
            h: node.h,
          }));
          console.log("All items:", allItems);
        })
        .on("resize", function (event, el) {
          const node = el.gridstackNode;
          if (node) {
            const aspectRatio = 1;
            const newHeight = Math.round(node.w / aspectRatio);
            gridRef.current.update(el, { h: newHeight });
          }
        });
    }

    const grid = gridRef.current;
    grid.batchUpdate();
    grid.removeAll(false);
    components.forEach(({ id }) => {
      const element = refs.current[id].current;
      console.log("每个", element);
      element.setAttribute("data-gs-id", id);
      element.setAttribute("data-gs-key", id.replace(/[0-9]/g, ""));
      grid.makeWidget(element);
    });
    grid.batchUpdate(false);
  }, [components]);

  return (
    <div>
      <ComponentList onAddComponent={handleAddComponent} />
      <Button type="primary" onClick={saveLayout}>
        保存布局
      </Button>
      <div style={{ marginTop: "20px" }}>
        <div className={`grid-stack controlled`} id="grid1">
          {components.map((comp) => (
            <div
              key={comp.id}
              data-gs-id={comp.id}
              data-gs-key={comp.key}
              data-gs-x={comp.x}
              data-gs-y={comp.y}
              data-gs-width={comp.w}
              data-gs-height={comp.h}
              ref={refs.current[comp.id]}
              className="grid-stack-item"
            >
              <div className="grid-stack-item-content">
                {COMPONENTS[comp.key]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Demo;
