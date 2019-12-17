exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("clucks")
    .del()
    .then(function() {
      const clucks = [
        { title: "Firts Title", priority: "1" },
        { title: "Second Title", priority: "2" },
        { title: "Third Title", priority: "3" },
        { title: "Forth Title", priority: "4" }
      ];

      return knex("clucks").insert(clucks);
    });
};
