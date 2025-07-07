const normalizeDate = (dateInput) => {
    const d = new Date(dateInput);
    return new Date(d.setHours(0, 0, 0, 0));
}

module.exports = normalizeDate;