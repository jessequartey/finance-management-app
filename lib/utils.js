export const currencyformatter = (amount) =>{
    const formatter = Intl.NumberFormat('en-GH', {
        currency: "GHS",
        style: "currency"
    })
    return formatter.format(amount)
}

