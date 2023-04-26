import React from "react";
import { render } from "@testing-library/react";
import BookedClasses from "./BookedClasses";

test("renders booked classes component", () => {
  render(<BookedClasses />);
});


/* had mentor call about jest not working. tried everything but couldnt fix 
issue. these tests should work though, but theres a jest error with npx create-react-app */
