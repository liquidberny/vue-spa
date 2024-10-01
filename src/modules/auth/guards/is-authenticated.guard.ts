import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const userId = localStorage.getItem('userId');
  localStorage.setItem('lastPath', to.path);

  console.log('userId', userId);
  if (!userId) {
    return next({
      name: 'login',
    });
  }
  return next();
};

export default isAuthenticatedGuard;
