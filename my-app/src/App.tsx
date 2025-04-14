import React from "react";
import { StandupWizard } from "./standup-wizard";
import { JiraIssues } from "./components/JiraIssues";

function App() {
  return (
    <div className="App">
      <StandupWizard />
	  <JiraIssues />
    </div>
  );
}

export default App;
