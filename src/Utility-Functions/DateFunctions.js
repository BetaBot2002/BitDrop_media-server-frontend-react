const getDateFormat = (date) => {
    const year=date.getFullYear()
    const month=date.getMonth()+1
    const actualMonth=month>=10?month:`0`+month
    const day=date.getDate()
    return `${day}-${actualMonth}-${year}`
}

export {
    getDateFormat
}