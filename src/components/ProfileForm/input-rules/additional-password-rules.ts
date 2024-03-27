export const additionalPasswordRules = [
  {
    min: 8,
    pattern: /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d).{8,}$/,
    message: '',
  },
];