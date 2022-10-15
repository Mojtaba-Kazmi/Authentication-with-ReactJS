import { testRoute } from './testRoute';
import { signUpRoute } from './signUpRoute';
import { logInRoute } from './logInRoute';
import { updateUserInfoRoute } from './updateUserInfoRoute';
import { testEmailRoute } from './testEmailRoute';
import { verifyEmailRoute } from './verifyEmailRoute';
import { forgotPasswordRoute } from './forgotPasswordRoute';
import { resetPasswordRoute } from './resetPasswordRoute';
import { getGoogleOauthUrlRoute } from './getGoogleOauthUrlRoute';
import { googleOauthCallbackRoute } from './googleOauthCallbackRoute';

export const routes = [
    logInRoute,
    signUpRoute,
    updateUserInfoRoute,
    verifyEmailRoute,
    testEmailRoute,
    forgotPasswordRoute,
    resetPasswordRoute,
    getGoogleOauthUrlRoute,
    googleOauthCallbackRoute,
    testRoute
];
