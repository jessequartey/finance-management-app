"use client";

import { useState } from "react";
import { currencyformatter } from "@/lib/utils";
import ExpenseCatItem from "@/components/ExpenseCatItem";

import { Chart as Chartjs, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Modal from "@/components/Modal";

Chartjs.register(ArcElement, Tooltip, Legend);

const Dummy_Data = [
  {
    id: 1,
    title: "Entertainment",
    color: "red",
    total: 500,
  },
  {
    id: 2,
    title: "Food",
    color: "green",
    total: 500,
  },
  {
    id: 3,
    title: "Fuel",
    color: "yellow",
    total: 500,
  },
  {
    id: 4,
    title: "Games",
    color: "purple",
    total: 500,
  },
  {
    id: 5,
    title: "Sex",
    color: "blue",
    total: 500,
  },
];

export default function Home() {
  const [moddalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      {/* modal */}
      <Modal show={moddalIsOpen} onClose={setModalIsOpen} />

      <main className="container max-w-2xl px-6 py-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyformatter(100000)}</h2>
        </section>
        <section className="flex items-center gap-2 py-3">
          <button
            onClick={() => {
              setModalIsOpen(true);
            }}
            className="btn btn-primary"
          >
            * Expenses
          </button>
          <button
            onClick={() => {
              setModalIsOpen(true);
            }}
            className="btn btn-primary-outline"
          >
            * Income
          </button>
        </section>

        {/* Expenses */}
        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {Dummy_Data.map((expense) => {
              return (
                <ExpenseCatItem
                  color={expense.color}
                  title={expense.title}
                  total={expense.total}
                />
              );
            })}
          </div>
        </section>

        {/* Chart Section */}
        <section className="py6">
          <h1 className="text-2xl">Stats</h1>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: Dummy_Data.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: Dummy_Data.map((expense) => expense.total),
                    backgroundColor: Dummy_Data.map((expense) => expense.color),
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
