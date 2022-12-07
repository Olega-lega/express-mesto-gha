const codeBadRequest = 400;
const codeUnauthorized = 401;
const codeForbidden = 403;
const codeNotFound = 404;
const codeConflict = 409;
const codeServerError = 500;

const serverThrottlingError = 'Превышен лимит запросов к HTTP-серверу, просьба повторить попытку позже.';
const internalServerError = 'Ошибка обработки запроса на сервере.';
const endpointCastError = 'Указанный URI ресурса не найден в базе.';
const endpointAuthError = 'Недостаточно прав для доступа к указанному URI ресурса.';
const cardValidationError = 'В запросе переданы некорректные данные карточки.';
const cardAuthError = 'Недостаточно прав для удаления указанной карточки.';
const cardCastError = 'Указанный ID карточки не найден в базе.';
const userValidationError = 'В запросе переданы некорректные данные пользователя.';
const userAuthError = 'Ошибка в процессе аутентификации пользователя.';
const userCredentialsError = 'В запросе переданы некорректные email или пароль.';
const userCastError = 'Указанный ID пользователя не найден в базе.';

module.exports = {
  serverThrottlingError,
  internalServerError,
  endpointCastError,
  endpointAuthError,
  cardValidationError,
  cardAuthError,
  cardCastError,
  userValidationError,
  userAuthError,
  userCredentialsError,
  userCastError,
  codeBadRequest,
  codeUnauthorized,
  codeForbidden,
  codeNotFound,
  codeConflict,
  codeServerError,
};