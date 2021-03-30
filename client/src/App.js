import React from 'react';
import './App.css';

import { BrowserRouter as Router , Switch , Route } from "react-router-dom";

import Create_mcq from './components/create_mcq';
import Fill_mcq_questions from './components/fill_mcq_questions';
import Give_quiz from './components/give_quiz';
import Mcq_form from './components/mcq_form';
import Final_Submission from './components/Final_Submission';

import McqState from './contexts/MCQContexts/McqState';

function App() {
  return (
    <div>
        <McqState>
         <Router>
           <Switch>
              <Route path='/' exact component={Create_mcq} />
              <Route path='/mcq_form' component={Mcq_form} />
              <Route path='/fill_mcq_questions' component={Fill_mcq_questions} />
              <Route path='/give_quiz' component={Give_quiz} />
              <Route path='/Final_Submission' component={Final_Submission} />
           </Switch>
          </Router>
        </McqState>
    </div>
  );
}

export default App;
