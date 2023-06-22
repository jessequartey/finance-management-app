import Modal from "@/components/Modal";
import { useState, useContext, useRef } from "react";
import { financeContext } from "@/lib/store/FinanceContext";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

function AddExpensesModal({ show, onClose }) {
  const [expenseAmount, setExpenseAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddNewExpenseCat, setShowAddNewExpenseCat] = useState(false);

  const { expenses, addExpenseItem, addCategory } = useContext(financeContext);

  const titleRef = useRef();
  const colorRef = useRef();

  // Adding new Category
  const addCategoryHandler = async () => {
    const title = titleRef.current.value;
    const color = colorRef.current.value;

    try {
      await addCategory({ title, color, total: 0 });
      setShowAddNewExpenseCat(false);
      toast.success("Category created!");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  // add expense item handler
  const addExpenseItemHandler = async () => {
    // find the expense category
    const expense = expenses.find((e) => {
      return e.id === selectedCategory;
    });
    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + +expenseAmount,
      items: [
        ...expense.items,
        {
          amount: +expenseAmount,
          createdAt: new Date(),
          id: uuidv4(),
        },
      ],
    };

    try {
      await addExpenseItem(selectedCategory, newExpense);

      setExpenseAmount("");
      setSelectedCategory(null);
      onClose();
      toast.success("Expense item added!");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex flex-col gap 4">
        <label htmlFor="">Enter an amount</label>
        <input
          type="number"
          min={0.01}
          step={0.01}
          placeholder="Enter expense amount"
          value={expenseAmount}
          onChange={(e) => {
            setExpenseAmount(e.target.value);
          }}
        />
      </div>

      {/* expenses categories */}
      {expenseAmount > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl capitalize">Select expense category</h3>
            <button
              className=" text-lime-400 "
              onClick={() => {
                setShowAddNewExpenseCat(true);
              }}
            >
              + New Category
            </button>
          </div>

          {showAddNewExpenseCat && (
            <div className="flex items-center justify-between">
              <input type="text" placeholder="Enter Title" ref={titleRef} />
              <label htmlFor="">Pick Color</label>
              <input type="color" ref={colorRef} className="w-24 h-10" />
              <button
                className="btn btn-primary-outline"
                onClick={addCategoryHandler}
              >
                Create
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setShowAddNewExpenseCat(false);
                }}
              >
                Cancel
              </button>
            </div>
          )}

          {expenses.map((expense) => {
            return (
              <button
                key={expense.id}
                onClick={(e) => {
                  setSelectedCategory(expense.id);
                }}
                style={{
                  boxShadow:
                    expense.id === selectedCategory ? "1px 4px 4px " : "none",
                }}
                className="rounded-3xl"
              >
                <div className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl">
                  <div className="flex items-center gap-2">
                    <div
                      className="rounded-full w-[25px] h-[25px]"
                      style={{ backgroundColor: expense.color }}
                    />
                    <h4 className="capitalize">{expense.title}</h4>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
      {expenseAmount > 0 && selectedCategory && (
        <button
          className="btn btn-primary mt-6"
          onClick={addExpenseItemHandler}
        >
          Add Expense
        </button>
      )}
    </Modal>
  );
}

export default AddExpensesModal;
