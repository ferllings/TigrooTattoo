module.exports = function() {
  const team = require('./team.json');
  const members = [];

  for (let category in team) {
    team[category].forEach(member => {
      members.push({
        ...member,
        category,
        permalink: `/equipe/${member.slug}/`
      });
    });
  }

  return members;
};
