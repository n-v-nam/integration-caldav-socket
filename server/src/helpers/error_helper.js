// Simple helper method to create new errors with a specific status value
// attached to them, to match up with the codes and methods below.
//TODO: need to restructure
const createError = (status = 500, message = '', req) => {
  if (message == '') {
    switch (status) {
      case 409:
        message = message.Conflict
        break
      default:
        break
    }
  }
  var result = {
    status: status,
    path: req.originalUrl,
    message: message,
    params: req.body
  }
  return JSON.stringify(result)
}

const messageHelper = (field, length, isNumbers, isRequired) => {
  let str = ''
  switch (isNumbers) {
    case 1:
      str = message.DigitsOrLess
      break
    case 2:
      str = message.CharactersOrLess
      break
    case 3:
      str = message.WrongFormat
      break
  }
  return `${field} ${length}${str} ${isRequired ? message.Required : ''}`
}

const messageImportHelper = (field, length) => {
  return `不正なデータが存在します。 (${field}の${length}行目)`
}
const message = {
  Conflict: 'データが見つかりません。',
  DataExist: 'データがすでに存在しています。',
  DataNotFound: 'データが見つかりません。',
  WrongFormat: '間違ったフォーマット',
  DigitsOrLess: '桁以下',
  CharactersOrLess: '文字以下',
  Required: '必須項目です。',
  OutputFileSuccess: '出力ファイルを完成しました。',
  OutputFileFailed: '帳票の出力に失敗しました。',
  DataNotFoundOrFileIncorrect: 'アップロードファイルに誤りがあります。',
  ImportUpdateData: '機種・規格の更新をしました。',
  ImportInsertData: '行目のデータをアップロードしました。',
  ImportNotExistJmcode: '事務所コードが存在しません。',
  ImportNotExistGcode: '業者コードが存在しません。',
  Line: '行目',
  ProcessingCompleted: '処理を完成しました。',
  ProcessingFailed: '処理を失敗しました。',
  TheUserIdYouEnteredIsAlreadyRegistered: 'ご入力いただいたユーザーIDはすでに登録されています。',
  TheWorkingTimeIsDuplicated: '作業時間が重複をしています。',
  ServiceInvalid: 'Service invalid or not exists'
}

module.exports = {
  createError,
  messageHelper,
  messageImportHelper,
  message,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  CONFLICT: 409,
  NOT_FOUND: 404,
  UNPROCESSABLE: 422,
  GENERIC_ERROR: 500
}
