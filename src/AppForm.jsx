import React, { useState } from "react";

const initForm = {
  name: "",
  description: "",
  clientId: "",
};

const AppForm = () => {
  const [formData, setFormData] = useState(initForm);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveForm = async () => {
    // TODO: 校验表单信息
  };

  return (
    <div className="w-max min-w-full pt-10">
      <div className="flex space-x-6 items-center">
        <div className="border w-[32.5rem] px-5 py-4 bg-white">
          <label className="block text-gray-700 mb-2 text-xs">应用名称</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="请输入应用名称"
            className="w-full focus:outline-none text-sm bg-transparent"
          />
        </div>
        <div className="w-[19.5rem] text-xs text-red-500 !leading-6">
          <IoWarningOutline size={20} className="text-red-500 mr-2" />
          应用名称不能为空
        </div>
      </div>
      <div className="flex space-x-6 items-center">
        <div className="border w-[32.5rem] px-5 py-4 bg-white">
          <label className="block text-gray-700 mb-2 text-xs">应用描述</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            placeholder="请输入应用描述"
            className="w-full focus:outline-none text-sm bg-transparent"
          />
        </div>
        <div className="w-[19.5rem] text-xs text-red-500 !leading-6">
          <IoWarningOutline size={20} className="text-red-500 mr-2" />
          应用描述不能为空
        </div>
      </div>
      <div className="flex space-x-6 items-center">
        <div className="border w-[32.5rem] px-5 py-4 bg-white">
          <label className="block text-gray-700 mb-2 text-xs">应用id</label>
          <input
            type="text"
            name="clientId"
            value={formData.clientId}
            onChange={handleFormChange}
            placeholder="请输入应用id"
            className="w-full focus:outline-none text-sm bg-transparent"
          />
        </div>
      </div>
      <button key="submit" onClick={() => saveForm()}>
        保存
      </button>
    </div>
  );
};

export default AppForm;
