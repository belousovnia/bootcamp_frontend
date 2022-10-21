import { UserRecommendedCourses } from '../UserRecommendedCourses';
import { UserRecommendedProfessions } from '../UserRecommendedProfessions';

export const UserRecommendations = () => {
  return (
    <>
      <UserRecommendedProfessions />
      <UserRecommendedCourses />
    </>
  );
};
