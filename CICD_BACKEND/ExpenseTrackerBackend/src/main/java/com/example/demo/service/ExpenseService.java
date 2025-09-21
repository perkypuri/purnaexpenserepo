package com.example.demo.service;

import com.example.demo.model.Expense;
import java.util.List;

public interface ExpenseService {

    String addExpense(Expense expense);

    String updateExpense(Expense expense);

    String deleteExpense(int id);

    Expense getExpenseById(int id);

    List<Expense> getAllExpenses();

    List<Expense> getExpensesByUser(int userId);
}
