import { useState } from 'react';

const TodoList = () => {
  const [userInput, setUserInput] = useState('');
  const [list, setList] = useState<{ id: number; value: string }[]>([]);

  const addItem = () => {
    if (userInput.trim() !== '') {
      const newItem = { id: Math.random(), value: userInput };
      setList([...list, newItem]);
      setUserInput('');
    }
  };

  const deleteItem = (id: number) => {
    const updatedList = list.filter(item => item.id !== id);
    setList(updatedList);
  };

  const editItem = (index: number) => {
    const newValue = prompt('Edit the todo:', list[index].value);
    if (newValue && newValue.trim() !== '') {
      const updatedList = [...list];
      updatedList[index].value = newValue;
      setList(updatedList);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">TODO LIST</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Add item..."
          className="flex-grow border p-2 rounded-l"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-r"
          onClick={addItem}
        >
          ADD
        </button>
      </div>
      <ul className="space-y-2">
        {list.map((item, index) => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-gray-100 p-2 rounded shadow"
          >
            {item.value}
            <div>
              <button
                className="text-sm bg-red-500 text-white px-2 py-1 rounded mr-2"
                onClick={() => deleteItem(item.id)}
              >
                Delete
              </button>
              <button
                className="text-sm bg-yellow-500 text-white px-2 py-1 rounded"
                onClick={() => editItem(index)}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
