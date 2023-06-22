"use client";

import { useState, useContext, useEffect } from "react";
import { currencyformatter } from "@/lib/utils";
import ExpenseCatItem from "@/components/ExpenseCatItem";

import AddIncomeModal from "@/components/modals/AddIncomeModal";
import AddExpensesModal from "@/components/modals/AddExpensesModal";
import SignIn from "@/components/SignIn";

import { Chart as Chartjs, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { financeContext } from "@/lib/store/FinanceContext";
import { authContext } from "@/lib/store/auth-context";

Chartjs.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpensesModal, setShowAddExpensesModal] = useState(false);

  const { expenses, income } = useContext(financeContext);
  const { user } = useContext(authContext);

  //Setting up balance value
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const newBalance =
      income.reduce((total, i) => {
        return total + i.amount;
      }, 0) -
      expenses.reduce((total, e) => {
        return total + e.total;
      }, 0);
    setBalance(newBalance);
  }, [expenses, income]);

  if (!user) {
    return <SignIn />;
  }

  return (
    <>
      {/*Add Income modal */}

      <AddIncomeModal
        show={showAddIncomeModal}
        onClose={setShowAddIncomeModal}
      />

      {/* Add expenses Modal */}

      <AddExpensesModal
        show={showAddExpensesModal}
        onClose={setShowAddExpensesModal}
      />

      <main className="container max-w-2xl px-6 py-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyformatter(balance)}</h2>
        </section>
        <section className="flex items-center gap-2 py-3">
          <button
            onClick={() => {
              setShowAddExpensesModal(true);
            }}
            className="btn btn-primary"
          >
            + Expenses
          </button>
          <button
            onClick={() => {
              setShowAddIncomeModal(true);
            }}
            className="btn btn-primary-outline"
          >
            + Income
          </button>
        </section>

        {/* Expenses */}
        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {expenses.map((expense) => {
              return <ExpenseCatItem key={expense.id} expense={expense} />;
            })}
          </div>
        </section>

        {/* Chart Section */}
        <section className="py6">
          <div id="stats" />
          <h1 className="text-2xl">Stats</h1>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: expenses.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: expenses.map((expense) => expense.total),
                    backgroundColor: expenses.map((expense) => expense.color),
                    borderColor: ["#181818"],
                    borderWidth: 5,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
