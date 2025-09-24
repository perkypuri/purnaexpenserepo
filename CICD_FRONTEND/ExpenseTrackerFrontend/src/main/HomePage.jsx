import React from "react";
import { Link } from "react-router-dom"; // <-- add this
import "./HomePage.css";

import { FaWallet, FaChartBar, FaMobileAlt } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="homepage">
      <section className="hero">
        <h2>Track Your Expenses Like Never Before</h2>
        <p>
          Take control of your finances with our powerful Expense Tracker
          application.
        </p>
        <Link to="/userregister" className="signup-btn">
          Sign Up Now
        </Link>
      </section>

      <section className="features">
        <div className="feature">
          <FaWallet className="icon" />
          <h3>Manage Your Budget</h3>
          <p>Easily create and customize budgets to stay on top of your spending.</p>
        </div>

        <div className="feature">
          <FaChartBar className="icon" />
          <h3>Analyze Your Expenses</h3>
          <p>Visualize your expenses with interactive charts and insightful reports.</p>
        </div>

        <div className="feature">
          <FaMobileAlt className="icon" />
          <h3>Access Anywhere</h3>
          <p>Track your expenses on the go with our mobile-friendly application.</p>
        </div>
      </section>
    </div>
  );
}
