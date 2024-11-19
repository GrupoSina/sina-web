import { useFinancialContext } from "@/context/FinancialContext";
import { formatter } from "@/util/formatter";

export default function BudgetBalance() {
  const { loadingBalance, budgetExpenseBalance } = useFinancialContext();
  return (
    <>
      {loadingBalance ? (
        <div className="flex gap-4 w-full">
          <div className="dark:bg-[#1E1E1E] bg-white rounded-lg p-3 max-w-[266px] w-full">
            <div className="h-[20px] bg-gray-300 dark:bg-gray-700 rounded w-[100px] mb-2 animate-pulse"></div>
            <div className="h-[30px] bg-gray-300 dark:bg-gray-700 rounded w-[150px] animate-pulse"></div>
          </div>
          <div className="dark:bg-[#1E1E1E] bg-white rounded-lg p-3 max-w-[266px] w-full">
            <div className="h-[20px] bg-gray-300 dark:bg-gray-700 rounded w-[100px] mb-2 animate-pulse"></div>
            <div className="h-[30px] bg-gray-300 dark:bg-gray-700 rounded w-[150px] animate-pulse"></div>
          </div>
          <div className="dark:bg-[#1E1E1E] bg-white rounded-lg p-3 max-w-[266px] w-full">
            <div className="h-[20px] bg-gray-300 dark:bg-gray-700 rounded w-[100px] mb-2 animate-pulse"></div>
            <div className="h-[30px] bg-gray-300 dark:bg-gray-700 rounded w-[150px] animate-pulse"></div>
          </div>
          <div className="dark:bg-[#1E1E1E] bg-white rounded-lg p-3 max-w-[266px] w-full">
            <div className="h-[20px] bg-gray-300 dark:bg-gray-700 rounded w-[100px] mb-2 animate-pulse"></div>
            <div className="h-[30px] bg-gray-300 dark:bg-gray-700 rounded w-[150px] animate-pulse"></div>
          </div>
        </div>
      ) : (
        <>
          {budgetExpenseBalance && (
            <div className="flex gap-4 w-full">
              <div className="dark:bg-[#1E1E1E] bg-white rounded-lg p-3 max-w-[266px] w-full">
                <small className="dark:text-white text-[#607077] text-[16px]">
                  Orçamento
                </small>
                <p className="text-[#1E1E1E] dark:text-white font-bold text-[24px]">
                  {formatter.format(budgetExpenseBalance?.budget)}
                </p>
              </div>
              <div className="dark:bg-[#1E1E1E] bg-white rounded-lg p-3 max-w-[266px] w-full">
                <small className="dark:text-white text-[#607077] text-[16px]">
                  Lançamentos
                </small>
                <p className="text-[#1E1E1E] dark:text-white font-bold text-[24px]">
                  {formatter.format(budgetExpenseBalance?.amountBudgetExpense)}
                </p>
              </div>
              <div className="dark:bg-[#1E1E1E] bg-white rounded-lg p-3 max-w-[266px] w-full">
                <small className="dark:text-white text-[#607077] text-[16px]">
                  Total Lançamentos
                </small>
                <p className="text-[#1E1E1E] dark:text-white font-bold text-[24px]">
                  {budgetExpenseBalance?.totalBudgetExpense}
                </p>
              </div>
              <div className="dark:bg-[#1E1E1E] bg-white rounded-lg p-3 max-w-[266px] w-full">
                <small className="dark:text-white text-[#607077] text-[16px]">
                  Saldo Disponível
                </small>
                <p className="text-[#1E1E1E] dark:text-white font-bold text-[24px]">
                  {formatter.format(budgetExpenseBalance?.balance)}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}