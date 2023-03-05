import React from "react";
import { Radio, Modal } from "antd";

const ModalFilter = ({ open, onOk, onCancel, setFilterType, filterType }) => {
  return (
    <Modal
      title="Filter by type"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      className="modalFilter"
    >
      <Radio.Group
        defaultValue="Normal"
        buttonStyle="solid"
        onChange={(e) => setFilterType(e.target.value)}
        className="grid grid-cols-4 gap-5"
        value={filterType}
      >
        <Radio.Button value="normal">Normal</Radio.Button>
        <Radio.Button value="fighting">Fighting</Radio.Button>
        <Radio.Button value="flying">Flying</Radio.Button>
        <Radio.Button value="poison">Poison</Radio.Button>
        <Radio.Button value="ground">Ground</Radio.Button>
        <Radio.Button value="rock">Rock</Radio.Button>
        <Radio.Button value="bug">Bug</Radio.Button>
        <Radio.Button value="ghost">Ghost</Radio.Button>
        <Radio.Button value="steel">Steel</Radio.Button>
        <Radio.Button value="fire">Fire</Radio.Button>
        <Radio.Button value="water">Water</Radio.Button>
        <Radio.Button value="grass">Grass</Radio.Button>
        <Radio.Button value="electric">Electric</Radio.Button>
        <Radio.Button value="psychic">Psychic</Radio.Button>
        <Radio.Button value="ice">Ice</Radio.Button>
        <Radio.Button value="dragon">Dragon</Radio.Button>
        <Radio.Button value="dark">Dark</Radio.Button>
        <Radio.Button value="fairy">Fairy</Radio.Button>
      </Radio.Group>
    </Modal>
  );
};

export default ModalFilter;
