function getYears() {
    const listOfYears = [];
    const currentYear = new Date().getFullYear();
  
    for (let i = currentYear; i >= currentYear - 80; i--) {
      listOfYears.push({ value: i, label: i.toString() });
    }
  
    return listOfYears;
  }

export default getYears