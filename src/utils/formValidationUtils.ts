export const REQUIRED_DEFAULT_RULE = {
  value: true,
  message: 'Поле обязательно для заполнения',
};

export const URL_PATTERN =
  /^https?:\/\/(www\.)?[-a-zA-Z\d@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z\d@:%_+.~#?&/=]*)$/;

export const URL_PATTERN_RULE = {
  value: URL_PATTERN,
  message: 'Неверный формат ссылки',
};
