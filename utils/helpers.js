module.exports = {
  // Capitlizing the first letter of the first name
  capitalize_first_name: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  // Capitlizing the first letter of the last name
  capatilize_last_name: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  // Creating the time sent
  format_time: (time) => {
    return new Date(time).toLocaleString('en-US', {
      hour12: true,
      hourCycle: 'h12',
      hour: 'numeric',
      minute: '2-digit'
    });
  },
  // Displaying received or sent message
  acquireChat: (sendUserId, atmID) => {
    if (sendUserId !== atmID) {
      return 'received';
    }
    return 'sent';
  },
};
