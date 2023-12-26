const filterSearchCostFrom = document.getElementById('costFrom');
const filterSearchCostTo = document.getElementById('costTo');



function filterCost() {
    const apartment = document.getElementsByName('apartment');
    for (let i = filterSearchCostFrom.innerHTML; i > 100; i + 100000) {
        if (i >= filterSearchCostTo.innerHTML) {
            break;
        }
        for (let j = 0; j < apartment.length; j++) {
            if (apartment[j].innerHTML > filterSearchCostTo.innerHTML) {
                break;
            }
            if (apartment[j].innerHTML < i) {
                break;
            }
            apartment[j]
        }
    }
}

