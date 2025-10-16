const updateUserTasks = (Variables, setGlobalVariableValue, item) => {
  console.log('item', item);

  setGlobalVariableValue({
    key: 'USER',
    value: { ...Variables.USER, daily_tasks: { ...item } },
  });
};

export default updateUserTasks;
