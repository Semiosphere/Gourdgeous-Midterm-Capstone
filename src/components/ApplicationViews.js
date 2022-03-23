import React from "react";
import { Route } from "react-router-dom";
import { AvatarForm } from "./builder/Builder";
import { AvatarList } from "./users/MyAvatars";
import { QuizForm } from "./quiz/Quiz";

export const ApplicationViews = () => {
  return (
    <>
      <Route exact path="/avatars/create">
        <AvatarForm />
      </Route>

      <Route exact path="/MyAvatars">
        <AvatarList />
      </Route>

      <Route exact path="/avatars/create/:avatarId(\d+)">
        <AvatarForm />
      </Route>

      <Route exact path="/quizAnswers">
        <QuizForm />
      </Route>
    </>
  );
};
