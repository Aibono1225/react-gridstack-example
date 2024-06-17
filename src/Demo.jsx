import React, { useState, useRef, useEffect, createRef } from "react";
import { GridStack } from "gridstack";
import { Button, Drawer } from "antd";
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
  const compRef = useRef();
  const [hasSavedLayout, setHasSavedLayout] = useState(false);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  if (Object.keys(refs.current).length !== components.length) {
    components.forEach(({ id }) => {
      refs.current[id] = refs.current[id] || createRef();
    });
  }

  let options1 = {
    // column: 6,
    minRow: 1, // don't collapse when empty
    float: true,
    dragOut: true,
    autoPosition: true,
    // sizeToContent: true,
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
      w: 2,
      h: 1,
      ratio: 2,
    };
    setComponents([...components, newComponent]);
  };

  const saveLayout = () => {
    const grid = gridRef.current;
    const layout = grid.save(false);

    const extendedLayout = layout.map((item) => {
      const component = components.find((comp) => comp.id === item.id);
      return { ...item, componentKey: component.key, ratio: component.ratio };
    });

    const uniqueCompo = Array.from(
      new Set(extendedLayout.map((item) => item.id))
    ).map((id) => {
      return extendedLayout.find((item) => item.id === id);
    });

    // localStorage.setItem("grid-layout", JSON.stringify(extendedLayout));
    localStorage.setItem("grid-layout", JSON.stringify(uniqueCompo));
  };

  const clearLayout = () => {
    localStorage.removeItem("grid-layout");
    window.location.reload();
  };

  const addResizeListener = () => {
    if (gridRef.current && compRef.current) {
      gridRef.current.on("resize", function (event, el) {
        const node = el.gridstackNode;
        if (node) {
          const aspectRatio = el.getAttribute("data-ratio");
          const newHeight = Math.round(node.w / aspectRatio);
          gridRef.current.update(el, { h: newHeight });
        }
      });

      compRef.current.on("resize", function (event, el) {
        const node = el.gridstackNode;
        if (node) {
          const aspectRatio = el.getAttribute("data-ratio");
          const newHeight = Math.round(node.w / aspectRatio);
          gridRef.current.update(el, { h: newHeight });
        }
      });
    }
  };

  useEffect(() => {
    const savedLayout = JSON.parse(localStorage.getItem("grid-layout"));
    if (savedLayout) {
      setHasSavedLayout(true);
      gridRef.current = GridStack.init(options1, "#grid1");
      compRef.current = GridStack.init(options1, "#grid2");
      const grid = gridRef.current;

      const restoredComponents = savedLayout.map((item) => ({
        id: item.id,
        key: item.componentKey,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        ratio: item.ratio,
      }));

      console.log("restoredComponents:", restoredComponents);
      // grid.load(savedLayout);
      addResizeListener();
      grid.batchUpdate();
      setComponents(restoredComponents);

      grid.batchUpdate();
    }
  }, []);

  useEffect(() => {
    if (!gridRef.current) {
      gridRef.current = GridStack.init(options1, "#grid1");
      compRef.current = GridStack.init(options1, "#grid2");

      addResizeListener();
    }

    const grid = compRef.current;
    grid.batchUpdate();
    grid.removeAll(false);
    components.forEach(({ id, key, x, y, w, h }) => {
      const element = refs.current[id].current;
      if (hasSavedLayout) {
        element.setAttribute("gs-id", id);
        element.setAttribute("gs-key", key);
        element.setAttribute("gs-x", x);
        element.setAttribute("gs-y", y);
        element.setAttribute("gs-w", w);
        element.setAttribute("gs-h", h);
        setHasSavedLayout(false);
        gridRef.current.addWidget(element);
        // gridRef.current.makeWidget(element);
        return;
      }
      // grid.makeWidget(element);
    });
    const allCompItem = compRef.current.getGridItems();

    allCompItem.forEach((comp) => {
      grid.makeWidget(comp);
    });

    grid.batchUpdate(false);
  }, [components]);

  return (
    <div>
      <Button type="primary" onClick={showDrawer}>
        添加组件
      </Button>
      <Button
        type="primary"
        onClick={saveLayout}
        style={{ marginLeft: "20px" }}
      >
        保存布局
      </Button>
      <Button
        type="primary"
        onClick={clearLayout}
        style={{ marginLeft: "20px" }}
      >
        清空已保存的布局
      </Button>
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={onClose}
        open={open}
        mask={false}
      >
        <ComponentList onAddComponent={handleAddComponent} />
      </Drawer>
      <div style={{ marginTop: "20px" }}>
        <div className={`grid-stack controlled`} id="grid1"></div>
      </div>
      <br />
      <div>
        <div className={`grid-stack demo`} id="grid2">
          {components.map((comp) => (
            <div
              key={comp.id}
              gs-id={comp.id}
              data-gs-id={comp.id}
              data-gs-key={comp.key}
              data-gs-x={comp.x}
              data-gs-y={comp.y}
              gs-h={comp.h}
              gs-w={comp.w}
              data-ratio={comp.ratio}
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
