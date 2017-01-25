'use strict'

const sqlAdd = [
  `CREATE TABLE IF NOT EXISTS \`asteroid\` (
    \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
    \`name\` VARCHAR(255) NOT NULL COMMENT '',
    \`magnitude\` VARCHAR(255) NOT NULL COMMENT '',
    PRIMARY KEY (\`id\`)  COMMENT ''
  ) ENGINE = InnoDB;`

]

const sqlRemove = [
  `DROP TABLE \`asteroid\`;`,
]

exports.up = (knex, Promise) => {
  return Promise.each(sqlAdd, sql => knex.raw(sql), 0)
}

exports.down = (knex, Promise) => {
  return Promise.each(sqlRemove, sql => knex.raw(sql), 0)
}
