let obj2 = knex
  .raw(`UPDATE "hashtags" SET nos=nos+?  WHERE hashtag=?;`, [1, "#apple"])
  .then(function(resp) {
    console.log("RAW GOOD 1", resp);
  })
  .catch(function(err) {
    console.log("RAW BAD 1", err.stack);
  });

let obj3 = knex
  .raw(
    `
    INSERT INTO "hashtags" (hashtag, nos)
    SELECT  ??, ?? WHERE NOT EXISTS (SELECT 1 FROM "hashtags" WHERE hashtag=?);
    select * from "hashtags";`,
    [hashtags.hashtag, hashtags.nos, hashtags.hashtag]
  )
  .then(function(resp) {
    console.log("RAW GOOD 2", resp);
  })
  .catch(function(err) {
    console.log("RAW BAD 2", err.stack);
  });

console.log("CONCAT:", cols.concat(values));
console.log("----------------------------------------------");
