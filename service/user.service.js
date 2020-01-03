const query = require("../db/index").query;
const encrypt = require('../utils/encrypt').encrypt;

class UserSersvice {
  constructor(serviceName) {
    this.name = serviceName;
  }
  // 用户注册
  register(name, password) {
    // 密码加密
    password = encrypt(name, password);
    const sql = `insert into user (username, password) values ('${name}', '${password}')`;
    return query(sql);
  }

  // 查询所有用户
  findAllUsers() {
    const sql = "select * from user";
    return query(sql);
  }

  // 查询用户是否登录
  checkLogin(name, password){
      password = encrypt(name, password);
      const sql = `select username as name from user u where u.password = '${password}'`;
      return query(sql);
  }

  // 内存报告
  reportMemory(config = {}){
    const { ip = '', used = '', total = '',limit = '', time = '', module:_module = '' } = config;
    const sql = 
    `
      insert into monitor 
      ( ip, used, total, monitor.limit, monitor.time, monitor.module) 
      values ('${ ip }', '${ used }', '${ total }', '${ limit }', '${ time }', '${ _module }');
    `;
    return query(sql);
  }
}

module.exports = new UserSersvice("userService");
