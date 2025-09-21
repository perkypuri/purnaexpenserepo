package com.example.demo.service;

import com.example.demo.model.Expense;
import com.example.demo.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Override
    public String addExpense(Expense expense) {
        expenseRepository.save(expense);
        return "Expense added successfully";
    }

    @Override
    public String updateExpense(Expense expense) {
        Optional<Expense> existingExpense = expenseRepository.findById(expense.getId());
        if (existingExpense.isPresent()) {
            expenseRepository.save(expense);
            return "Expense updated successfully";
        }
        return "Expense not found";
    }

    @Override
    public String deleteExpense(int id) {
        Optional<Expense> expense = expenseRepository.findById(id);
        if (expense.isPresent()) {
            expenseRepository.deleteById(id);
            return "Expense deleted successfully";
        }
        return "Expense not found";
    }

    @Override
    public Expense getExpenseById(int id) {
        return expenseRepository.findById(id).orElse(null);
    }

    @Override
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    @Override
    public List<Expense> getExpensesByUser(int userId) {
        return expenseRepository.findByUserId(userId);
    }
}
