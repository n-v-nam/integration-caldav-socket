require('enum').register()
/* eslint no-undef: "off" */
const UserType = new Enum({
  Admin: 0, //管理者
  General: 1, //一般
})

module.exports = UserType
