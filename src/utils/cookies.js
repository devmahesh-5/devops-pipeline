export const cookie = {
  getOptions: () => {
    return {
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    };
  },
  set: (res, name, value, options = {}) => {
    res.cookie(name, value, { ...cookie.getOptions(), options });
  },
  clear: (res, name, options = {}) => {
    res.clearCookie(name, { ...cookie.getOptions(), options });
  },
};
