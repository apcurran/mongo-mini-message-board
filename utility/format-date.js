// Date formatting helper
function formatDate(newDate) {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };

    return new Intl.DateTimeFormat('en-US', options).format(newDate);
}

module.exports = formatDate;